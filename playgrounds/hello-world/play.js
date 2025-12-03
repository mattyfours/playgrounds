
export default async function () {
  const { MESSAGE } = process.env

  console.log('Message from .env file:', MESSAGE)
}
