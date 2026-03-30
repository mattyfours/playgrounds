# Playgrounds

## Overview

A collection of quick test environments

## Getting Started

- Clone repo
- Run `npm install`

## Running an Envrionment

- Run `npm run play -- -p playground-directory-name`
  - Example: `npm run play -p hello-world`
  - Some playgrounds may require `.env` configuration

## Configure a New Environment

- Run `npm run new` and follow the prompts

## Notes

- Add liquid snippets in a `/snippets` directory, inside your playground
- For frontend playgrounds can access `.env` variables through `window.env`. For example: `window.env.PUBLIC_TEST_VALUE`
  - Frontend environment variables must be prefixed with `PUBLIC_`. For example: `PUBLIC_TEST_VALUE="Hello World"`

## Custom Liquid Filters
Custom liquid filters can be ceated in `./core/filters`
 - Filter object must be included in `./core/filters/custom-filters-imports.ts`

Example Custom Filter Object:
```
export const tagWrap = {
  filterName: 'tag_wrap', // Filter name is what will be used in liquid
  filterFunction: (input: string, tag: string): string => { // Function to process the filter
    return `<${tag}>${input}</${tag}>`
  }
}
```

Use In Liquid
```
{{ text | tag_wrap: 'strong' }}
```

