// const list = document.createElement('ul');
// const info = document.createElement('p');
// const html = document.querySelector('html');

// info.textContent = 'alert(0)';

// document.body.appendChild(info);
// document.body.appendChild(list);

// html.onclick = function() {
//   const listItem = document.createElement('li');
//   // const listContent = prompt('かわいそう！　お使いのパソコンはウイルスに感染しました');
//   listItem.textContent = listContent;
//   list.appendChild(listItem);

//   listItem.onclick = function(e) {
//     e.stopPropagation();
//     const listContent = prompt('Enter new content for your list item');
//     this.textContent = listContent;
//   }
// }



let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = '前回の予想: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'おめでとう! 正解です!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 2) {
    lastResult.textContent = '!!!ゲームオーバー!!!';
    setGameOver();
  } else {
    lastResult.textContent = '間違いです!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent='今の予想は小さすぎです!' ;
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = '今の予想は大きすぎです!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = '新しいゲームを始める';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessSubmit.addEventListener('click', checkGuess);