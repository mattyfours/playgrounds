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