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

const checkRow = (startIndex: number, board: Array<number>, wasCalled: Array<boolean>): boolean => {
  const row = board.slice(startIndex, startIndex + 5)
  let filtered = row.filter(num => wasCalled[num])
  return filtered.length === 5
}
const checkRows = (board: Array<number>, wasCalled: Array<boolean>): boolean => {
  for(let x = 0; x < 25; x += 5) {
    if(checkRow(x, board, wasCalled)) {
      return true
    }
  }
  return false
}

const checkColumn = (index: number, board: Array<number>, wasCalled: Array<boolean>): boolean => {
  // If current number wasn't called
  if (!wasCalled[board[index]]) {
    return false;
  }
  // Was called and last in column
  if (index + 5 >= 25) {
    return true
  }
  return checkColumn(index + 5, board, wasCalled)
}
const checkColumns = (board: Array<number>, wasCalled: Array<boolean>): boolean => {
  return checkColumn(0, board, wasCalled)
      || checkColumn(1, board, wasCalled)
      || checkColumn(2, board, wasCalled)
      || checkColumn(3, board, wasCalled)
      || checkColumn(4, board, wasCalled)
}

describe('Day 4: Giant Squid', () => {
  describe('Part 1', () => {
    function solution(input: string): number {
      const lines = input.split('\r\n')
      const callOrder = lines[0].split(',').map(num => Number(num))
      const wasCalled: Array<boolean> = []
      const boards: Array<number[]> = []
      
      lines.forEach((line, index) => {
        if(index === 0) {
          return
        }
        // Puzzle index = Math.floor((line number - 1) / 6)
        if (line.length > 1) {
          const boardIndex =Math.floor((index - 1) / 6)
          if(!boards[boardIndex]) {
            boards[boardIndex] = []
          }

          const row = line.split(' ').filter(x => !!x).map(num => Number(num))
          boards[boardIndex].push(...row)
        }
      })
      
      for(let i = 0; i < callOrder.length; i++) {
        wasCalled[callOrder[i]] = true
        let score = 0

        boards.forEach(board => {
          if (checkRows(board, wasCalled) || checkColumns(board, wasCalled)) {
            const total: number = board.reduce((sum, val) => {
              return !!wasCalled[val] ? sum : sum + val
            }, 0)
            score = total * callOrder[i]
          }
        })

        if(score !== 0) {
          return score
        }
      }

      return 0
    }

    test('with example data', () => {
      const testData = load('test-1')
      expect(solution(testData)).toBe(4512)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(5685)
    })
  })

  interface board {
    hasWon: boolean
    values: number[]
  }

  describe('Part 2', () => {
    function solution(input: string): number {
      const lines = input.split('\r\n')
      const callOrder = lines[0].split(',').map(num => Number(num))
      const wasCalled: Array<boolean> = []
      const boards: Array<board> = []
      
      lines.forEach((line, index) => {
        if(index === 0) {
          return
        }
        // Puzzle index = Math.floor((line number - 1) / 6)
        if (line.length > 1) {
          const boardIndex =Math.floor((index - 1) / 6)
          if(!boards[boardIndex]) {
            boards[boardIndex] = { hasWon: false, values: []}
          }

          const row = line.split(' ').filter(x => !!x).map(num => Number(num))
          boards[boardIndex].values.push(...row)
        }
      })
      
      for(let i = 0; i < callOrder.length; i++) {
        wasCalled[callOrder[i]] = true
        let score = 0

        boards.forEach(board => {
          if (!board.hasWon && (checkRows(board.values, wasCalled) || checkColumns(board.values, wasCalled))) {
            board.hasWon = true

            const losingBoards = boards.filter(board => !board.hasWon)
            if(losingBoards.length === 0){
                const total: number = board.values.reduce((sum, val) => {
                  return !!wasCalled[val] ? sum : sum + val
                }, 0)
                score = total * callOrder[i]
            }
          }
        })
        
        if (score !== 0) {
          return score
        }
      }

      return 0
    }

    test('with example data', () => {
      const testData = load('test-2')
      expect(solution(testData)).toBe(1924)
    })

    test('with puzzle input', () => {
      const testData = load('puzzle')
      expect(solution(testData)).toBe(21070)
    })
  })
})