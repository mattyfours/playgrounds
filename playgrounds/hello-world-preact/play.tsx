import { render } from 'preact';
import { useState } from 'preact/hooks';

function App() {
  const [number, setNumber] = useState(0);

  const handleNumberClick = () => {
    setNumber(number + 1);
  };

  return (
    <>
      <button onClick={handleNumberClick}>
        Clicked {number} times
      </button>
    </>
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