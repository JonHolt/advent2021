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
      const heightMap = input
        .split('\r\n')
        .map((line) => line.split('').map((x) => Number(x)))

      let risk = 0

      for (let y = 0; y < heightMap.length; y++) {
        for (let x = 0; x < heightMap[y].length; x++) {
          const point = heightMap[y][x]

          const up = y > 0 ? point < heightMap[y - 1][x] : true
          const down =
            y < heightMap.length - 1 ? point < heightMap[y + 1][x] : true
          const left = x > 0 ? point < heightMap[y][x - 1] : true
          const right =
            x < heightMap[y].length - 1 ? point < heightMap[y][x + 1] : true
          if (up && down && left && right) {
            risk += point + 1
          }
        }
      }
      return risk
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(15)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(496)
    })
  })

  interface Point {
    x: number
    y: number
  }

  describe('Part 2', () => {
    function solution(input: string): number {
      const heightMap = input
        .split('\r\n')
        .map((line) => line.split('').map((x) => Number(x)))

      let basinSizes: number[] = []

      for (let y = 0; y < heightMap.length; y++) {
        for (let x = 0; x < heightMap[y].length; x++) {
          const point = heightMap[y][x]

          const up = y > 0 ? point < heightMap[y - 1][x] : true
          const down =
            y < heightMap.length - 1 ? point < heightMap[y + 1][x] : true
          const left = x > 0 ? point < heightMap[y][x - 1] : true
          const right =
            x < heightMap[y].length - 1 ? point < heightMap[y][x + 1] : true
          if (up && down && left && right) {
            const basinSet = new Set()
            const pointQueue: Point[] = [{ x, y }]
            basinSet.add(`${x}:${y}`)

            while (pointQueue.length > 0) {
              const nextPoint = pointQueue.shift() ?? { x, y }
              if (
                nextPoint.y > 0 &&
                !basinSet.has(`${nextPoint.x}:${nextPoint.y - 1}`) &&
                heightMap[nextPoint.y - 1][nextPoint.x] !== 9
              ) {
                pointQueue.push({ x: nextPoint.x, y: nextPoint.y - 1 })
                basinSet.add(`${nextPoint.x}:${nextPoint.y - 1}`)
              }
              if (
                nextPoint.y < heightMap.length - 1 &&
                !basinSet.has(`${nextPoint.x}:${nextPoint.y + 1}`) &&
                heightMap[nextPoint.y + 1][nextPoint.x] !== 9
              ) {
                pointQueue.push({ x: nextPoint.x, y: nextPoint.y + 1 })
                basinSet.add(`${nextPoint.x}:${nextPoint.y + 1}`)
              }
              if (
                nextPoint.x > 0 &&
                !basinSet.has(`${nextPoint.x - 1}:${nextPoint.y}`) &&
                heightMap[nextPoint.y][nextPoint.x - 1] !== 9
              ) {
                pointQueue.push({ x: nextPoint.x - 1, y: nextPoint.y })
                basinSet.add(`${nextPoint.x - 1}:${nextPoint.y}`)
              }
              if (
                nextPoint.x < heightMap[y].length - 1 &&
                !basinSet.has(`${nextPoint.x + 1}:${nextPoint.y}`) &&
                heightMap[nextPoint.y][nextPoint.x + 1] !== 9
              ) {
                pointQueue.push({ x: nextPoint.x + 1, y: nextPoint.y })
                basinSet.add(`${nextPoint.x + 1}:${nextPoint.y}`)
              }
            }

            basinSizes.push(basinSet.size)
          }
        }
      }

      return basinSizes
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((prod, x) => x * prod)
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(1134)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(0)
    })
  })
})
