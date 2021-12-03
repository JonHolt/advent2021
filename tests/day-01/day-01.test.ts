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

const solve = (input: string) => {
  const lines = input.split('\n').map(el => Number(el));
  let lastNum: number | null = null;
  let count = 0;
  lines.forEach(el => {
    if (lastNum !== null && el > lastNum) {
      count = count + 1;
    }
    lastNum = el;
  });

  return count;
}

const solvePart2 = (input: string) => {
  const lines = input.split('\n').map(el => Number(el));
  let lastSum: number | null = null;
  let count = 0;

  for(let i = 2; i < lines.length; i++) {
    let sum = lines[i] + lines[i-1] + lines[i-2];
    if( lastSum !== null && sum > lastSum) {
      count++;
    }
    lastSum = sum;
  };
  return count;
}

describe('Day 1: Sonar Sweep', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      return solve(input);
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(7)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(1722)
    })
  })

  describe('Part 2', () => {
    function solution(input: string): number {
      return solvePart2(input);
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(5)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(1748)
    })
  })
})