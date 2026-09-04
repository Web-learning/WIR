## Introduction
## Features
## Schema

``` mermaid
   flowchart LR
   A --> B

## Noted code
## Explanation

 ───────────────────────────────────┐
                                    ▼
                            Web presentation
                                    ▼
                              Export to PDF
────────────────────────────────────┘
                                    ▼
                                    │
                                html2canvas
                                    │
                                    ▼
                                PNG images
                                    │
                                    ▼
                                  jsPDF
                                    │
                                    ▼
                              (insert title).pdf
