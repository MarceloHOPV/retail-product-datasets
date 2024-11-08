document.addEventListener("DOMContentLoaded", () => {
    const txtFilePath = 'datasets.txt';

    fetch(txtFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const datasets = data.split('\n');
            const listContainer = document.getElementById("dataset-list");
            const listInner = document.createElement("div");
            listInner.classList.add("list-inner");

            datasets.forEach((dataset) => {
                if (dataset.trim()) {
                    const [col1, col2] = dataset.split(';'); // Divide a linha em duas partes

                    const item = document.createElement("div");
                    item.classList.add("item");

                    const column1 = document.createElement("div");
                    column1.classList.add("column");
                    column1.textContent = col1 ? col1.trim() : ""; // Define o texto da primeira coluna

                    const column2 = document.createElement("div");
                    column2.classList.add("column");
                    column2.textContent = col2 ? col2.trim() : ""; // Define o texto da segunda coluna

                    item.appendChild(column1);
                    item.appendChild(column2);
                    listInner.appendChild(item);
                }
            });

            listContainer.appendChild(listInner);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo:', error);
            document.getElementById("dataset-list").textContent = "Erro ao carregar os dados.";
        });
});
