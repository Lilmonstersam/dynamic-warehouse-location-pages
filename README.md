# Mezzanine floors Melbourne mockup

Static preview of the Dynamic Warehouse Solutions Melbourne location page. Open `index.html` or serve the repository root with any static host. No build step is required.

```sh
python3 -m http.server 8000
```

The page and its local dependencies are in `index.html` and `assets/`. The original browser capture is kept locally and ignored by Git. This is a visual mockup: WordPress, WooCommerce and Gravity Forms actions still point at the live site and have not been adapted for a standalone deployment. Review those interactions before using this as a production page.

Pushes to `main` deploy the static files through the [GitHub Pages workflow](.github/workflows/deploy-pages.yml). You can also run it manually from the Actions tab. The expected preview URL is <https://lilmonstersam.github.io/dynamic-warehouse-location-pages/>. The preview is set to `noindex` and `robots.txt` blocks crawlers; remove both only when the final page is ready for indexing.
