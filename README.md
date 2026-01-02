# Playgrounds

## Overview

A collection of quick test environments

## Getting Started

- Clone repo
- Run `yarn install`

## Running an Envrionment

- Run `yarn play -p playground_directory_name`
  - Example: `yarn play -p hello-world`
  - Some playgrounds may require `.env` configuration

## Configure a New Environment

- Create a new directory in the `playgrounds` directory
- Create a new TS/JS play file: `play.ts` or `play.js`
  - Export a default function from this file. This will be the file's entry
