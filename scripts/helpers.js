function createDataTable(data, coordinates) {
    const container = document.getElementById('data-table-container');
    container.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'data-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const keys = ['Longitude', 'Latitude', 'PGA_0_1'];
    keys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    const lonTd = document.createElement('td');
    lonTd.textContent = coordinates[0];
    dataRow.appendChild(lonTd);
    const latTd = document.createElement('td');
    latTd.textContent = coordinates[1];
    dataRow.appendChild(latTd);
    const pgaTd = document.createElement('td');
    pgaTd.textContent = data['PGA_0_1'];
    dataRow.appendChild(pgaTd);
    tbody.appendChild(dataRow);
    table.appendChild(tbody);
    container.appendChild(table);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
