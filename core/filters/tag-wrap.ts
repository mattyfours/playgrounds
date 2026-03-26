export const tagWrap = {
  filterName: 'tag_wrap',
  filterFunction: (input: string, tag: string): string => {
    return `<${tag}>${input}</${tag}>`
  }
}