# Playgrounds

## Overview

A collection of quick test environments

## Getting Started

- Clone repo
- Run `yarn install`

## Running an Envrionment

- Run `yarn play -p playground-directory-name`
  - Example: `yarn play -p hello-world`
  - Some playgrounds may require `.env` configuration

## Configure a New Environment

- Run `yarn new` and follow the prompts

## Notes

- Add liquid snippets in a `/snippets` directory, inside your playground
- Non-Frontend playgrounds can use a `.env` file

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

