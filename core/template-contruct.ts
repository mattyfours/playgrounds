import { Liquid } from 'liquidjs'
import customFilters from './filters/custom-filters-imports'

export async function liquidParse(
  playgroundDirectoryPath: string = '.',
  data: Record<string, any> = {}
): Promise<string> {
  try {
    const engine = new Liquid({
      extname: '.liquid',
      root: [
        `${playgroundDirectoryPath}`,
        `${playgroundDirectoryPath}/snippets/`
      ]
    })

    for (const filter of customFilters) {
      engine.registerFilter(filter.filterName, filter.filterFunction)
    }

    const parsedHtml = await engine.renderFile('play', data)
    return parsedHtml
  } catch (error) {
    console.error('Liquid parsing error:', error)
    return ''
  }
}

export async function cssInject(cssPath: string = ''): Promise<string> {
  if (!cssPath) {
    return ''
  }

  const styleElement = document.createElement('link')
  styleElement.rel = 'stylesheet'
  styleElement.type = 'text/css'
  styleElement.href = cssPath
  document.head.appendChild(styleElement)
  return cssPath
}
