
```
mermaid
flowchart LR
A --> B

## Introduction
## Features
## Schema
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
