# Playgrounds

## Overview

A collection of quick test environments

## Getting Started

- Clone repo
- Run `yarn install`

## Running an Envrionment

- Run `yarn play -p playground_directory_name`
  - Example: `yarn play -p load-2000-variants`

## Configure a New Environment

- Create a new directory in the `playgrounds` directory
- Inside the new directory add a `playground.toml` file. TOML Option:
  - entry [string]: Filename of entry script. Defaults to `play.ts`
  - hasEnv [boolean]: If `true`, `.env` file from the directory will be used
    - Directory must have a `.env` file if this is set to `true`
- Create a new TS/JS file with a name that matches the entry specified in the TOML file
  - Export a default function from this file. This will be the file's entry
