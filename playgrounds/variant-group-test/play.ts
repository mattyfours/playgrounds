export default async function playground(): Promise<void> {
  class Playground extends HTMLElement {
    constructor() {
      super()
      console.log('[variant-group-test] Playground!')
    }
  }

  if (window.customElements.get('playground-app') === undefined) {
    window.customElements.define('playground-app', Playground)
  }
}