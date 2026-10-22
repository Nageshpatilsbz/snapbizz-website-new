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

Run `npm ci`, then `npm run dev`. Run `npm run build` to build the production site.

## Navigation and company content

Company pages open only when selected, using hash routes compatible with GitHub
Pages: `#/company/about`, `partners`, `careers`, `faq`, `privacy`, and `terms`
(each uses the same `#/company/` prefix).
Edit their copy in [companyPages.ts](src/data/companyPages.ts). The Privacy and
Terms pages are visibly marked as drafts; replace them with approved legal
content and remove their `draft` flags before publication. Careers has starter
copy, not live job listings. The enquiry form is still a local demo, not a live
submission channel.

The header and footer link to individual solution panels, all industry pages,
and each connected service. Module labels and service IDs are maintained in
[content.ts](src/data/content.ts). Preserve these IDs when editing copy so
existing navigation links keep working.

The shared `.brand-wash` rule in [index.css](src/index.css) adds static, muted
brand-colour gradients to light section backgrounds. Cards, dropdowns, and form
surfaces retain their own backgrounds for readability.

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
