# BAM Automotive Company — Paint Shop

Developed by **Nazanin Ghaemi-Zadeh**.

An English-language R Shiny dashboard for Elcometer Excel exports, with ED,
Primer, Sealer and BC workspaces.

## Features

- Multiple `.xls` / `.xlsx` uploads, original filenames, individual removal.
- Source worksheet sections and complete reading tables.
- Temperature profiles, channel spread, time in temperature bands and
  comparison of peak temperatures across uploaded files.
- Coordinated chart colours and PNG export.
- Excel export with two sheets: the selected source worksheet restyled,
  and all four charts.

## Browser deployment

The included GitHub Actions workflow exports the app with Shinylive and
publishes it to GitHub Pages. In repository **Settings → Pages → Build and
deployment**, choose **GitHub Actions** as the source. Push to `main` or run
**Publish Paint Shop** from the Actions tab.

The R runtime and packages load into the browser. The first load may take
longer while they download. Excel files selected inside the app are processed
in browser memory; they are not committed to this repository. Refreshing starts
a new app session. No production spreadsheets are distributed with this code.

## Run locally

Install R and run:

```r
install.packages(c("shiny", "readxl", "plotly", "openxlsx"))
shiny::runApp(".")
```

## Data scope and validation

The importer targets Elcometer exports. Multi-sheet files export the selected
source worksheet. Legacy embedded objects and macros are not reproduced.
Temperature-band time uses linear interpolation and excludes missing readings
and unusually long gaps. See `VALIDATION.md` for the completed calculation,
import, export and Shiny server checks. GitHub Pages deployment and live browser
interaction still require verification after publication.
