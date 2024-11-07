const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslcJFOhtuuGhCACdPhCADrq0gBHG1bKj6JcYXsZKCupOkJlM6MyDonSz1RAGXvUMqZ6wipILxHI6A/pub?gid=1619251371&single=true&output=tsv';

const SEP_LINE = '\n';
const SEP_CELL = '\t';
const DOM_TABLE = document.querySelector('.price-table table');

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(data => parseData(data))
        .catch(error => console.error('Error loading data:', error));
}

function parseData(data) {
    const rows = data.trim().split(SEP_LINE);
    const headers = rows[0].split(SEP_CELL);  
    const bodyRows = rows.slice(1).map(row => row.split(SEP_CELL));  

    renderTable(headers, bodyRows);
}

function renderTable(headers, bodyRows) {
    const tableHeadHTML = `
        <thead>
            <tr>
                ${headers.map(header => `<th scope="col">${header}</th>`).join('')}
            </tr>
        </thead>
    `;

    const tableBodyHTML = `
        <tbody>
            ${bodyRows.map(row => `
                <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;

    DOM_TABLE.innerHTML = tableHeadHTML + tableBodyHTML;
}

loadData();
