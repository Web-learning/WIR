                 presentationData
                       │
                       ▼
              ┌─────────────────┐
              │   slides array  │
              └────────┬────────┘
                       │
                    forEach()
                       │
                       ▼
              ┌─────────────────┐
              │ What type is it?│
              └────────┬────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
      cover          agenda       statistics
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 HTML generated
                       │
                       ▼
                 Add footer
                       │
                       ▼
              #presentation
                       │
                       ▼
                 Web presentation
                       │
                       │ Export PDF
                       ▼
                  html2canvas
                       │
                       ▼
                  PNG images
                       │
                       ▼
                     jsPDF
                       │
                       ▼
                Gentle intro.pdf
