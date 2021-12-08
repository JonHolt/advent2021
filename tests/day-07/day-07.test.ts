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

describe('Day 7: The Treachery of Whales', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      const positions = input.split(',').map((x) => Number(x))
      const deltas: number[] = []

      for (const position of positions) {
        if (!deltas[position]) {
          deltas[position] = positions.reduce(
            (fuelCost, sourcePos) => fuelCost + Math.abs(sourcePos - position),
            0
          )
        }
      }

      return deltas.reduce((runningMin, nextVal) =>
        Math.min(runningMin, nextVal)
      )
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(37)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(342534)
    })
  })

  describe('Part 2', () => {
    const stepCosts: number[] = []

    function stepCost(steps: number) {
      if (!stepCosts[steps]) {
        let sum = 0
        for (let i = 1; i <= steps; i++) {
          sum += i
        }
        stepCosts[steps] = sum
      }
      return stepCosts[steps]
    }

    function solution(input: string): number {
      const positions = input.split(',').map((x) => Number(x))
      const deltas: number[] = []

      for (let position = 0; position <= Math.max(...positions); position++) {
        if (!deltas[position]) {
          deltas[position] = positions.reduce((fuelCost, sourcePos) => {
            return fuelCost + stepCost(Math.abs(sourcePos - position))
          }, 0)
        }
      }

      return deltas.reduce((runningMin, nextVal) =>
        Math.min(runningMin, nextVal)
      )
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(168)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(94004208)
    })
  })
})
