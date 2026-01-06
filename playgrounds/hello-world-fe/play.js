export default async function () {
  window.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.createElement('div')
    messageElement.textContent = `Hello, World wewfewew w e- ${Date.now()}`
    document.body.appendChild(messageElement)
  })
}
