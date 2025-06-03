let entries = [];
let chart;

function loadEntries() {
    entries = JSON.parse(localStorage.getItem('happinessEntries') || '[]');
}

function saveEntries() {
    localStorage.setItem('happinessEntries', JSON.stringify(entries));
}

function average() {
    if (!entries.length) return 0;
    return entries.reduce((sum, e) => sum + e.score, 0) / entries.length;
}

function renderLog() {
    const log = document.getElementById('log');
    log.innerHTML = '';
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.date}: ${e.score}`;
        log.appendChild(li);
    });
}

function setupChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: entries.map(e => e.date),
            datasets: [{
                label: 'Happiness',
                data: entries.map(e => e.score),
                borderColor: getComputedStyle(document.body).getPropertyValue('--accent'),
                fill: false,
            }]
        },
        options: {
            scales: { y: { min: 0, max: 10 } }
        }
    });
}

function updateChart() {
    chart.data.labels = entries.map(e => e.date);
    chart.data.datasets[0].data = entries.map(e => e.score);
    chart.update();
}

function updateStats() {
    document.getElementById('average').textContent = average().toFixed(2);
    renderLog();
    updateChart();
}

function exportCSV() {
    if (!entries.length) return;
    const header = 'date,score\n';
    const rows = entries.map(e => `${e.date},${e.score}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'happiness_log.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function clearEntries() {
    if (confirm('Delete all entries?')) {
        entries = [];
        saveEntries();
        updateStats();
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('happinessTheme', theme);
    if (chart) {
        chart.data.datasets[0].borderColor = getComputedStyle(document.body).getPropertyValue('--accent');
        chart.update();
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
}

function addEntry(score) {
    const date = new Date().toISOString().split('T')[0];
    entries.push({ date, score });
    saveEntries();
    updateStats();
}

// Event bindings

document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('score');
    const score = parseInt(input.value, 10);
    if (isNaN(score) || score < 0 || score > 10) {
        alert('Please enter a number between 0 and 10.');
        return;
    }
    addEntry(score);
    input.value = '';
});

document.getElementById('clear').addEventListener('click', clearEntries);

document.getElementById('export').addEventListener('click', exportCSV);

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    const theme = localStorage.getItem('happinessTheme') || 'light';
    applyTheme(theme);
    setupChart();
    updateStats();
});
