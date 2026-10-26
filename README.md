# Snapbizz Website

## GitHub Pages Deployment

The GitHub Actions workflow builds and deploys this website on pushes to `main`.

1. Push this project to a GitHub repository with a `main` branch.
2. Open the repository's **Settings > Pages** and select **GitHub Actions** as the source.
3. Open **Actions > Deploy to GitHub Pages** and select **Run workflow**, or push a change to `main`.
4. The deployment URL appears in the workflow's `github-pages` environment.

The workflow uses Node.js 24 and `npm ci`, and automatically sets the asset base
path for both project sites and account sites. The repository must support GitHub
Pages under your GitHub plan; public repositories can use Pages on GitHub Free.

## Development

Use Node.js 22.12+ or Node.js 24. Run `npm ci`, then `npm run dev`.
Run `npm run build` to build the production site.

## Navigation and company content

Company pages open only when selected at `/about/`, `/partners/`, `/careers/`,
`/faq/`, `/privacy/`, and `/terms/`. Industries use `/industries/<id>/` and
solutions use `/solutions/<id>/`. Navigation uses regular links and full page
loads so each URL returns its own document, title, and metadata.
Existing `#/company/<id>` and `#/industry/<id>` links redirect to the real URLs
in the browser. Existing homepage section anchors remain supported.
Edit their copy in [companyPages.ts](src/data/companyPages.ts). The supplied
Privacy Policy is formatted in [PrivacyPolicy.tsx](src/components/pages/PrivacyPolicy.tsx),
preserving its stated update date of 08.April.2021. The supplied software
agreement and mobile service privacy terms are kept verbatim in
[termsAndConditions.txt](src/data/termsAndConditions.txt) and displayed on the
Terms & Conditions page, including the April 15, 2014 effective date. These
retain their supplied Singapore entity references and are separate from the
website Privacy Policy. Careers has starter
copy, not live job listings. The enquiry form is still a local demo, not a live
submission channel.

The header and footer link to individual solution panels, all industry pages,
and each connected service. Module labels and service IDs are maintained in
[content.ts](src/data/content.ts). Preserve these IDs when editing copy so
existing navigation links keep working.

## SEO and static hosting

The build generates 23 complete HTML pages plus `404.html`, `sitemap.xml`, and
`robots.txt`. Content is present without JavaScript; React hydrates those pages
to enable animations and interactions. No server runtime or prerendering
package is needed on the host. Serve the contents of `dist`, preserving its
directories and serving each directory's `index.html`.

- Production canonicals default to `https://www.snapbizz.com`.
- To build for a different origin, set `SITE_URL` before running the build.
  Supply only the origin, without a path. For example, in PowerShell:
  `$env:SITE_URL = 'https://www.snapbizz.com'; npm run build`.
- For a subdirectory, use `npm run build -- --base /snapbizz-website-new/`.
  The GitHub workflow sets both the origin and base for the GitHub Pages site.
- Each indexable page has a unique title, description, canonical, Open Graph
  metadata, Twitter summary, Organization/WebSite/WebPage JSON-LD, and
  breadcrumbs on detail pages. Placeholder Careers is `noindex` and excluded
  from the sitemap until real vacancies or approved company content are added.
- Configure the host to serve the generated `404.html` with HTTP 404 for missing
  URLs. Do not configure an "all paths to index.html" SPA rewrite: it would hide
  missing-page status codes and serve the homepage for unknown URLs.
- Cloudflare Pages can use `npm run build` and output directory `dist`; the
  top-level `404.html` avoids its automatic SPA fallback. Do not add `_redirects`
  wildcard rewrites. Other static hosts should use directory index serving.
- Run `npm run test:seo` after a build to check generated metadata, content,
  structured data, sitemap, assets, and internal links.

After the chosen host serves the custom domain, verify HTTPS and redirects to
the primary hostname, verify domain ownership in Google Search Console, and
submit `https://www.snapbizz.com/sitemap.xml`. Search Console verification,
Google Business Profile, DNS, and search indexing require account access and
are not performed by the build. Measure real Core Web Vitals after launch.
Review the legal text and connect the enquiry backend before collecting live
submissions; the SEO work does not change the demo form into a live service.

The shared `.brand-wash` rule in [index.css](src/index.css) adds static, muted
brand-colour gradients to light section backgrounds. Cards, dropdowns, and form
surfaces retain their own backgrounds for readability.

The office address and Google Maps destination are maintained in
[OfficeLocation.tsx](src/components/sections/OfficeLocation.tsx). The location
appears after the contact form and is linked from the footer. The map iframe is
lazy-loaded and uses an address query without an API key; Google resolves the
location from that address. Loading the embed connects the browser to Google.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
