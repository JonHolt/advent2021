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

describe('Day 1: Sonar Sweep', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      return 0
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(0)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(0)
    })
  })

  describe('Part 2', () => {
    function solution(input: string): number {
      return 0
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(0)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(0)
    })
  })
})