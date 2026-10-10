# Agent rules

Project plan and decisions: [PLAN.md](PLAN.md) (Vietnamese). Read the files in `rules/` before changing code. Each file is one rule, with the reason and right/wrong examples.

| File                                             | Rule                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| [rules/css-variables.md](rules/css-variables.md) | Colors, shadows, radii… are CSS variables, never hard-coded in `className`        |
| [rules/components.md](rules/components.md)       | Split components into clear files for easy debugging and reuse                    |
| [rules/i18n.md](rules/i18n.md)                   | Locale files are flat `a.b.c` keys, no nested objects                             |
| [rules/code-style.md](rules/code-style.md)       | React.FC components, import blocks, early return, comments, cn(), no magic values |
| [rules/structure.md](rules/structure.md)         | const/, hooks/, helpers/ folders and what goes where                              |
| [rules/words.md](rules/words.md)                 | Word list layout: language/category/difficulty files and how to add pairs         |
| [rules/a11y.md](rules/a11y.md)                   | Accessibility and web interface guidelines (Vercel)                               |
| [rules/contrast.md](rules/contrast.md)           | Pastel text only on dark surfaces; text on pastel uses dark `on-*` colors         |

To add a rule: create `rules/<name>.md` and add one row to the table above.
