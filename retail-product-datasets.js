document.addEventListener("DOMContentLoaded", () => {
    // Caminho relativo para o arquivo .txt (assumindo que está na mesma pasta do HTML)
    const txtFilePath = 'datasets.txt';

    // Faz o fetch do arquivo .txt
    fetch(txtFilePath)
        .then(response => response.text()) // Converte a resposta para texto
        .then(data => {
            // Divide o conteúdo em linhas com base nas quebras de linha
            const datasets = data.split('\n');

            // Seleciona o contêiner principal onde os itens serão adicionados
            const listContainer = document.getElementById("dataset-list");

            // Cria o contêiner interno com bordas laterais
            const listInner = document.createElement("div");
            listInner.classList.add("list-inner");

            // Adiciona cada linha do arquivo como um item à lista
            datasets.forEach((dataset) => {
                if (dataset.trim()) { // Verifica se a linha não está vazia
                    const item = document.createElement("div");
                    item.classList.add("item");
                    item.textContent = dataset;
                    listInner.appendChild(item);
                }
            });

            // Adiciona o contêiner interno ao contêiner principal
            listContainer.appendChild(listInner);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo:', error);
        });
});
