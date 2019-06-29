const gameContainers = {
  main: document.querySelector('.main'),
  tetris: document.createElement('div')
}

const figureCreatingCoordinates = {
  startX: 5,
  startY: 15
}

const userContainers = {
  userPointsInput: document.querySelector('.user-points__input')
}


export {figureCreatingCoordinates, gameContainers, userContainers}