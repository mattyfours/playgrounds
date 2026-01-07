import { Liquid } from 'liquidjs'

const engine = new Liquid()

export async function liquidParseAndInject(
  template: string = '',
  data: Record<string, any> = {}
): Promise<string> {
  try {
    const parsedHtml = await engine.parseAndRender(template, data)
    document.body.innerHTML = parsedHtml
    return parsedHtml
  } catch (error) {
    console.error('Liquid parsing error:', error)
    return template
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
