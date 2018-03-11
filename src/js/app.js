import '../css/style.css'
import '../css/emoji.css'
Raven.config('https://924e3677b7144cac843b6a70ab82195c@sentry.io/294550').install()

// What do we type?
const identities = [
  {
    text: 'a frontend developer',
    emoji: 'coffee'
  }, {
    text: 'an aspiring musician',
    emoji: 'musical_note'
  }, {
    text: 'an explorer',
    emoji: 'car'
  }, {
    text: 'a shutterbug',
    emoji: 'camera'
  }, {
    text: 'the init.ninja',
    emoji: 'male-technologist'
  }
]

// Typing magic...
let identitySpan
const CHAR_TYPE_DELAY = 70
const CHAR_CLEAR_DELAY = 20
const typeChar = (char) => {
  identitySpan.innerHTML += char
}
const setText = (text) => {
  identitySpan.innerHTML = text
}

const typeIdentity = (identity) => () => new Promise((resolve) => {
  const chars = identity.text.split('')
  let currentChar = -1
  const interval = window.setInterval(() => {
    currentChar++
    if(chars[currentChar]) {
      typeChar(chars[currentChar])
    } else {
      window.clearInterval(interval)
      typeChar(` <i class="em-svg em-${identity.emoji}"/>`)
      resolve()
    }
  }, CHAR_TYPE_DELAY)
})

const clear = () => new Promise((resolve) => {
  let text = identitySpan.innerHTML
  let emojiRemoved = false
  const interval = window.setInterval(() => {
    if(emojiRemoved) {
      text = text.slice(0, -1)
    } else {
      const lengthToCropTo = text.length - text.indexOf('<')
      text = text.slice(0, -1 * lengthToCropTo)
      emojiRemoved = true
    }

    setText(text)
    if(!text) {
      window.clearInterval(interval)
      resolve()
    }
  }, CHAR_CLEAR_DELAY)
})

const wait = (duration) => () => new Promise((resolve) => {
  window.setTimeout(resolve, duration)
})

Raven.context(() => {
  // Where do we type?
  document.addEventListener("DOMContentLoaded", function(event) {
    identitySpan = document.querySelector('#identity')
    showNextIdentity()
  });

  // Start typing!
  let currentIdentity = -1
  const showNextIdentity = () => {
    if (identities[++currentIdentity]) {
      clear()
        .then(wait(1000))
        .then(typeIdentity(identities[currentIdentity]))
        .then(wait(3000))
        .then(showNextIdentity)
    }
  }
})
