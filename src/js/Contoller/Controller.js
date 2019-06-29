import Model from '../Model.js'
import View from '../View.js'
import {gameContainers, userContainers} from '../params.js'

export default function startGame(speedOfLevel) {
  let canMove = true;
  let {userPointsInput} = userContainers;
  const {main, tetris} = gameContainers;
  let userScore = 0;
  let interval = setInterval(move, speedOfLevel);

  Model.createTetrisTemplate(tetris);
  main.appendChild(tetris);

  let figure = Model.createFigure();
  View.renderFigure(figure);

  function move() {
    let coordinates = [];

    for (let i = 0; i < figure.length; i++) {
      coordinates.push([figure[i].getAttribute('posX'), figure[i].getAttribute('posY')])
    }
  
    for (let i = 0; i < coordinates.length; i++) {
      // если двигаться вниз нельзя (последний ряд или ниже тебя есть элемент)
      if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}" ]`).classList.contains('set')) {
        canMove = false;
        break;
      } 
    }
      
    if (canMove) { // если двигаться вниз можно
      for (let i = 0; i < figure.length; i++) {
        figure[i].classList.remove('choosed'); // удаляем у него choosed
      }
    
      figure = []; // строим новую фигуру
      for (let i = 0; i < coordinates.length; i++) {
        figure.push(document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}" ]`));
      }
    
      for (let i = 0; i < figure.length; i++) {
        figure[i].classList.add('choosed'); // указываем новое местоположение
      }
    } else {
      canMove = true;

      for (let i = 0; i < figure.length; i++) {  // если уже приехали
        figure[i].classList.remove('choosed');
        figure[i].classList.add('set');
      }

      for (let i = 1; i < 15; i++) { // очистить заполнившийся ряд
        let count = 0;

        for (let k = 1; k < 11; k++) { 
          if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
            count++;

            if (count === 10) {
              userScore += 10;
              userPointsInput.value = userScore;

              for (let m = 1; m < 11; m++) {
                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
              }
              
              let setedExcels = document.querySelectorAll('.set'); 
              let newSetedExcels = [];

              for (let s = 0; s < setedExcels.length; s++) { // go down one step by contents full line
                let setedExcelCoordinate = [setedExcels[s].getAttribute('posX'), setedExcels[s].getAttribute('posY')];

                if (setedExcelCoordinate[1] > i) { // if mooved excels are above than deleted line
                  setedExcels[s].classList.remove('set');
                  newSetedExcels.push(document.querySelector(`[posX = "${setedExcelCoordinate[0]}"][posY = "${setedExcelCoordinate[1] - 1}"]`))
                }
              }

              for (let a = 0; a < newSetedExcels.length; a++) {
                newSetedExcels[a].classList.add('set');
              }

              i--;
            }
          }
        }
      }

      for (let n = 1; n < 11; n++) {
        if ( document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set') ) {
          clearInterval(interval);
          alert(`Game is over! Your scores ${userScore}`);
          break;
        }
      }

      figure = Model.createFigure();
      View.renderFigure(figure);
    }
  }

  window.addEventListener('keydown', function(e) {
    function getNewState(a) {
      let flag = true;
      let coordinatesForKeyDowns = [];

      for (let i=0; i < figure.length; i++) {
        coordinatesForKeyDowns.push([figure[i].getAttribute('posX'), figure[i].getAttribute('posY')]);
      }

      let figureNew = [];
      for (let i = 0; i < coordinatesForKeyDowns.length; i++) {
        figureNew.push(document.querySelector(`[posX = "${+coordinatesForKeyDowns[i][0] + a}"][posY = "${coordinatesForKeyDowns[i][1]}" ]`))
      }

      for (let i = 0; i < figureNew.length; i++) {  
        if (!figureNew[i] || figureNew[i].classList.contains('set')) {
          flag = false;
          break;
        }
      }

      if (flag) {
        for (let i = 0; i < figure.length; i++) {
          figure[i].classList.remove('choosed');
        }
        
        figure = figureNew;

        for (let i = 0; i < figure.length; i++) {
          figure[i].classList.add('choosed');
        }
      }
    }

    if (e.keyCode == 37) { // left
      getNewState(-1);
    }

    if (e.keyCode == 39) { // right
      getNewState(1);
    }

    if (e.keyCode == 40) { // down
      move();
    }
  });
 }