async function loadData() {
    const request = await fetch('/info');
    const data = await request.json();
    document.getElementById('data').innerText = JSON.stringify(data, null, 2);
}

loadData();