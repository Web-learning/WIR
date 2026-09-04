## Schema
```mermaid
    A[Web presentation] --> B(Preview)
    B --> C{decide}
    C --> D[Keep]
    C --> E[Edit Definition]
    E --> B
    D --> F[Save Image and Code]
    F --> B



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
