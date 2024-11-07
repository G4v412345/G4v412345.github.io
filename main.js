const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslcJFOhtuuGhCACdPhCADrq0gBHG1bKj6JcYXsZKCupOkJlM6MyDonSz1RAGXvUMqZ6wipILxHI6A/pub?gid=1619251371&single=true&output=tsv';

function loadDate() 
{
    fetch(URL).then(r => r.text()).then(d => console.log(d));
}

loadDate();