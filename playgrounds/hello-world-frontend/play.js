export default async function () {
  const messageElement = document.querySelector('h1')
  console.log('Message Element:', messageElement)
  console.log('Public Variable:', window.env.PUBLIC_VARIABLE)
}
