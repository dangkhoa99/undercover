import { describe, expect, it } from 'vitest'

import { GROUP_COLOR } from '@/const/groups'

import {
  applyGameResult,
  newGroup,
  nextGroupNumber,
  unclaimedNames,
  withMember,
  withoutMember,
  type Group,
} from './groups'

const group: Group = {
  id: 'g',
  number: 1,
  name: null,
  color: GROUP_COLOR.CORAL,
  members: ['Khoa', 'Binh'],
  scores: { Khoa: 2, Binh: 6 },
  usedWords: [],
  lastPlayed: null,
}

describe('groups', () => {
  it('adds new members but ignores blanks and case/space-insensitive duplicates', () => {
    expect(withMember(group, ' An ').members).toEqual(['Khoa', 'Binh', 'An'])
    expect(withMember(group, ' khoa ')).toBe(group)
    expect(withMember(group, '   ')).toBe(group)
  })

  it('removing a member also drops their score', () => {
    const next = withoutMember(group, 'Khoa')
    expect(next.members).toEqual(['Binh'])
    expect(next.scores).toEqual({ Binh: 6 })
  })

  it('lists names nobody has taken yet, keeping order', () => {
    expect(unclaimedNames(['Khoa', 'Binh', 'An'], ['binh'])).toEqual(['Khoa', 'An'])
  })

  it('numbers groups 1, 2, 3… even after one in the middle was deleted', () => {
    expect(nextGroupNumber([])).toBe(1)
    expect(nextGroupNumber([group, { ...group, id: 'h', number: 3 }])).toBe(4)
    expect(newGroup([group]).number).toBe(2)
  })

  it('adds game points to the totals, matching names loosely and enrolling newcomers', () => {
    const next = applyGameResult(
      group,
      [
        { id: 'p0', name: 'khoa ' },
        { id: 'p1', name: 'An' },
      ],
      { p0: 10, p1: 2 },
      123,
    )
    expect(next.scores).toEqual({ Khoa: 12, Binh: 6, An: 2 })
    expect(next.members).toEqual(['Khoa', 'Binh', 'An'])
    expect(next.lastPlayed).toBe(123)
  })
})
