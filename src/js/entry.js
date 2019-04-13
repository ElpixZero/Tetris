import Model from './Model.js'
import View from './View.js'


window.onload = function() {
  const main = document.querySelector('.main');
  const tetris = document.createElement('div');

  Model.createTetrisTemplate(tetris);
  main.appendChild(tetris);

  const figure = Model.createFigure();
  View.renderFigure(figure);
}();


