import path from 'path'
import { exit } from 'process'
import prompts from 'prompts'
import { execSync } from 'child_process'
import { existsSync, writeFileSync } from 'fs'

async function createBasicPlaygroundStructure(
  newPlaygroundDir: string,
  isTypescript: boolean
) {
  const includeEnv = (await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Include a .env file:',
    initial: false,
    active: 'yes',
    inactive: 'no'
  })) as { value: boolean }

  if (includeEnv.value) {
    writeFileSync(
      path.join(newPlaygroundDir, '.env'),
      `
EXAMPLE_KEY=example_value
    `.trim()
    )

    writeFileSync(
      path.join(newPlaygroundDir, 'example.env'),
      `
# Example .env file
EXAMPLE_KEY=example_value
    `.trim()
    )
  }

  const includeTestFile = (await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Include a test file:',
    initial: false,
    active: 'yes',
    inactive: 'no'
  })) as { value: boolean }

  if (includeTestFile.value) {
    writeFileSync(
      path.join(
        newPlaygroundDir,
        isTypescript ? 'play.test.ts' : 'play.test.js'
      ),
      `
import { expect, test } from 'vitest'
import playFunction from './play'

test('playground runs without errors', async () => {
  await expect(playFunction()).resolves.not.toThrow()
})
      `.trim()
    )
  }
}

async function createFrontendPlaygroundStructure(
  playgroundName: string,
  newPlaygroundDir: string
) {
  writeFileSync(
    path.join(newPlaygroundDir, 'play.liquid'),
    `
<playground-app class="block">
  <h1 class="text-center m-7">[{{ title }}] Playground!</h1>
</playground-app>
    `.trim()
  )
  writeFileSync(
    path.join(newPlaygroundDir, 'liquid.json'),
    `
{
  "title": "${playgroundName}"
}
    `.trim()
  )

  const includeCssFile = (await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Include a css file:',
    initial: false,
    active: 'yes',
    inactive: 'no'
  })) as { value: boolean }

  if (includeCssFile.value) {
    writeFileSync(
      path.join(newPlaygroundDir, 'play.css'),
      `
body {
  background-color: #000;
  color: #fff;
}
        `.trim()
    )
  }
}

void (async () => {
  try {
    const playgroundName = (await prompts({
      type: 'text',
      name: 'value',
      message: 'Enter the playground directory name:',
      error: 'Please enter a valid kabab-case directory name.',
      validate: (value: string) => value.length !== 0 && /^[\w-]+$/.test(value)
    })) as { value: string }

    const playgroundsDir = path.join(process.cwd(), 'playgrounds')
    if (existsSync(path.join(playgroundsDir, playgroundName.value))) {
      throw new Error('Playground directory already exists.')
    }

    const isTypescript = (await prompts({
      type: 'toggle',
      name: 'value',
      message: 'Use TypeScript:',
      initial: false,
      active: 'yes',
      inactive: 'no'
    })) as { value: boolean }

    const isFrontEnd = (await prompts({
      type: 'toggle',
      name: 'value',
      message: 'Playground type:',
      initial: false,
      active: 'Frontend (LIQUID/CSS/JS)',
      inactive: 'Basic (Node.js)'
    })) as { value: boolean }

    const newPlaygroundDir = path.join(playgroundsDir, playgroundName.value)

    execSync(`mkdir -p ${newPlaygroundDir}`)

    if (!isFrontEnd.value) {
      writeFileSync(
        path.join(newPlaygroundDir, isTypescript ? 'play.ts' : 'play.js'),
        `
export default async function playground () {
  console.log('[${playgroundName.value}] Playground!')
}
        `.trim()
      )
      await createBasicPlaygroundStructure(newPlaygroundDir, isTypescript.value)

      return
    }

    const frameWorkOption = (await prompts({
      type: 'select',
      name: 'value',
      message: 'Framework:',
      initial: 0,
      choices: [
        { title: 'None', value: 'none' },
        { title: 'Preact', value: 'preact' }
      ]
    })) as { value: boolean }

    const frameworkToUse = `${frameWorkOption?.value}`

    if (frameworkToUse === 'none') {
      writeFileSync(
        path.join(newPlaygroundDir, isTypescript ? 'play.ts' : 'play.js'),
        `
export default async function playground(): Promise<void> {
  class Playground extends HTMLElement {
    constructor() {
      super()
      console.log('[${playgroundName.value}] Playground!')
    }
  }

  if (window.customElements.get('playground-app') === undefined) {
    window.customElements.define('playground-app', Playground)
  }
}
        `.trim()
      )
    } else if (frameworkToUse === 'preact') {
      writeFileSync(
        path.join(newPlaygroundDir, isTypescript ? 'play.tsx' : 'play.jsx'),
        `
import { render } from 'preact';
import { useState } from 'preact/hooks';

function App() {
  const [number, setNumber] = useState(0);

  const handleNumberClick = () => {
    setNumber(number + 1);
  };

  return (
    <div className="block w-full text-center">
      <button onClick={handleNumberClick} className="text-center m-7">
        Clicked {number} times
      </button>
    </div>
  )
}

export default async function playground(): Promise<void> {
  class Playground extends HTMLElement {
    constructor() {
      super()
       this.innerHTML = ''
      render(<App />, this)
    }
  }

  if (window.customElements.get('playground-app') === undefined) {
    window.customElements.define('playground-app', Playground)
  }
}
        `.trim()
      )
    }

    await createFrontendPlaygroundStructure(
      playgroundName.value,
      newPlaygroundDir
    )
  } catch (error) {
    console.error('Failed to run playground:', error)
    exit(1)
  }
})()
