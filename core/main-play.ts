import yargs from 'yargs'
import path from 'path'
import { exit } from 'process'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import fg from 'fast-glob'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { liquidParse } from './template-contruct'

void (async () => {
  try {
    const { p: playgroundDirectoryName } = yargs(
      process.argv.slice(2)
    ).parseSync()

    if (
      playgroundDirectoryName === null ||
      typeof playgroundDirectoryName !== 'string'
    ) {
      throw new Error(
        'Please provide a valid playground directory name using the -p parameter'
      )
    }

    const playgroundDirectoryPath = path.join(
      process.cwd(),
      'playgrounds',
      playgroundDirectoryName
    )

    const [entry] = await fg('play.{js,ts,jsx,tsx}', {
      cwd: playgroundDirectoryPath,
      absolute: false
    })

    const [liquidEntry] = await fg('play.liquid', {
      cwd: playgroundDirectoryPath,
      absolute: false
    })

    const envPath = path.join(playgroundDirectoryPath, '.env')
    const envFileExists = existsSync(envPath)
    if (envFileExists) {
      dotenv.config({ path: envPath, override: true, quiet: true })
    }

    const scriptPath = path.join(playgroundDirectoryPath, entry)
    const playgroundModule = await import(scriptPath)
    if (typeof playgroundModule.default !== 'function') {
      throw new Error('No exported default function found in playground module')
    }

    console.log(
      [
        '\n------------------------------------------------------',
        ` Running Playground: ${playgroundDirectoryName} `,
        ...[
          liquidEntry !== undefined
            ? ' - Local URL: http://localhost:3030/core/index'
            : null
        ],
        '------------------------------------------------------'
      ]
        .filter(Boolean)
        .join('\n')
    )

    const testFiles = await fg(
      ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
      {
        cwd: playgroundDirectoryPath,
        absolute: false
      }
    )

    if (testFiles.length > 0) {
      console.log('\nRunning Tests:', testFiles)
      execSync('npx vitest run', {
        stdio: 'inherit',
        cwd: playgroundDirectoryPath
      })

      console.log('------------------------------------------------------\n')
    }

    if (liquidEntry === undefined) {
      await playgroundModule.default()
      return
    }

    const htmlScriptEntryFile = path.join(process.cwd(), 'core', '_entry.ts')
    const scriptPathWithouFileType = scriptPath.replace(
      /\.(ts|js|tsx|jsx)$/,
      ''
    )

    const liquidDataPath = path.join(playgroundDirectoryPath, 'liquid.json')
    const liquidDataFileExists = existsSync(liquidDataPath)
    const liquidDataString = liquidDataFileExists
      ? readFileSync(liquidDataPath, 'utf-8')
      : '{}'

    const cssPath = path.join(playgroundDirectoryPath, 'play.css')

    const liquidData = await liquidParse(
      playgroundDirectoryPath,
      JSON.parse(liquidDataString)
    )

    writeFileSync(
      htmlScriptEntryFile,
      `
/* Auto-generated file. Do not modify directly. */
import {cssInject} from './template-contruct'
import playgroundFunction from '${scriptPathWithouFileType}'
async function run() {

  document.body.innerHTML = \`${liquidData.replace(/`/g, '\\`')}\`
  await cssInject(\`${existsSync(cssPath) ? cssPath : ''}\`)
  await playgroundFunction()
}

window.document.addEventListener('DOMContentLoaded', run)
      `.trim()
    )
  } catch (error) {
    console.error('Failed to run playground:', error)
    exit(1)
  }
})()
