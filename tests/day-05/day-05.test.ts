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

interface Segment {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface PointCounter {
  [key: string]: number
}

describe('Day 5: Hydro Homies', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      const lines = input.split('\r\n').map((line) => {
        const [point1, point2] = line.split(' -> ')
        const [x1, y1] = point1 && point1.split(',')
        const [x2, y2] = point2 && point2.split(',')

        return {
          x1: Number(x1),
          y1: Number(y1),
          x2: Number(x2),
          y2: Number(y2),
        }
      })

      const points: PointCounter = {}

      for (const segment of lines) {
        if (segment.x1 === segment.x2) {
          for (
            let y = Math.min(segment.y1, segment.y2);
            y <= Math.max(segment.y1, segment.y2);
            y++
          ) {
            const key = `${segment.x1}:${y}`
            points[key] = !!points[key] ? points[key] + 1 : 1
          }
        }
        if (segment.y1 === segment.y2) {
          for (
            let x = Math.min(segment.x1, segment.x2);
            x <= Math.max(segment.x1, segment.x2);
            x++
          ) {
            const key = `${x}:${segment.y1}`
            points[key] = !!points[key] ? points[key] + 1 : 1
          }
        }
      }

      console.log(Object.values(points))

      return Object.values(points).reduce(
        (sum, pointCount) => (pointCount > 1 ? sum + 1 : sum),
        0
      )
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(5)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(6113)
    })
  })

  describe('Part 2', () => {
    function solution(input: string): number {
      const lines = input.split('\r\n').map((line) => {
        const [point1, point2] = line.split(' -> ')
        const [x1, y1] = point1 && point1.split(',')
        const [x2, y2] = point2 && point2.split(',')

        return {
          x1: Number(x1),
          y1: Number(y1),
          x2: Number(x2),
          y2: Number(y2),
        }
      })

      const points: PointCounter = {}

      for (const segment of lines) {
        if (segment.x1 === segment.x2) {
          for (
            let y = Math.min(segment.y1, segment.y2);
            y <= Math.max(segment.y1, segment.y2);
            y++
          ) {
            const key = `${segment.x1}:${y}`
            points[key] = !!points[key] ? points[key] + 1 : 1
          }
        } else if (segment.y1 === segment.y2) {
          for (
            let x = Math.min(segment.x1, segment.x2);
            x <= Math.max(segment.x1, segment.x2);
            x++
          ) {
            const key = `${x}:${segment.y1}`
            points[key] = !!points[key] ? points[key] + 1 : 1
          }
        } else {
          let x = segment.x1
          let xOffset = segment.x2 > segment.x1 ? 1 : -1
          let y = segment.y1
          let yOffset = segment.y2 > segment.y1 ? 1 : -1

          while (x !== segment.x2) {
            const key = `${x}:${y}`
            points[key] = !!points[key] ? points[key] + 1 : 1
            x += xOffset
            y += yOffset
          }
          const key = `${segment.x2}:${segment.y2}`
          points[key] = !!points[key] ? points[key] + 1 : 1
        }
      }

      return Object.values(points).reduce(
        (sum, pointCount) => (pointCount > 1 ? sum + 1 : sum),
        0
      )
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(12)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(20373)
    })
  })
})
