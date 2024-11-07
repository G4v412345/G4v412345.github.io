const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslcJFOhtuuGhCACdPhCADrq0gBHG1bKj6JcYXsZKCupOkJlM6MyDonSz1RAGXvUMqZ6wipILxHI6A/pub?gid=1619251371&single=true&output=tsv';

const  SEP_LINE = '\r\n';
const  SEP_CELL = '\t';
const  DOM_TABLE = document.querySelector('.price-table table');

function loadDate() 
{
    fetch(URL).then(r => r.text()).then(parseData);
}

function parseData(d)
{
    const tableArr = d.split(SEP_LINE).map(r => r.split(SEP_CELL));
    const names = tableArr.shift();

    const formatDate = tableArr.map(e1 =>
        {
            const name = {};
            names.forEach((nam, i) => name[nam] = e1[i]);

            return name;
        }
    );

    renderDate(formatDate, names);
}

function renderDate(data, names)
{
    console.log(data);
    const html = `
        ${getTableHead(names)}
        <tbody>
        ${getTableBody(data)}
        </tbody>
    `;

    DOM_TABLE.innerHTML = html;
}

function getTableHead([order, name, price])
{
    return `
                  <tr>
                    <th scope="col">${order}</th>
                    <th scope="col">${name}</th>
                    <th scope="col">${price}</th>
                </tr>
    `;
}

function getTableBody(data)
{
    return data.map(({order, name, price}) => {
        return `
        <tr>
            <th scope="row">${order}</th>
            <td>${name}</td>
            <td>${price}</td>
        </tr>`;
        }).join('');
        
}

loadDate();
