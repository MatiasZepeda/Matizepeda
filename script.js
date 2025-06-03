function loadEntries() {
    return JSON.parse(localStorage.getItem('happinessEntries') || '[]');
}

function saveEntries(entries) {
    localStorage.setItem('happinessEntries', JSON.stringify(entries));
}

function updateView(entries) {
    const log = document.getElementById('log');
    log.innerHTML = '';
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.date}: ${e.score}`;
        log.appendChild(li);
    });
    const avg = entries.length
        ? entries.reduce((sum, e) => sum + e.score, 0) / entries.length
        : 0;
    document.getElementById('average').textContent = avg.toFixed(2);
}

document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('score');
    const score = parseInt(input.value, 10);
    if (isNaN(score) || score < 0 || score > 10) {
        alert('Please enter a number between 0 and 10.');
        return;
    }
    const entries = loadEntries();
    const date = new Date().toISOString().split('T')[0];
    entries.push({ date, score });
    saveEntries(entries);
    updateView(entries);
    input.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    updateView(loadEntries());
});
