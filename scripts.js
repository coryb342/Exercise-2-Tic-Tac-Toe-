/**
 * File: scripts.js
 * Author: Cory Bateman     
 * Date: 06/08/2025
 * Description: This script is used for the tick-tac-toe game.
 */

// Game state logic
const human_player = 'X';
const computer_player = 'O';
const num_board_spaces = 9;
const winning_legnth = 3;
const winning_combos = ["123", "456", "789", "147", "258", "369", "159", "357"];
let game_over = false;
let current_player = computer_player;
let current_move = 1;
const board = document.querySelectorAll('.board-space');


function startGame() {
    disableBoard();
    computerMove();
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
        current_player = computer_player;
        disableBoard();
        computerMove();
        isWinner(human_player);
    }
}

function computerMove() {
    let computer_move = Math.floor(Math.random() * num_board_spaces);
    while (board[computer_move].value !== '' || game_over) {
        computer_move = Math.floor(Math.random() * num_board_spaces);
    }
    board[computer_move].value = computer_player;
    current_player = human_player;
    
    if (current_move === 1) {
        current_move++;
        computerMove();
    }

    enableBoard();
    setTimeout(() => {
        isWinner(computer_player);
    }, 100);
}

function isWinner(player) {
    alert(current_move);
    if (current_move > num_board_spaces) {
        alert("It's a draw!");
        game_over = true;
        return false;
    }
    const playerPositions = [];
    board.forEach((space, index) => {
        if (space.value === player) {
            playerPositions.push((index + 1).toString());
        }
    });
    if (winning_combos.some(combo => combo.split('').every(pos => playerPositions.includes(pos)))) {
        alert(`${player} wins!`);
        game_over = true;           
    }
    current_move++;
    return false;
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
