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

describe('Day 8: Seven Segment Search', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      return input.split('\r\n').reduce((grandTotal, line) => {
        return (
          grandTotal +
          line
            .split(' | ')[1]
            .split(' ')
            .reduce(
              (instances, digit) =>
                [2, 4, 3, 7].includes(digit.length) ? instances + 1 : instances,
              0
            )
        )
      }, 0)
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(26)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(532)
    })
  })

  interface Display {
    inputs: Array<Set<string>>
    outputs: Array<Set<string>>
  }

  const stringToSet = (input: string) => {
    return new Set(input.split(''))
  }

  const equalSet = (a: Set<string>, b: Set<string>) => {
    return [...a].filter((x) => !b.has(x)).length === 0
  }

  describe('Part 2', () => {
    function solution(input: string): number {
      const displays = input.split('\r\n').map((line) => {
        const [inputSegment, outputSegment] = line.split(' | ')
        return {
          inputs: inputSegment.split(' ').map(stringToSet),
          outputs: outputSegment.split(' ').map(stringToSet),
        }
      })

      let total = 0

      for (const display of displays) {
        const fiveSegs = display.inputs.filter((num) => num.size === 5)
        const sixSegs = display.inputs.filter((num) => num.size === 6)
        // Find 1, 4, and 7
        const one = display.inputs.filter((num) => num.size === 2)[0]
        const four = display.inputs.filter((num) => num.size === 4)[0]
        const seven = display.inputs.filter((num) => num.size === 3)[0]
        const eight = display.inputs.filter((num) => num.size === 7)[0]
        // Find top segment
        const top = [...seven].filter((seg) => !four.has(seg))[0]
        // Find 9
        const nineElem = [...four, ...seven]
        const nine = sixSegs.filter(
          (num) =>
            [...num].filter((seg) => !nineElem.includes(seg)).length === 1
        )[0]
        // Find bottom segment
        const bottom = [...nine].filter((seg) => !nineElem.includes(seg))[0]
        // Find 3
        const threeElem = [...one, top, bottom]
        const three = fiveSegs.filter(
          (num) =>
            [...num].filter((seg) => !threeElem.includes(seg)).length === 1
        )[0]
        // Find center and top left
        const center = [...three].filter((seg) => !threeElem.includes(seg))[0]
        const topLeft = [...four].filter(
          (seg) => ![...one, center].includes(seg)
        )[0]
        // Find six and zero
        const zero = sixSegs.filter((num) => !num.has(center))[0]
        const six = sixSegs.filter(
          (num) => !(equalSet(num, zero) || equalSet(num, nine))
        )[0]
        // Find five and 2
        const five = fiveSegs.filter((num) => num.has(topLeft))[0]
        const two = fiveSegs.filter(
          (num) => !(equalSet(num, five) || equalSet(num, three))
        )[0]

        const key: { [key: string]: string } = {}
        key[[...zero].sort().join('')] = '0'
        key[[...one].sort().join('')] = '1'
        key[[...two].sort().join('')] = '2'
        key[[...three].sort().join('')] = '3'
        key[[...four].sort().join('')] = '4'
        key[[...five].sort().join('')] = '5'
        key[[...six].sort().join('')] = '6'
        key[[...seven].sort().join('')] = '7'
        key[[...eight].sort().join('')] = '8'
        key[[...nine].sort().join('')] = '9'

        const asString = display.outputs.reduce(
          (prev: string, current: Set<string>) =>
            prev + key[[...current].sort().join('')],
          ''
        )

        total += Number(asString)
      }

      return total
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(61229)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(1011284)
    })
  })
})
