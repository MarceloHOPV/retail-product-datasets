document.addEventListener("DOMContentLoaded", () => {
  const txtFilePath = "datasets.txt";
  function filterDatasets(datasets, filters) {
    if (filters.length === 0) return datasets;

    return datasets.filter((dataset) => {
      const [, col2] = dataset.split(";");
      if (!col2) return false;
      return filters.some((filter) =>
        col2.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }
  function renderDatasets(datasets) {
    const listContainer = document.getElementById("dataset-list");
    listContainer.innerHTML = "";

    const listInner = document.createElement("div");
    listInner.classList.add("list-inner");

    datasets.forEach((dataset) => {
      if (dataset.trim()) {
        const [col1, col2] = dataset.split(";");

        const item = document.createElement("div");
        item.classList.add("item");

        const column1 = document.createElement("div");
        column1.classList.add("column");
        column1.textContent = col1 ? col1.trim() : "";

        const column2 = document.createElement("div");
        column2.classList.add("column");
        column2.textContent = col2 ? col2.trim() : "";

        item.appendChild(column1);
        item.appendChild(column2);
        listInner.appendChild(item);
      }
    });

    listContainer.appendChild(listInner);
  }

  function updateFilteredList(datasets) {
    const activeFilters = Array.from(
      document.querySelectorAll(".filter-checkbox:checked")
    ).map((checkbox) => checkbox.value);
    const filteredDatasets = filterDatasets(datasets, activeFilters);
    renderDatasets(filteredDatasets);
  }

  fetch(txtFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o arquivo: " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      const datasets = data.split("\n");
      renderDatasets(datasets);
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo:", error);
      document.getElementById("dataset-list").textContent =
        "Erro ao carregar os dados.";
    });
});
