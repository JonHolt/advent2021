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

describe('Day 3: Binary Diagnostic', () => {
	describe('Part 1', () => {
		function solution(input: string): number {
			const lines = input.split('\r\n')
			const totals: Array<number> = []

			lines.forEach(line => {
				line.split('').forEach((digit, idx) => {
					totals[idx] = totals[idx] ? totals[idx] + Number(digit) : Number(digit)
				})
			})

			let gamma = '0b'
			let epsilon = '0b'
			totals.forEach(sum => {
				if(sum > (lines.length / 2)) {
					gamma += '1'
					epsilon += '0'
				}
				else {
					epsilon += '1'
					gamma += '0'
				}
			})

			return Number(gamma) * Number(epsilon)
		}

		test('with example data', () => {
			const testData = load('test-1')
			expect(solution(testData)).toBe(198)
		})
		test('with puzzle input', () => {
			const testData = load('puzzle')
			expect(solution(testData)).toBe(841526)
		})
	})

	describe('Part 2', () => {
		function solution(input: string):number {
			const lines = input.split('\r\n')

			return oxyRating(lines) * co2Rating(lines)
		}
		function oxyRating(lines: Array<string>, index: number = 0): number {
			const columnSum = lines.reduce((sum, line) => sum + Number(line[index]), 0)
			const keepValue = columnSum >= (lines.length / 2) ? '1' : '0'
			const keepers = lines.filter(line => line[index] === keepValue)
			
			return keepers.length === 1 ? Number('0b' + keepers[0]) : oxyRating(keepers, index + 1)
		}
		function co2Rating(lines: Array<string>, index: number = 0): number {
			const columnSum = lines.reduce((sum, line) => sum + Number(line[index]), 0)
			const keepValue = columnSum >= (lines.length / 2) ? '0' : '1'
			const keepers = lines.filter(line => line[index] === keepValue)
			
			return keepers.length === 1 ? Number('0b' + keepers[0]) : co2Rating(keepers, index + 1)
		}

		test('with example data', () => {
			const testData = load('test-2')
			expect(solution(testData)).toBe(230)
		})
		test('with puzzle input', () => {
			const testData = load('puzzle')
			expect(solution(testData)).toBe(4790390)
		})
	})
})