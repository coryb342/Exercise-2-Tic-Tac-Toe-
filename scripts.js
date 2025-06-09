/**
 * File: scripts.js
 * Author: Cory Bateman     
 * Date: 06/08/2025
 * Description: This script is used for the tick-tac-toe game.
 */


const human_player = 'X';
const computer_player = 'O';
const num_board_spaces = 9;
const winning_combos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let game_over = false;
let current_player = computer_player;
let current_move = 1;
let comp_held_positions = [];
let human_held_positions = [];
let start_clear_button = document.querySelector('#start-clear');
const board = document.querySelectorAll('.board-space');

// Game state logic
function isWinner(player) {
    const held_positions = player === human_player ? human_held_positions : comp_held_positions;
    for (const combo of winning_combos) {
        if (combo.every(pos => held_positions.includes(pos.toString()))) {
            highligtWinningCombo(combo);
            setGameOver(true, player);
            return true;
        }
    }
    if (current_move > num_board_spaces) {
        setGameOver(true);
        return true;
    }
    return false;
}

function setGameOver(bool, player = '') {
    game_over = bool;
    if (game_over && player === '') {
        disableBoard(); 
        start_clear_button.disabled = false; 
        setTimeout(() => {
            alert("It's a draw!");;
        }, 100); 
        return;
    }
    if (game_over && player === human_player) {
        disableBoard();
        start_clear_button.disabled = false;
        setTimeout(() => {
            alert("You Win!");;
        }, 100); 
        return;
    }
    if (game_over && player === computer_player) {
        disableBoard();
        start_clear_button.disabled = false;  
        setTimeout(() => {
            alert("Computer Wins!");;
        }, 100); 
        return;
    }
    swapPlayer(player);
}

function swapPlayer(player) {
    if (player === human_player) {
        current_player = computer_player;
        disableBoard();
        setTimeout(() => {
            computerMove();
        }, 500);
    } else if (player === computer_player) {
        enableBoard();
        current_player = human_player; 
    }
}

// GUI Logic
function startGame() {
    if (start_clear_button.value === 'Start') {
        start_clear_button.value = 'Clear';
        start_clear_button.disabled = true;
        computerMove();
    }
    else {
        resetGame();
    }
}

document.addEventListener('click', function(event) {
if (event.target.classList.contains('board-space') && 
    !game_over && current_player === human_player) {
    playerMove(event);
}
});

function playerMove(event) {
    const target = event.target;
    if (target.value === '' && !game_over) {
        target.value = human_player;
        human_held_positions.push(target.id);
        current_move++;
        if (isWinner(human_player)) {
            return;
        }
        swapPlayer(human_player);
    }
}

function computerMove() {
    let computer_move = Math.floor(Math.random() * num_board_spaces);
    while (board[computer_move].value !== '' || game_over) {
        computer_move = Math.floor(Math.random() * num_board_spaces);
    }
    board[computer_move].value = computer_player;
    comp_held_positions.push(board[computer_move].id);
    current_move++;
    if (current_move === 2) {
        computerMove();
    }
    if (isWinner(computer_player)) {
        return;
    }
    swapPlayer(computer_player);
}

function disableBoard() {
    board.forEach(space => {
        space.disabled = true;
    });
}

function enableBoard() {
    board.forEach(space => {
        space.disabled = false;
    });
}

function resetGame() {
    game_over = false;
    current_player = computer_player;
    current_move = 1;
    comp_held_positions = [];
    human_held_positions = [];
    start_clear_button.value = 'Start';
    start_clear_button.disabled = false;
    disableBoard();
    
    board.forEach(space => {
        space.value = '';
        space.classList.remove('winning-space');
    });
}

function highligtWinningCombo(combo) {
    combo.forEach(pos => {
        const space = document.getElementById(pos);
        if (space) {
            space.classList.add('winning-space');
        }
    });
}