import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { GAME } from '@/const/game'
import { DIFFICULTY } from '@/const/words'
import { ACTION, PHASE } from '@/const/phases'
import { STORAGE } from '@/const/storage'
import { WORDS } from '@/data/words'
import { computeScores, createGame, reduce, shuffle } from '@/game/engine'
import { applyGameResult, newGroup, withMember, type Group } from '@/game/groups'
import { defaultRoleConfig } from '@/game/roles'
import type { Action, GameState, RoleConfig } from '@/game/types'
import { pickWord, recordWord, usedIdsFor, type WordEntry } from '@/game/words'
import type { Language } from '@/i18n'

import { idbStorage } from './idbStorage'

interface GameStore {
  playerCount: number
  /** `null` = use the suggested roles for the current player count. */
  roleConfig: RoleConfig | null
  /** Word history of a table without a group, `${language}:${entryId}`. A group keeps its own. */
  usedWords: string[]
  game: GameState | null
  groups: Group[]
  /** Group whose names are offered when picking cards; `null` = type names by hand. */
  groupId: string | null
  /** Group members in the random order they pick cards this game (empty without a group). */
  pickQueue: string[]
  /** The word pair dealt this game was already played by the table (every pair had been used). */
  wordRepeated: boolean
  /** Word dealt to the running game; only counts as played once the game finishes. */
  pendingWord: { language: Language; entryId: string } | null
  /** Player-written pairs per language; they live in the `custom` category. */
  customWords: Record<Language, WordEntry[]>

  addCustomWord: (language: Language, a: string, b: string) => void
  removeCustomWord: (language: Language, id: string) => void

  /** Changing the player count resets roles to the suggested ones. */
  setPlayerCount: (count: number) => void
  setRoleConfig: (config: RoleConfig | null) => void
  /** Deals roles and words from the current setup. Throws if the setup is invalid. */
  startGame: (language: Language) => void
  send: (action: Action) => void
  /** Picks a group (or none) and sizes the table to it. */
  selectGroup: (id: string | null) => void
  deleteGroup: (id: string) => void
  /** Inserts or replaces a group (by id). */
  saveGroup: (group: Group) => void
  /** Drops the running game; setup is kept for a rematch. */
  endGame: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      playerCount: GAME.DEFAULT_PLAYER_COUNT,
      roleConfig: null,
      usedWords: [],
      game: null,
      groups: [],
      groupId: null,
      pickQueue: [],
      wordRepeated: false,
      pendingWord: null,
      customWords: { en: [], vi: [] },

      setPlayerCount: (playerCount) => set({ playerCount, roleConfig: null }),
      setRoleConfig: (roleConfig) => set({ roleConfig }),

      startGame: (language) => {
        const { playerCount, roleConfig, usedWords, groups, groupId, pendingWord } = get()
        const group = groups.find((g) => g.id === groupId)
        const pickQueue = group ? shuffle(group.members, Math.random).slice(0, playerCount) : []
        const { customWords } = get()

        // A group remembers its own history; a table without one shares the global list.
        const used = usedIdsFor(group ? group.usedWords : usedWords, language)
        // A word dealt but abandoned ("change word") is not recorded, yet must not come back at once.
        if (pendingWord?.language === language) {
          used.push(pendingWord.entryId)
        }
        const picked = pickWord([...WORDS[language], ...customWords[language]], used)
        set({
          game: createGame({
            playerCount,
            roleConfig: roleConfig ?? defaultRoleConfig(playerCount),
            wordPair: picked.pair,
          }),
          pickQueue,
          wordRepeated: picked.repeated,
          pendingWord: { language, entryId: picked.entry.id },
        })
      },

      send: (action) => {
        const { game, groupId, groups, usedWords, pendingWord, wordRepeated } = get()
        if (!game) {
          return
        }

        const next = reduce(game, action)
        let nextGroups = groups
        let nextGroupId = groupId
        let nextUsedWords = usedWords

        if (action.type === ACTION.CONFIRM_CARD && groupId) {
          // Names typed during a group game join the group for next time.
          nextGroups = groups.map((g) => (g.id === groupId ? withMember(g, action.name) : g))
        } else if (game.phase !== PHASE.FINISHED && next.phase === PHASE.FINISHED) {
          // A finished game scores into its group and its word counts as played; the first game
          // of a new table creates a group that inherits the table's ungrouped word history.
          const existing = groups.find((g) => g.id === groupId)
          const base = existing?.usedWords ?? usedWords
          const history = pendingWord
            ? recordWord(base, pendingWord.language, pendingWord.entryId, wordRepeated)
            : base
          const updated = applyGameResult(
            { ...(existing ?? newGroup(groups)), usedWords: history },
            next.players,
            computeScores(next),
            Date.now(),
          )
          nextGroups = existing
            ? groups.map((g) => (g.id === updated.id ? updated : g))
            : [...groups, updated]
          nextGroupId = updated.id
          if (!existing) {
            nextUsedWords = []
          }
        }

        set({
          game: next,
          groups: nextGroups,
          groupId: nextGroupId,
          usedWords: nextUsedWords,
          pendingWord: next.phase === PHASE.FINISHED ? null : pendingWord,
        })
      },

      selectGroup: (id) => {
        const group = get().groups.find((g) => g.id === id)
        if (!group) {
          return set({ groupId: null })
        }

        const playerCount = Math.min(
          GAME.MAX_PLAYERS,
          Math.max(GAME.MIN_PLAYERS, group.members.length),
        )
        set({ groupId: group.id, playerCount, roleConfig: null })
      },

      deleteGroup: (id) => {
        const { groups, groupId } = get()
        set({ groups: groups.filter((g) => g.id !== id), groupId: groupId === id ? null : groupId })
      },

      saveGroup: (group) => {
        const { groups } = get()
        const exists = groups.some((g) => g.id === group.id)
        set({
          groups: exists ? groups.map((g) => (g.id === group.id ? group : g)) : [...groups, group],
        })
      },

      endGame: () => set({ game: null, pendingWord: null }),

      addCustomWord: (language, a, b) =>
        set(({ customWords }) => ({
          customWords: {
            ...customWords,
            [language]: [
              ...customWords[language],
              {
                id: `${GAME.CUSTOM_WORD_ID_PREFIX}${Date.now()}`,
                category: GAME.CUSTOM_CATEGORY,
                difficulty: DIFFICULTY.MEDIUM,
                a,
                b,
              },
            ],
          },
        })),
      removeCustomWord: (language, id) =>
        set(({ customWords }) => ({
          customWords: {
            ...customWords,
            [language]: customWords[language].filter((w) => w.id !== id),
          },
        })),
    }),
    {
      name: STORAGE.GAME_KEY,
      version: STORAGE.GAME_VERSION,
      storage: createJSONStorage(() => idbStorage),
      partialize: ({
        playerCount,
        roleConfig,
        usedWords,
        game,
        groups,
        groupId,
        pickQueue,
        wordRepeated,
        pendingWord,
        customWords,
      }) => ({
        playerCount,
        roleConfig,
        usedWords,
        game,
        groups,
        groupId,
        pickQueue,
        wordRepeated,
        pendingWord,
        customWords,
      }),
    },
  ),
)
