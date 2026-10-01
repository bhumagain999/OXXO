# OXXO USA Leadership Dashboard Concept

Interactive business intelligence concept prepared by Bijaya Humagain for the OXXO USA Manager, Business Intelligence & Analytics interview process.

## View

Open [the live dashboard](https://bhumagain999.github.io/OXXO/) or `index.html` in a browser.

## What It Shows

This concept models how OXXO USA leadership could monitor a growing convenience retail portfolio across fuel, inside sales, operations, customer behavior, and expansion performance.

Key areas:

- Executive contribution, plan variance, and same-store trends
- Fuel margin, gallons, card fees, and fuel-to-inside conversion
- Inside sales category mix, gross profit, traffic, and basket size
- Customer behavior KPIs such as repeat visits, visit frequency, food attachment, and daypart patterns
- Store-level operating actions for availability, food waste, labor, and dispenser uptime
- Expansion and conversion tracking with capital discipline and payback sensitivity
- Conceptual "Ask your data" assistant showing how leadership could query KPIs in plain language

## Data Notice

All figures, stores, markets, people, actions, and assistant responses are simulated for interview discussion. This project is not connected to OXXO systems, FEMSA systems, live APIs, or any confidential company data.

The store-level source data is available in [`data/oxxo_synthetic_store_data.csv`](data/oxxo_synthetic_store_data.csv), with definitions in [`data/README.md`](data/README.md).

## Research Context

The companion file `OXXO_Dashboard_Research.md` summarizes the public business context used to shape the dashboard concept.

## Editing

Edit `dashboard.html`, then run `node build.cjs` to refresh the standalone `index.html` served by GitHub Pages.
