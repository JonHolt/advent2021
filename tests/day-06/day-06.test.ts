import * as path from 'path'
import { readFileSync } from 'fs'

const load = (type: 'test-1' | 'test-2' | 'puzzle') => {
  const filePath = path.join(
    __dirname,
    type === 'test-1'
      ? 'test-data.part-1.txt'
      : type === 'test-2'
      ? 'test-data.part-2.txt'
      : 'puzzle-input.txt'
  )
  return readFileSync(filePath).toString()
}

describe('Day 6: Lanternfish', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      const fish: number[] = []
      for (const lifetime of input.split(',')) {
        const days = Number(lifetime)
        fish[days] = (fish[days] ?? 0) + 1
      }

      for (let i = 0; i < 80; i++) {
        const reproducers = fish.shift()
        fish[6] = (fish[6] ?? 0) + (reproducers ?? 0)
        fish[8] = (fish[8] ?? 0) + (reproducers ?? 0)
      }

      return fish.reduce((sum, current) => sum + current)
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(5934)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(349549)
    })
  })

  describe('Part 2', () => {
    function solution(input: string): number {
      const fish: number[] = []
      for (const lifetime of input.split(',')) {
        const days = Number(lifetime)
        fish[days] = (fish[days] ?? 0) + 1
      }

      for (let i = 0; i < 256; i++) {
        const reproducers = fish.shift()
        fish[6] = (fish[6] ?? 0) + (reproducers ?? 0)
        fish[8] = (fish[8] ?? 0) + (reproducers ?? 0)
      }

      return fish.reduce((sum, current) => sum + current)
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(26984457539)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(1589590444365)
    })
  })
})
