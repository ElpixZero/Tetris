import Model from './Model.js'
import View from './View.js'
import startGame from './Contoller/Controller.js'

window.onload = function() {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');

  modal.addEventListener('click', function(e) {
    let speedOfLevel = 0;
    const levelOfGame = e.target.classList;
  
    if (levelOfGame.contains('button_easy')) {
      speedOfLevel = 1000;
    } else if (levelOfGame.contains('button_normal')) {
      speedOfLevel = 500;
    } else if (levelOfGame.contains('button_hard')) {
      speedOfLevel = 200;
    }
  
    if (e.target.classList.contains('button')) {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      startGame(speedOfLevel);
    }
  });

}();


