# Folder structure

| Folder            | Holds                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `src/const/`      | Constants, one file per topic: `roles.ts`, `routes.ts`, `game.ts`, `storage.ts`, `motion.ts`… |
| `src/data/`       | Static data (word lists, see `words.md`)                                                      |
| `src/hooks/`      | Every custom hook (`use*.ts`), none inside component folders                                  |
| `src/helpers/`    | Utilities and helpers: `utils.ts` (`cn`), `groupLabel.ts`, `sound.ts`…                        |
| `src/game/`       | Pure game rules (no React), with tests                                                        |
| `src/store/`      | Zustand stores and storage adapters                                                           |
| `src/components/` | UI, see `components.md`                                                                       |
| `src/pages/`      | Route pages that only compose                                                                 |

## Rules

- **Every** module-level constant (`TITLE_CASE` lookups, class maps, option lists, re-exports of `GAME.*`) lives in `src/const/`, never next to the component, hook or store that uses it. A constant used in more than one file, or any magic number/string, belongs in `src/const/<topic>.ts`. Constant objects use `TITLE_CASE` keys and `as const`.
- Routes come from `ROUTES` in `src/const/routes.ts`; never type a path literal.
- Hooks are imported from `@/hooks/*`; helpers from `@/helpers/*`. Do not create `lib/` or `utils/` folders.
- The shadcn alias `utils` points to `@/helpers/utils`.

## Lint

`bun run lint` must pass with zero errors: `curly`, `func-style` (expression only), `no-magic-numbers`, `react/rules-of-hooks`. Fix, do not disable.
