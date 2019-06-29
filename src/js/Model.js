import {figureCreatingCoordinates} from './params.js'

const Model = {
  createTetrisTemplate: function(tetris) {
    tetris.classList.add('tetris');
  
    for (let y = 18; y > 0; y--) {
      for (let x = 1; x < 11; x++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        excel.setAttribute('posX', x);
        excel.setAttribute('posY', y);
        tetris.appendChild(excel);
      }
    }
  },

  figures: [
    // y-line
    [
      [
        [0,1],
        [0,2],
        [0,3],
      ]
    ],

    // square
    [
      [ // default 
        [1,0],
        [0,1],
        [1,1],
      ],
    ],

    // letter J
    [
      [ //default
        [1,0],
        [1,1],
        [1,2],
      ],
    ],

    // letter L
    [
      [ //default
        [1,0],
        [0,1],
        [0,2],
      ],
    ],
    
    // letter T
    [
      [ //default
        [-1,1],
        [0,1],
        [1,1],
      ],
    ],
   
    // letter s
    [
      [ //default
        [-1,0],
        [0,1],
        [1,1],
      ],
    ],

    // letter z
    [
      [ //default
        [0,1],
        [-1,1],
        [1,0],
      ],
    ],
  ],

  createFigure: function() {
    const {startX, startY} = figureCreatingCoordinates;
    const randomFigure = getNumberOfRandomFigure(this.figures.length);
    const figures = this.figures;

    return [
      document.querySelector(`[posX='${startX}'][posY='${startY}']`),
      document.querySelector(`[posX='${startX + figures[randomFigure][0][0][0]}'][posY='${startY + figures[randomFigure][0][0][1]}']`),
      document.querySelector(`[posX='${startX + figures[randomFigure][0][1][0]}'][posY='${startY + figures[randomFigure][0][1][1]}']`),
      document.querySelector(`[posX='${startX + figures[randomFigure][0][2][0]}'][posY='${startY + figures[randomFigure][0][2][1]}']`)
    ]
  },
}

function getNumberOfRandomFigure() {
  return Math.floor(Math.random() * Model.figures.length);
};

export default Model;