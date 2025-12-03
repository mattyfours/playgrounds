import { readFile } from 'fs/promises'
import minimist from 'minimist'
import path from 'path'
import { exit } from 'process'
import toml from 'toml'
import dotenv from 'dotenv'

void (async () => {
  try {
    const { p: playgroundDirectoryName } = minimist(process.argv.slice(2))

    if (
      playgroundDirectoryName === null ||
      typeof playgroundDirectoryName !== 'string'
    ) {
      throw new Error(
        'Please provide a valid playground directory name using the -p parameter'
      )
    }

    const playgroundPath = path.join(
      process.cwd(),
      'playgrounds',
      playgroundDirectoryName,
      'playground.toml'
    )

    const playgroundToml = await readFile(playgroundPath, 'utf-8')

    const { entry = 'play.ts', hasEnv = false } = toml.parse(playgroundToml)

    if (hasEnv === true) {
      const envPath = path.join(
        process.cwd(),
        'playgrounds',
        playgroundDirectoryName,
        '.env'
      )
      dotenv.config({ path: envPath, quiet: true })
    }

    const scriptPath = path.join(
      process.cwd(),
      'playgrounds',
      playgroundDirectoryName,
      entry
    )

    const playgroundModule = await import(scriptPath)

    if (typeof playgroundModule.default === 'function') {
      console.log(
        [
          '------------------------------------------------------',
          ` Running Playground: ${playgroundDirectoryName} `,
          '------------------------------------------------------'
        ].join('\n')
      )

      await playgroundModule.default()
    } else {
      throw new Error('No exported default function found in playground module')
    }
  } catch (error) {
    console.error('Failed to run playground:', error)
    exit(1)
  }
})()
