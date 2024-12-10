document.addEventListener("DOMContentLoaded", () => {
  console.log("O script foi carregado corretamente!");

  const txtFilePath = "datasets.txt";

  function extractCategories(datasets) {
    const categories = datasets.map((dataset) => {
      const [, , col3] = dataset.split(";");
      return col3 ? col3.trim() : "";
    });
    console.log("Categorias extraídas:", categories);
    // Remover duplicatas usando Set
    return [...new Set(categories)];
  }

  function filterDatasets(datasets, filters) {
    if (filters.length === 0) return datasets;

    return datasets.filter((dataset) => {
      const [, , col3] = dataset.split(";");
      if (!col3) return false;
      return filters.some((filter) =>
        col3.toLowerCase().includes(filter.toLowerCase())
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

        const column1 = document.createElement("a");
        column1.classList.add("column");
        column1.textContent = col1.trim();
        column1.href = col1.trim();
        column1.target = "_blank";

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

  function renderFilters(categories, datasets) {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = ""; // Limpa os filtros atuais

    categories.forEach((category) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = category;
      checkbox.classList.add("filter-checkbox");

      const label = document.createElement("label");
      label.textContent = category;

      const filterItem = document.createElement("div");
      filterItem.classList.add("filter-item");
      filterItem.appendChild(checkbox);
      filterItem.appendChild(label);

      filterContainer.appendChild(filterItem);

      // Adiciona evento de mudança para os checkboxes
      checkbox.addEventListener("change", () => {
        updateFilteredList(datasets); // Passa 'datasets' aqui para a função
      });
    });
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
      console.log("Datasets carregados:", datasets); // Verifique os datasets carregados

      renderDatasets(datasets);

      const categories = extractCategories(datasets);
      renderFilters(categories, datasets); // Passa datasets para renderFilters

      // Inicializar os filtros com evento
      updateFilteredList(datasets);
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo:", error);
      document.getElementById("dataset-list").textContent =
        "Erro ao carregar os dados.";
    });

  // Função para redirecionamento
  window.goToGitHub = function () {
    window.location.href =
      "https://github.com/MarceloHOPV/retail-product-datasets";
  };
});
