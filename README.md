# SafarNama — Pakistan Travel & Tours

> **Portfolio sample / demo site.** All tours, prices, and availability on this site are
> sample data for demonstration only. There are no real bookings, no real payments,
> no real customer reviews, no company registration, and no real contact numbers here.
> The booking form produces a demo confirmation only.

A premium, responsive travel website for Pakistan — from the mountains of the North
to the coast — built with pure HTML, CSS, and vanilla JavaScript. No build step,
no external images, fonts, or APIs, so it works fully offline and on GitHub Pages.

## Features

- **Destination search** — search tours by place name, region, or keyword
  (try “Hunza”, “Lahore”, “beach”, or “heritage”).
- **Filter by region** — All, North, Punjab, Sindh, Coast.
- **Tour package cards** — 9 sample tours with duration, region, description,
  and price in PKR (per person, sample prices).
- **Trip-cost estimator** — pick a tour, enter days and travellers, and see a
  transparent estimate: daily rate (tour price ÷ standard days) × days × travellers.
- **Demo booking form** — name, tour, travel date, and travellers, with validation
  (required name, date not in the past, 1–20 travellers). On submit it shows a
  demo confirmation with a booking reference such as `SF-A3K9P2`. Nothing is
  actually booked, charged, or sent anywhere.
- **Responsive design** — clean layout on mobile and desktop, system fonts only,
  CSS gradients and inline SVG artwork (no external images).

## Sample tours included

| Tour | Region | Days | Sample price / person |
| --- | --- | --- | --- |
| Hunza Explorer | North | 5 | PKR 65,000 |
| Skardu Adventure | North | 6 | PKR 78,000 |
| Naran & Shogran Escape | North | 3 | PKR 38,000 |
| Lahore Heritage Tour | Punjab | 2 | PKR 22,000 |
| Murree Hills Weekend | Punjab | 2 | PKR 18,500 |
| Mohenjo-daro Heritage | Sindh | 3 | PKR 29,000 |
| Thatta & Keenjhar Trip | Sindh | 2 | PKR 19,000 |
| Karachi Coast Getaway | Coast | 3 | PKR 32,000 |
| Gwadar Beach Expedition | Coast | 4 | PKR 48,000 |

## Run locally

Just open the file — no installation needed:

```text
open index.html in any modern browser
```

Or serve it over a local server (useful if your browser blocks local files):

```bash
cd safarnama
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Deploy on GitHub Pages

1. Create a GitHub repository (for example `safarnama`) and push these files
   (`index.html`, `style.css`, `script.js`, `README.md`) to its `main` branch.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**,
   select branch `main` and folder `/ (root)`, then save.
4. After a minute or two, the site will be live at
   `https://<your-username>.github.io/safarnama/`.

Because the site has no build step and no external dependencies, no extra
configuration is needed.

## Project structure

```text
safarnama/
├── index.html   # Page structure: hero, tours, estimator, booking, about, footer
├── style.css    # All styling: responsive layout, gradients, cards, forms
├── script.js    # Tour data, search + filter, estimator, demo booking logic
└── README.md    # This file
```

## Notes

- Prices are sample portfolio prices in PKR, for demonstration only.
- The booking reference is generated in the browser for the demo and is not
  stored or honoured anywhere.
- Demo contact line: **Demo site — no real bookings.**

Built by Muhammad Umer Samroze — Portfolio Sample.
