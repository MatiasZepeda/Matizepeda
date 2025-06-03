# Matizepeda

This repository contains a simple happiness tracker. You can log your daily
happiness either from the command line or via a small web page.

## Command-line usage

Run the script with Python and follow the prompt:

```bash
python happiness_tracker.py
```

Your responses are saved in `happiness_log.csv`. The script will also display
your average happiness across all saved entries.

## Web interface

Open `index.html` in your browser (or deploy the repository with any static
site host). The page lets you record a score between 0 and 10 in local storage
and shows the average score for all entries saved in the browser.
