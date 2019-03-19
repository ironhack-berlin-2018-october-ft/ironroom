module.exports = function getJohnReply(prevTextMessage) {
  prevTextMessage = prevTextMessage.toLowerCase()
  if (prevTextMessage.includes('love you'))
    return `If you manage to get me out of here, I will love you!`
  if (prevTextMessage.includes('cheers'))
    return `Cheers!`

  let replies = [
    'Please, focus on helping me out here not just texting something!',
    `I don't have time, we need to go out of this room!`,
    `Sorry, I am too busy now`,
    `Don't tell me anything stupid`,
  ]
  let randomIndex = Math.floor(Math.random() * replies.length)
  return replies[randomIndex];
};