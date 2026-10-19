# Verification — four-chart revision

## Executed in R

The complete application was parsed and sourced using R 4.6.0 in WebR 0.6.0 with actual shiny, readxl, plotly and openxlsx packages. The real readxl importer decoded all 20 original XLS workbooks (ED, Primer, Sealer and BC). Every typed source cell was compared with independent xlrd fixtures, including dates and blank cells. All nine source sections and 94 merged ranges were recovered in each workbook.

The earlier calculated-summary checks also passed: 100 active channel summaries matched source counts, means, extrema, sample standard deviations, CV and peak differences within displayed rounding precision.

## New calculations and comparisons

- ED 1405.06.05: maximum simultaneous spread 51.8 °C at elapsed minute 1.
- Ch2 time in the 140–150 °C band: 18.9821428571 minutes, independently checked in Python.
- Band totals matched recorded duration for every active channel in all 20 complete recordings.
- Boundary plateaus, linear crossings, missing measurements and excluded long gaps were exercised with known numerical examples.
- Comparisons with 1, 3, 5 and 30 files were checked. Same-name uploads remain distinct; removing an upload changes the comparison count.

## Source preservation and exports

The actual application generated PNGs for all four charts, a combined PNG and two-sheet Excel reports from both a legacy XLS input and an XLSX round-trip input.

Independent openpyxl/OOXML inspection verified:

- Exactly two worksheets and four embedded chart images.
- Every source cell value, timestamp and blank in the ED sample remained at its source coordinate.
- All 94 merged ranges matched.
- Source number/date formats matched; the final XLS reconstruction also retained source font names and sizes on all populated cells.
- No calculated rows or columns were inserted into the original worksheet.
- The XLSX archives passed ZIP integrity checks.

The four R-rendered charts were visually inspected. Title, axis and legend overlaps found during the review were corrected. Colors and calculation helpers are shared between the interactive plots and exports. The charts in Excel are PNG snapshots, not editable native charts.

## Shiny interaction checks

Shiny's testServer exercised the actual module: initial multi-file upload, append upload, deletion of unselected and selected files, next-file selection, deletion of the final file, and re-upload. Plotly and source-table outputs were evaluated during the test. All passed.

WebR's lower evaluation-depth limit initially interrupted a deeply nested reactive test. Raising the test runtime's expression limit to the normal desktop R setting of 5000 resolved it. No production workaround or approval bypass was added.

## Scope

Live browser layout and native desktop Excel were not exercised in this environment. The report's first sheet is the selected worksheet. Multi-sheet formula-linked workbooks, legacy drawing objects and macros are outside the supported Elcometer-report scope; no claim of arbitrary-workbook binary fidelity is made. No hosting deployment is included.
