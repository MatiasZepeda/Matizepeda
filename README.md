# Matizepeda

This repository contains a happiness tracker with both command-line and web
interfaces. Log how you feel each day and review your progress over time.

## Command-line usage

Run the script with Python and follow the prompt:

```bash
python happiness_tracker.py
```

Your responses are saved in `happiness_log.csv`. The script will also display
your average happiness across all saved entries.

## Web interface

Open `index.html` in your browser (or deploy the repository with any static
site host). The page lets you record a score between 0 and 10 and stores your
entries in local storage. It displays a running average, shows a line chart of
your happiness over time and lets you export or clear your saved data. A
dark/light theme toggle makes it feel right at home on any device.
