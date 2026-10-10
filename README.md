# Undercover

A social deduction word game (English and Vietnamese) that runs in the browser and installs as a PWA. Built with React 19, TypeScript and Vite, deployed on Vercel.

## Credits and disclaimer

| Topic            | Statement                                                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What this is     | An independent, non-commercial remake. The gameplay is inspired by the app _Undercover: Word Party Game_ by Yanstar Studio ([yanstarstudio.com](https://www.yanstarstudio.com/)).                                                                                       |
| Rules reference  | The original rules were used as reference from the studio's [How to play](https://www.yanstarstudio.com/undercover-how-to-play), [Special roles](https://www.yanstarstudio.com/undercover-special-roles) and [FAQ](https://www.yanstarstudio.com/undercover-faq) pages. |
| Affiliation      | Not affiliated with, sponsored by or endorsed by Yanstar Studio. All names and trademarks belong to their respective owners.                                                                                                                                            |
| Original content | Source code, UI, logo, word lists and translations are written for this project. No images, sounds, code or data are taken from the original app. Scoring values differ from the original.                                                                              |
| Cost and data    | Free, public and non-commercial: no ads, no fees, no analytics. Everything is stored on your own device (IndexedDB and localStorage).                                                                                                                                   |
| Takedown         | If you own the original app and want something removed or changed, please open an issue and it will be handled promptly.                                                                                                                                                |

Rules, technical options and roadmap (Vietnamese): [agent/PLAN.md](./agent/PLAN.md). Code rules for agents: [agent/](./agent/README.md).

## Scripts

| Command             | Purpose                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `bun install`       | Install dependencies                                                |
| `bun dev`           | Run locally                                                         |
| `bun run build`     | `tsc -b` + `vite build` (outputs `dist/`, service worker, manifest) |
| `bun run preview`   | Try the production build, including offline mode                    |
| `bun run test`      | Run Vitest                                                          |
| `bun run lint`      | Run oxlint                                                          |
| `bun run pwa:icons` | Regenerate PNG icons from `public/icon.svg`                         |

## Deploy to Vercel

`vercel.json` already sets bun install, build (`bun run build`), output `dist`, the SPA rewrite and no-cache headers for `sw.js`.

| Option           | Steps                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub (advised) | 1. Create a repo and push: `git add -A && git commit -m "Initial commit" && git remote add origin <url> && git push -u origin main`. 2. In vercel.com choose Add New Project and import the repo; Vite is detected automatically. 3. After deploy, open `/setup`, `/words` and `/rules` and refresh to confirm no 404, then try Add to Home Screen on a phone. |
| CLI              | `bunx vercel login`, then `bunx vercel --prod`.                                                                                                                                                                                                                                                                                                                |
