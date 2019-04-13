import Params from "../../params.js"

export default {
  createTetrisTemplate: function(tetris) {
    tetris.classList.add('tetris');
  
    for (let y = 20; y > 0; y--) {
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
      ],
  
      // turn 90 grad
      [
        [-1,1],
        [0,0],
        [1,-1],
        [2,-2]
  
      ],
  
      // turn 180 grad
      [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
  
      ],
  
      // turn 270 grad
      [
        [-1,1],
        [0,0],
        [1,-1],
        [2,-2]
  
      ],
  
      // turn 360 grad
      [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
  
      ],
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
    let {startX, startY} = Params;
    let randomFigure = this.getNumberOfRandomFigure(this.figures.length);
    const figures = this.figures;

    return [
      document.querySelector(`[posx='${startX}'][posy='${startY}']`),
      document.querySelector(`[posx='${startX + figures[randomFigure][0][0][0]}'][posy='${startY + figures[randomFigure][0][0][1]}']`),
      document.querySelector(`[posx='${startX + figures[randomFigure][0][1][0]}'][posy='${startY + figures[randomFigure][0][1][1]}']`),
      document.querySelector(`[posx='${startX + figures[randomFigure][0][2][0]}'][posy='${startY + figures[randomFigure][0][2][1]}']`)
    ];
  },

  getNumberOfRandomFigure: function() {
    return Math.floor(Math.random() * this.figures.length);
  },

}
