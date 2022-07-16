import startSound from './assets/sounds/start.mp3'
import clickSound from './assets/sounds/click.mp3'
import typingSound from './assets/sounds/typing.mp3'
import deploySound from './assets/sounds/deploy.mp3'
import hoverSound from './assets/sounds/hover.mp3'
import expandSound from './assets/sounds/expand.mp3'
import fadeSound from './assets/sounds/fade.mp3'

export default {
  shared: { volume: 0.3 },
  players: {
    start: {
      sound: { src: [startSound] },
      volume: 0.15,
    },
    click: {
      sound: { src: [clickSound] },
    },
    typing: {
      sound: { src: [typingSound] },
    },
    deploy: {
      sound: { src: [deploySound] },
    },
    hover: {
      sound: { src: [hoverSound] },
    },
    expand: {
      sound: { src: [expandSound] },
    },
    fade: {
      sound: { src: [fadeSound] },
    },
  },
}
