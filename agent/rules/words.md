# Word lists (`src/data/words`)

## Layout

```
src/data/words/<language>/<category>/<difficulty>.json
```

- `<language>`: `en`, `vi` (same folder name as the i18n language code).
- `<category>`: one of `WORD_CATEGORY` in `src/const/words.ts` (20 categories).
- `<difficulty>`: `easy`, `medium`, `hard` (`DIFFICULTY` in `src/const/words.ts`).
- Each file is a JSON array of `{ "id": "...", "a": "...", "b": "..." }`. Category and difficulty come from the path (`src/data/words/index.ts` reads them via `import.meta.glob`), so they are never written inside the entries.
- Empty files are allowed (`[]`), so an agent can fill a bucket later. Every bucket file exists for every category and language.

## Adding pairs

1. Pick the bucket (language + category + difficulty) and open only that file.
2. `id` = lowercase ASCII kebab-case of both words with diacritics stripped (`Phở`/`Bún` -> `pho-bun`), unique within the language.
3. Difficulty: `easy` = one obvious clue separates the words; `medium` = same family, a specific clue needed; `hard` = very close, only subtle details differ. Aim for about 35% easy, 45% medium, 20% hard per category.
4. Pair quality: both words familiar to ordinary speakers (age 12+), several shared associations but one clear explainable difference; no synonyms, no pairs too far apart, no one word containing the other, no brands, real people, characters or sensitive content.
5. Each word: 1-3 words, at most 20 characters, capitalised like a dictionary headword (`Ice cream`, `Trà sữa`). Vietnamese is written natively, never translated from English.
6. A word appears in at most 2 pairs of the same language; no pair repeats in either order.

## Checks

`bun run test` runs `src/data/words/words.test.ts` (unique ids and pairs, word reuse cap, length, known categories and difficulties). Fix data, do not loosen the test.

## Adding a category or language

- Category: add it to `WORD_CATEGORY`, create the three files in every language folder.
- Language: add the code to `SUPPORTED_LANGUAGES` (`src/const/languages.ts`), locale file, and a full folder tree.

## Category scope

| Category        | Covers                                                     |
| --------------- | ---------------------------------------------------------- |
| `animal`        | animals                                                    |
| `clothing`      | clothes, shoes, accessories                                |
| `drink`         | drinks                                                     |
| `entertainment` | games, shows, media, performance                           |
| `festival`      | holidays, celebrations, party things, traditions (neutral) |
| `food`          | dishes and ingredients                                     |
| `health`        | body, medicine, hygiene, fitness (nothing graphic)         |
| `hobby`         | crafts, games, pastimes, collecting                        |
| `home`          | furniture, rooms, appliances, household items              |
| `job`           | occupations                                                |
| `music`         | instruments, genres as things, concert items               |
| `nature`        | plants, weather, landscape                                 |
| `object`        | everyday handheld things                                   |
| `place`         | places                                                     |
| `school`        | school and study things, subjects, stationery              |
| `shopping`      | shops, money, payment, retail                              |
| `sport`         | sports and sport equipment                                 |
| `technology`    | devices, internet things (no brands)                       |
| `travel`        | trip things, accommodation, tourism, transport hubs        |
| `vehicle`       | vehicles                                                   |

A pair belongs to the category of its words, not of where it is used.

## How pairs are chosen (generation workflow)

Criteria come from published guidance on Undercover-style games: both words familiar, several shared associations, at least one clear difference; avoid synonyms, pairs too far apart and unfamiliar words. For a pair, test: is there one clue that fits both and one clue that separates them?

1. **Write**: one agent per language and category writes pairs from scratch (rules above). Alternate "same function, different setting" and "same setting, different use". Vietnamese is authored natively. Do not copy word lists from other Undercover / "Who is the spy" / imposter apps or sites; build pairs yourself.
2. **Merge and dedupe**: drop duplicate pairs (either order), pairs where one word contains the other, and words beyond the reuse cap (2 per language across all categories).
3. **Refill**: a category that fell short gets new pairs from an agent that is given the list of blocked words and existing pairs, and is told to explore sub-themes not yet covered.
4. **Review**: a separate reviewer re-reads every pair of its categories and flags the weakest (about 10-15%): unfamiliar or regional words, synonyms, pairs too far apart, a pair where one word is just a type of the other, unnatural wording or wrong diacritics, brands or sensitive content, wrong category. Each flagged pair gets a replacement that obeys all the rules.
5. **Classify difficulty** into `easy`/`medium`/`hard` (definitions above) and place the pair in that file.
6. Run `bun run test`.

When adding only a few pairs by hand, still do steps 1, 2 and 5, and read the whole bucket first so you do not repeat a pair or a word that already appears twice.

## Research basis

The criteria above were distilled from public guidance on building Undercover pairs (not from copying any list):

- Both words are familiar to everyone playing.
- Enough shared associations that a vague clue fits both, and at least one clear difference.
- Reject synonyms, pairs too far apart, and pairs that are too rare.
- Alternate "same function, different setting" and "same setting, different use".
- Balance difficulty across the list.

Sources read: "30 Undercover Word Pairs: Examples, Clues and Fair Play" (findtheimposter.com/blog/undercover-word-pairs) and Vietnamese guides for "Ai là gián điệp" (ai-hay.vn, trochoinhom.com). Re-check them when revising the criteria.
