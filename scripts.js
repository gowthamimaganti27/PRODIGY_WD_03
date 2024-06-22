document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const handleCellClick = (event) => {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
  
      if (checkWin()) {
        statusDisplay.textContent = Player ${currentPlayer} wins!;
        gameActive = false;
      } else if (!gameState.includes('')) {
        statusDisplay.textContent = Game ended in a draw!;
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = It's ${currentPlayer}'s turn;
      }
    };
  
    const checkWin = () => {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return true;
        }
      }
      return false;
    };
  
    const handleResetGame = () => {
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      statusDisplay.textContent = It's ${currentPlayer}'s turn;
      cells.forEach(cell => cell.textContent = '');
    };
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);
  
    statusDisplay.textContent = It's ${currentPlayer}'s turn;
  });