import Model from './Model.js'
import View from './View.js'
import Params from "../../params.js"


window.onload = function() {
  const main = document.querySelector('.main');
  const tetris = document.createElement('div');

  Model.createTetrisTemplate(tetris);
  main.appendChild(tetris);

  let figure = Model.createFigure();
  View.renderFigure(figure);

  console.log(figure);

  function move() {
    let canMove = true;
    
    let coordinates = [];

    for (let i = 0; i < figure.length; i++) {
      coordinates.push([ figure[i].attributes['posx'].value, figure[i].attributes['posy'].value  ]);
    }

    console.log(figure);
    
    for (let y = 18; y > 0; y--) {
      for (let i = 0; i > figure.length; i++) { 
        console.log(y);
        console.log(canMove);
        if ((y === 1) || (document.querySelector(`[posx='${coordinates[i][0]}'][posy='${coordinates[i][1] - 1}']`).classList.contains('set')) ) {
          canMove = false;
          break;
        }
      }
    }

    if (canMove) {
      let newFigure = [];
      for (let i = 0; i < figure.length; i++) {
        figure[i].classList.remove('choosed');
        newFigure.push(document.querySelector(`[posx='${figure[i].attributes['posx'].value}'][posy='${figure[i].attributes['posy'].value - 1}']`));
        newFigure[i].classList.add('choosed');
      }

      figure = newFigure;
    } else {
      for (let i = 0; i < figure.length; i++) {
        console.log(figure[i]);
        figure[i].classList.add('set');
      }
    }
  }

  setInterval(move, 500);
}();


