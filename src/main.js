async function loadData() {
    const request = await fetch('/info');
    const data = await request.json();
    const schedule = data['0'].schedule;
    document.getElementById('data').innerText = JSON.stringify(schedule, null, 2);

   
}
function createTableFromSchedule(schedule) {
        if (!schedule || schedule.length === 0) {
            return "No data to display.";
        }

        let tableHTML = '<table border="1">'; // Basic table with border

        // Create table header
        tableHTML += '<thead><tr>';
        const keys = Object.keys(schedule[0]); // Assuming all objects have the same keys
        keys.forEach(key => {
            tableHTML += `<th>${key}</th>`;
        });
        tableHTML += '</tr></thead>';

        // Create table body
        tableHTML += '<tbody>';
        schedule.forEach(row => {
            tableHTML += '<tr>';
            keys.forEach(key => {
                tableHTML += `<td>${row[key]}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody>';

        tableHTML += '</table>';
        return tableHTML;
    }


loadData();
document.getElementById('table-container').innerHTML = createTableFromSchedule(schedule);