const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslcJFOhtuuGhCACdPhCADrq0gBHG1bKj6JcYXsZKCupOkJlM6MyDonSz1RAGXvUMqZ6wipILxHI6A/pub?gid=1619251371&single=true&output=tsv';

const SEP_LINE = '\n';
const SEP_CELL = '\t';
const DOM_TABLE = document.querySelector('.price-table table');

function loadDate() {
    fetch(URL)
        .then(response => response.text())
        .then(parseData)
        .catch(error => console.error('Error fetching or parsing data:', error));
}

function parseData(data) {
    const tableArr = data.trim().split(SEP_LINE).map(row => row.split(SEP_CELL));
    const headers = tableArr.shift(); // предполагается ['order', 'name', 'price']

    const formattedData = tableArr.map(row => {
        return {
            order: row[0],
            name: row[1],
            price: row[2]
        };
    });

    renderData(formattedData);
}

function renderData(data) {
    const html = `
        ${getTableHead()}
        <tbody>
            ${getTableBody(data)}
        </tbody>
    `;

    DOM_TABLE.innerHTML = html;
}

function getTableHead() {
    return `
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr>
        </thead>
    `;
}

function getTableBody(data) {
    return data.map(({ order, name, price }) => `
        <tr>
            <th scope="row">${order}</th>
            <td>${name}</td>
            <td>${price}</td>
        </tr>
    `).join('');
}

loadDate();
