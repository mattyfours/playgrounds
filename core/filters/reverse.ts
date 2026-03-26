export const reverse = {
  filterName: 'reverse',
  filterFunction: (input: string): string => {
    return input.split('').reverse().join('')
  }
}