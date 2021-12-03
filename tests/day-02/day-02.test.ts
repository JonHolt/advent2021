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

describe('Day 2: Dive!', () => {
	describe('Part 1', () => {
		function solution(input: string): number {
			const data = input.split('\n').map(line => {
				const parts = line.split(' ')
				return {direction: parts[0], distance: Number(parts[1])}
			})
			
			let horizontal = 0
			let depth = 0

			data.forEach(command => {
				switch(command.direction) {
					case 'forward':
						horizontal += command.distance
						break
					case 'down':
						depth += command.distance
						break
					case 'up':
						depth -= command.distance
					default:
				}
			})

			return horizontal * depth;
		}

		test('with example data', () => {
			const testData = load('test-1')
			expect(solution(testData)).toBe(150);
		})
		test('with puzzle input', () => {
			const testData = load('puzzle')
			expect(solution(testData)).toBe(1488669)
		})
	})

	describe('Part 2', () => {
		function solution(input: string):number {
			const data = input.split('\n').map(line => {
				const parts = line.split(' ')
				return {direction: parts[0], distance: Number(parts[1])}
			})
			
			let horizontal = 0
			let depth = 0
			let aim = 0

			data.forEach(command => {
				switch(command.direction) {
					case 'forward':
						horizontal += command.distance
						depth += command.distance * aim
						break
					case 'down':
						aim += command.distance
						break
					case 'up':
						aim -= command.distance
					default:
				}
			})

			return horizontal * depth;
		}

		test('with example data', () => {
			const testData = load('test-2')
			expect(solution(testData)).toBe(900)
		})
		test('with puzzle input', () => {
			const testData = load('puzzle')
			expect(solution(testData)).toBe(1176514794)
		})
	})
})