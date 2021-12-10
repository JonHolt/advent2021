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

type closer = ')' | ']' | '}' | '>'
type opener = '(' | '[' | '{' | '<'

describe('Day 10: Syntax Scoring', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      const points = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
      }
      const matchingPairs = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<',
      }
      const openers = new Set(['{', '(', '[', '<'])
      const lines = input.split('\r\n')

      let score: number = 0

      for (const line of lines) {
        const stack: string[] = []
        for (const c of line.split('')) {
          if (openers.has(c)) {
            stack.push(c)
            continue
          }

          if (stack.pop() !== matchingPairs[c as closer]) {
            score += points[c as closer]
            break
          }
        }
      }

      return score
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(26397)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(392367)
    })
  })

  describe('Part 2', () => {
    function solution(input: string): number {
      const points: { [key: string]: number } = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4,
      }
      const matchingPairs = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<',
      }
      const openers = new Set(['{', '(', '[', '<'])
      const lines = input.split('\r\n')

      let scores: number[] = []

      for (const line of lines) {
        let stack: opener[] = []
        for (const c of line.split('')) {
          if (openers.has(c)) {
            stack.push(c as opener)
            continue
          }

          if (stack.pop() !== matchingPairs[c as closer]) {
            stack = []
            break
          }
        }

        let pointCount = 0
        while (stack.length > 0) {
          pointCount = pointCount * 5
          const leftover = stack.pop()
          const pointVal = points[leftover as string]
          pointCount += pointVal
        }

        if (pointCount !== 0) {
          scores.push(pointCount)
        }
      }
      console.log(scores)
      return scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)]
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(288957)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(0)
    })
  })
})
