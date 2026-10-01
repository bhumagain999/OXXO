# Technology stack

This interview concept is intentionally simple and portable.

- **Front end:** semantic HTML5, modern CSS, and plain JavaScript
- **Visualizations:** custom CSS bars and an inline SVG cohort chart
- **Data:** a deterministic 300-store synthetic dataset generated locally by JavaScript and exported as CSV
- **Interaction:** client-side market, cohort, tab, scenario, and store filters
- **Concept assistant:** local keyword routing and preset analytical responses; no LLM or external API is connected
- **Hosting and version control:** GitHub repository with GitHub Pages deployment from the `main` branch
- **Security and privacy:** static site, no database, cookies, analytics, login, or network data calls

The dashboard recalculates ratios from the filtered totals rather than averaging store-level percentages. This keeps measures such as gross margin, fuel cents per gallon, availability, and attachment rates mathematically consistent.
