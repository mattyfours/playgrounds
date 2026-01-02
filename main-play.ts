import { readFile } from 'fs/promises'
import yargs from 'yargs'
import path from 'path'
import { exit } from 'process'
import toml from 'toml'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import fg from 'fast-glob'
import { existsSync } from 'fs'

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

    const playgroundPath = path.join(playgroundDirectoryPath, 'playground.toml')
    const playgroundToml = await readFile(playgroundPath, 'utf-8')

    const { entry = 'play.ts' } = toml.parse(playgroundToml)

    const envPath = path.join(playgroundDirectoryPath, '.env')
    const envFileExists = existsSync(envPath)
    if (envFileExists) {
      dotenv.config({ path: envPath, override: true })
    }

    const scriptPath = path.join(playgroundDirectoryPath, entry)
    const playgroundModule = await import(scriptPath)
    if (typeof playgroundModule.default !== 'function') {
      throw new Error('No exported default function found in playground module')
    }

    console.log(
      [
        '------------------------------------------------------',
        ` Running Playground: ${playgroundDirectoryName} `,
        '------------------------------------------------------'
      ].join('\n')
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
    }

    console.log('------------------------------------------------------\n')

    await playgroundModule.default()
  } catch (error) {
    console.error('Failed to run playground:', error)
    exit(1)
  }
})()
