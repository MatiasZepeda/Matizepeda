import csv
from datetime import datetime
from pathlib import Path

LOG_FILE = Path('happiness_log.csv')

def log_happiness(score: int, date: str | None = None, filename: Path = LOG_FILE) -> None:
    """Append a date and happiness score to the log file."""
    if not 0 <= score <= 10:
        raise ValueError('Score must be between 0 and 10')
    if date is None:
        date = datetime.now().date().isoformat()
    new = False
    if not filename.exists():
        new = True
    with filename.open('a', newline='') as f:
        writer = csv.writer(f)
        if new:
            writer.writerow(['date', 'score'])
        writer.writerow([date, score])


def read_log(filename: Path = LOG_FILE) -> list[tuple[str, int]]:
    """Return list of (date, score) entries from log."""
    if not filename.exists():
        return []
    with filename.open() as f:
        reader = csv.DictReader(f)
        return [(row['date'], int(row['score'])) for row in reader]


def average_score(entries: list[tuple[str, int]]) -> float:
    if not entries:
        return 0.0
    return sum(score for _, score in entries) / len(entries)


def main() -> None:
    print('Daily Happiness Tracker')
    try:
        score = int(input('How happy are you today on a scale of 0-10? '))
        log_happiness(score)
    except Exception as exc:
        print(f'Error: {exc}')
        return

    entries = read_log()
    avg = average_score(entries)
    print(f'Thank you! Your happiness score has been recorded.')
    print(f'Average happiness: {avg:.2f} based on {len(entries)} entries.')


if __name__ == "__main__":
    main()
