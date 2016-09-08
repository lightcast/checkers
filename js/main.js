/**
 * Created by JD on 11/29/14.
 */

 var scope = {
   hello: "aa"
 };

 var newWindow = window.open('test1.html');

        newWindow.thisIsAnObject = 'tttt';
      //  window.print();


var game = {
    rank: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    selectedCell: '',
    blackPieces: 12,
    redPieces: 12,
    blackKings: 0,
    redKings: 0,
    redSquarePointValue: 0,
    lastCell: '',
    lastPieceMove: {
        color: ''
    },
    redImg: "images/red-piece.png",
    blackImg: "images/black-piece.png",
    redImgKing: "images/red-piece-king.jpg",
    blackImgKing: "images/black-piece-king.jpg",
    gameStart: true,
    board: createArray(8, 8),
    player: "BP",
    boardValues: [
        [4, -1, 4, -1, 4, -1, 4, -1],
        [-1, 3, -1, 3, -1, 3, -1, 4],
        [4, -1, 2, -1, 2, -1, 3, -1],
        [-1, 3, -1, 1, -1, 2, -1, 4],
        [4, -1, 2, -1, 1 - 1, 3, -1],
        [-1, 3, -1, 2, -1, 2, -1, 4],
        [4, -1, 3, -1, 3, -1, 3, -1],
        [-1, 4, -1, 4, -1, 4, -1, 4]
    ],
    numberOfPlayerPoints: function(color){
        var number;
        // regular pieces are are worth 1 point
        // kings are worth 2x points
        if(color === 'red'){
            number = game.redPieces;
            if(game.redKings != 0){
                number += (game.redKings * 2);
            }
        }else if(color === 'black'){
            number = game.blackPieces;
            if(game.blackKings != 0){
                number += (game.blackKings * 2)
            }

        }
        return number;
    },
    spaceEmpty: function(column, row) {
        return game.board[row][column] === 0;
    }

};

// used to create an empty array this is the main function for the entire game
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }
    return arr;
}

(function checkerBoard() {
    "use strict";
    for (var x = 8; x >= 1; x--) {

        for (var y = 0; y < game.rank.length; y++) {
            var cell = document.getElementById('mainCheckersBoard').appendChild(document.createElement('div'));
            var cellNo = parseInt((x + y));
            var cellID = cellNo % 2 == 0 ? 'R' + x + game.rank[y] : 'B' + +x + game.rank[y];
            cell.style.backgroundColor = cellNo % 2 == 0 ? 'red' : 'black';
            cell.id = cellID;
            cell.style.fontSize = "1px";
            cell.innerHTML = cellNo % 2 == 0 ? 'R' + x + game.rank[y] : 'B' + +x + game.rank[y];
            cellNo % 2 == 0 ? cell.style.color = 'black' : cell.style.color = 'white';
            // this is for the games pieces
            gamePiecesStart(cellID); // we add the pieces to the board

            (function (cell) {
                document.getElementById(cell).addEventListener('click', function () {
                    if (document.getElementById('rdHuman').checked) {
                        gamePlayTwoPlayers(cell);
                    } else if (document.getElementById('rdComputer').checked) {

                        machineVsPlayer(cell);
                    }
                });
            })(cellID);
        }
    }
}());


function gamePiecesStart(cell) {
    var space = boardTranslate(cell);
    var img = document.createElement('img');
    img.style.height = "50px";
    img.style.width = "50px";

    //I'm sure there is a better way to do this but we will leave it like this for now
    //to start the game
    if (cell[0] === 'B' && cell[1] <= 3) {
        img.src = game.blackImg;
        document.getElementById(cell).appendChild(img);
        game.board[space[0]][space[1]] = "BP"; // we add it to the array
    } else if (cell[0] === 'B' && cell[1] >= 6) {
        img.src = game.redImg;
        document.getElementById(cell).appendChild(img);
        game.board[space[0]][space[1]] = "RP"; // we add it to the array
    } else {
        game.board[space[0]][space[1]] = 0; // cell is a free cell
    }

    if (cell[0] === 'R') {
        game.board[space[0]][space[1]] = -1;
    }
}

function gamePlayTwoPlayers(cell) {
    if (cell[0] !== 'R') {
        game.selectedCell = cell;
        selectCell();
    }
}

function addPieceToBoard(newCell, lastCell, piece) {
    var newSpace = boardTranslate(newCell);
    var oldSpace = boardTranslate(lastCell);
//we check to see if we should make a king
    var promotedPiece = promotePiece(newSpace[0], piece);
    if (promotedPiece) {
        piece = promotedPiece;
    }
    // we add the piece to the board
    game.board[newSpace[0]][newSpace[1]] = piece;
    // the last space is empty so we put a zero there
    game.board[oldSpace[0]][oldSpace[1]] = 0;
    // we move the piece on the screen
    pieces(piece);
}

function boardTranslate(cell) {
    var firstElement = cell[1] - 1;
    var secondElement;
    switch (cell[2]) {
        case 'a':
            secondElement = 0;
            break;
        case 'b':
            secondElement = 1;
            break;
        case 'c':
            secondElement = 2;
            break;
        case 'd':
            secondElement = 3;
            break;
        case 'e':
            secondElement = 4;
            break;
        case 'f':
            secondElement = 5;
            break;
        case 'g':
            secondElement = 6;
            break;
        case 'h':
            secondElement = 7;
            break;
    }

    return [firstElement, secondElement];
}

function translateToBoard(column, row) {
    var cell = 'B' + (row + 1);
    var col;
    //console.log(column);
    switch (column + 1) {
        case 8:
            col = 'h';
            break;
        case 7:
            col = 'g';
            break;
        case 6:
            col = 'f';
            break;
        case 5:
            col = 'e';
            break;
        case 4:
            col = 'd';
            break;
        case 3:
            col = 'c';
            break;
        case 2:
            col = 'b';
            break;
        case 1:
            col = 'a';
    }

    return cell + col;
}

function translatePieceColor(piece) {
    var color = '';
    switch (piece) {
        case 'BP':
            color = 'black';
            break;
        case 'RP':
            color = 'red';
            break;
        case 'RPK':
            color = 'red';
            break;
        case 'BPK':
            color = 'black';
            break;
    }
    return color;
}

function pieces(piece) {
    if (document.getElementById(game.lastCell).innerHTML && document.getElementById(game.selectedCell).innerHTML) {
        var img = document.createElement('img');
        img.style.height = "45px";
        img.style.width = "45px";
        // console.log(piece);
        if (piece === 'BP') {
            img.src = "images/black-piece.png";
        } else if (piece === 'RP') {
            img.src = game.redImg;
        } else if (piece === 'BPK') {
            img.src = "images/black-piece-king.jpg";
        } else if (piece === 'RPK') {
            img.src = "images/red-piece-king.jpg";
        }

        document.getElementById(game.selectedCell).appendChild(img);
        var cell = document.getElementById(game.lastCell).innerHTML.slice(0, 3);
        document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
        document.getElementById(game.lastCell).innerHTML = cell;
    }
}

// this will take care of selecting the cell and deselecting the cell
function selectCell() {
    if (!game.lastCell) {
        var space = boardTranslate(game.selectedCell);
        if (game.board[space[0]][space[1]] !== 0 && game.board[space[0]][space[1]] !== -1) {
            // we set the last cell to current cell
            document.getElementById(game.selectedCell).style.backgroundColor = '#ff0';
            game.lastCell = game.selectedCell;
        }

    } else if (game.lastCell === game.selectedCell) {
        // the same cell was selected so we un select the cell
        document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
        game.lastCell = '';
        game.selectedCell = '';
    } else if (game.lastCell !== game.selectedCell) {
        // we move the piece
        var newSpace = boardTranslate(game.selectedCell);
        var currentSpace = boardTranslate(game.lastCell);
        var currentCol = currentSpace[1];
        var currentRow = currentSpace[0];
        var newCol = newSpace[1];
        var newRow = newSpace[0];
        var piece = game.board[currentSpace[0]][currentSpace[1]];

        if (game.lastPieceMove.color != translatePieceColor(piece)) {
            if (piece === "BPK" || piece === "RPK") {
                kingsMovement(piece, newRow, newCol, currentRow, currentCol);

            } else {
                if (game.board[newSpace[0]][newSpace[1]] === 0) {
                    if (movingBackwards(currentSpace[0], newSpace[0], piece)) {
                        if (movingAhead(currentCol, currentRow, newCol, newRow, piece)) { // move one spot

                            document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
                            addPieceToBoard(game.selectedCell, game.lastCell, piece);
                            game.lastCell = '';
                            game.selectedCell = '';
                            game.lastPieceMove.color = translatePieceColor(piece);

                        } else if (jumpingPieces(currentCol, currentRow, newCol, newRow, piece)) {// we may be able to jump
                            document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
                            addPieceToBoard(game.selectedCell, game.lastCell, piece);

                            game.lastCell = '';
                            game.selectedCell = '';
                            game.lastPieceMove.color = translatePieceColor(piece);
                        }
                    }
                }
            }
        } else {
            document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
            game.lastCell = '';
            game.selectedCell = '';
            alert(game.lastPieceMove.color + ' already went.');
        }
    }
}

function movingBackwards(currentCell, newSpace, piece) {
    if (piece === 'BP') {
        if (parseInt(newSpace, 10) > parseInt(currentCell, 10)) {
            return true;
        }
    } else if (piece === 'RP') {
        if (parseInt(newSpace, 10) < parseInt(currentCell, 10)) {
            return true;
        }
    }
    return false;
}

function movingAhead(currentColumn, currentRow, newColumn, newRow) {
    if (currentColumn === 0 && newColumn === 1 && game.board[newRow][newColumn] === 0) {
        return true;
    } else if (((currentColumn + 1) === newColumn && game.board[newRow][newColumn] === 0) || ((currentColumn - 1) === newColumn && game.board[newRow][newColumn] === 0)) {
        return true;
    }
    return false;
}


function jumpingPieces(currentColumn, currentRow, newColumn, newRow, piece) {
    if (newRow !== currentRow) {
        if (piece === 'BP') {
            if ((currentColumn - 2) === newColumn && (currentRow + 2) === newRow) {
                if (game.board[currentRow + 1][currentColumn - 1] === 'RP' && currentColumn !== 0) {
                    if (spaceEmpty((newColumn), (newRow))) {
                        removePieceFromBoard((currentColumn - 1), (currentRow + 1), 'RP');
                        return true;
                    }
                }
            } else if ((currentColumn + 2) === newColumn && (currentRow + 2) === newRow) {
                if (game.board[currentRow + 1][currentColumn + 1] === 'RP') {
                    if (spaceEmpty((newColumn), (newRow))) {
                        removePieceFromBoard((currentColumn + 1), (currentRow + 1), 'RP');
                        return true;
                    }
                }
            }
        } else if (piece === 'RP') {
            if ((currentColumn - 2) === newColumn && (currentRow - 2) === newRow) {
                if (game.board[currentRow - 1][currentColumn - 1] === 'BP') {
                    if (spaceEmpty(newColumn, newRow)) {
                        removePieceFromBoard((currentColumn - 1), (currentRow - 1), 'BP');
                        return true;
                    }
                }
            } else if ((currentColumn + 2) === newColumn && (currentRow - 2) === newRow) {
                if (game.board[currentRow - 1][currentColumn + 1] === 'BP') {
                    if (spaceEmpty(newColumn, newRow)) {
                        removePieceFromBoard((currentColumn + 1), (currentRow - 1), 'BP');
                        return true;
                    }
                }
            }

        }
    }
    return false;
}

function removePieceFromBoard(column, row, piece) {
    game.board[row][column] = 0; // we set the board to an empty space
    // we remove the piece from HTML
    var cell = translateToBoard(column, row);
    if (document.getElementById(cell).innerHTML) {
        var img = document.createElement('img');
        img.style.height = "45px";
        img.style.width = "45px";
        if (piece === 'BP') {
            img.src = "images/black-piece.png";
        } else if (piece === 'RP') {
            img.src = "images/red-piece.jpg";
        } else if (piece === 'BPK') {
            img.src = "images/black-piece-king.jpg";
        } else if (piece === 'RPK') {
            img.src = "images/red-piece-king.jpg";
        }
        document.getElementById(cell).appendChild(img);
        var cellID = document.getElementById(cell).innerHTML.slice(0, 3);
        document.getElementById(cell).style.backgroundColor = 'black';
        document.getElementById(cell).innerHTML = cellID;

        if (piece === "RP") {
            game.blackPieces -= 1;
        } else if (piece === "BP") {
            game.redPieces -= 1;
        } else if (piece === "RPK") {
            game.redKings -= 1;
        } else if (piece === 'BPK') {
            game.blackKings -= 1;
        }
    }
}

function spaceEmpty(column, row) {
    return game.board[row][column] === 0;
}

function promotePiece(row, piece) {
    if (piece === 'BP' && row === 7) {
        game.blackKings += 1;
        game.blackPieces -= 1;
        return "BPK";
    } else if (piece === 'RP' && row === 0) {
        game.redKings += 1;
        game.redPieces -= 1;
        return 'RPK';
    }
    return false;
}


function kingsMovement(piece, newRow, newCol, currentRow, currentCol) {
    if (movingAhead(currentCol, currentRow, newCol, newRow)) {
        document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
        addPieceToBoard(game.selectedCell, game.lastCell, piece);
        game.lastCell = '';
        game.selectedCell = '';
        game.lastPieceMove.color = translatePieceColor(piece);

    } else if (kingsJumping(newRow, newCol, currentRow, currentCol)) {
        document.getElementById(game.lastCell).style.backgroundColor = game.lastCell[0] === 'R' ? 'red' : 'black';
        addPieceToBoard(game.selectedCell, game.lastCell, piece);
        if (piece === "RP") {
            game.blackPieces -= 1;
        } else if (piece === "BP") {
            game.redPieces -= 1;
        }
        game.lastCell = '';
        game.selectedCell = '';
        game.lastPieceMove.color = translatePieceColor(piece);
    }
}

function kingsJumping(newRow, newColumn, currentRow, currentColumn, piece) {
    var currentPieceColor = translatePieceColor(piece);
    var pieceToJumpColor;
    if (newRow !== currentRow) {
        if ((currentColumn - 2) === newColumn && (currentRow + 2) === newRow) {
            if (game.board[currentRow + 1][currentColumn - 1] !== currentPieceColor && currentColumn !== 0) {
                if (spaceEmpty((newColumn), (newRow))) {
                    pieceToJumpColor = game.board[currentRow + 1][currentColumn - 1];
                    removePieceFromBoard((currentColumn - 1), (currentRow + 1), pieceToJumpColor);
                    return true;
                }
            }
        } else if ((currentColumn + 2) === newColumn && (currentRow + 2) === newRow) {
            if (game.board[currentRow + 1][currentColumn + 1] !== currentPieceColor) {
                if (spaceEmpty((newColumn), (newRow))) {
                    pieceToJumpColor = game.board[currentRow + 1][currentColumn + 1];
                    removePieceFromBoard((currentColumn + 1), (currentRow + 1), pieceToJumpColor);
                    return true;
                }
            }
        } else if ((currentColumn - 2) === newColumn && (currentRow - 2) === newRow) {
            if (game.board[currentRow - 1][currentColumn - 1] !== currentPieceColor) {
                if (spaceEmpty(newColumn, newRow)) {
                    pieceToJumpColor = game.board[currentRow - 1][currentColumn - 1];
                    removePieceFromBoard((currentColumn - 1), (currentRow - 1), pieceToJumpColor);
                    return true;
                }
            }
        } else if ((currentColumn + 2) === newColumn && (currentRow - 2) === newRow) {
            if (game.board[currentRow - 1][currentColumn + 1] !== currentPieceColor) {
                if (spaceEmpty(newColumn, newRow)) {
                    pieceToJumpColor = game.board[currentRow - 1][currentColumn + 1];
                    removePieceFromBoard((currentColumn + 1), (currentRow - 1), pieceToJumpColor);
                    return true;
                }
            }
        }
    }
    return false;
}

function miniMax2(value, index, arr){
    var col = value[2];
    var blackPositions = generateBlackPositions();
    var pointValue = 0;
    if(col !== 1 && col !== 7){
        for(var i = 0; i < blackPositions.length; i++){

            if(blackPositions[i][2] !== 1 && blackPositions[i][2] !== 7 ){
                if(blackPositions[i][2] + 1 === 0){

                }
            }
        }
    }

}

function miniMax(redPositions){
    // generate available red positions


    // generate available black positions


    // check to see if space is empty +1 -1
    // if it is empty check point value



    console.log(redPositions);


}


function machine() {
    //computer plays as red

    var redPositions = availableRedPositions(generateRedPositions());
console.log(redPositions);
    //console.log(numberOfPieces('red'));

    //let's see how many pieces are on the board
   // if there are an equal amount of pieces
    // we check to see if a there is a empty spot with a value of 4....if so we should take it

    if(game.numberOfPlayerPoints('red') === game.numberOfPlayerPoints('black')){
        var bestCell = bestMoveBasedOnPointValue(redPositions);

        if(parseInt(game.redSquarePointValue,10) === 4){
            var oldCol = bestCell[0][2];
            var oldRow = bestCell[0][0];
            var oldSpace = translateToBoard(parseInt(oldCol,10),parseInt(oldRow,10));
            var newCol = bestCell[1][2];
            var newRow = bestCell[1][0];
            var newSpace = translateToBoard(parseInt(newCol,10), parseInt(newRow,10));
            game.lastCell = oldSpace;
            game.selectedCell =newSpace;
            selectCell();
        }else{ // if there are not a square with a value of four to take we do a minMax
           // redPositions.forEach(miniMax);
            miniMax(redPositions);


        }

    }

}


function bestMoveBasedOnPointValue(positions) {
    var pointValue = 0;
    for (var element = 0; element < positions.length; element++) {
        var space = positions[element];
        var col = space[2];
        var row = space[0];

        if (parseInt(col,10) !== 0 && parseInt(col,10) != 7) {
            var newCell;
            var oldCell;
           // console.log(row);
            //console.log(col);
            //console.log([parseInt(row,10) - 1])[parseInt(col,10) + 1]);
            //console.log(game.board);
          //  if (parseInt(row,10) === 5 && parseInt(col,10) === 1) {
                if (game.board[parseInt(row,10) - 1][parseInt(col,10) + 1] === 0) {
                    if (game.boardValues[parseInt(row,10) - 1][parseInt(col,10) + 1] > parseInt(pointValue,10)) {
                        pointValue = game.boardValues[parseInt(row,10) - 1][parseInt(col,10) + 1];
                        newCell = (parseInt(row,10)-1)  + "-" + (parseInt(col,10) +1);
                        oldCell = row + "-" + col;
                    }
                }
            //console.log(game.board[parseInt(row,10) - 1][parseInt(col,10) - 1]);
                if (game.board[parseInt(row,10) - 1][parseInt(col,10) - 1] === 0) {
                    if (game.boardValues[parseInt(row,10) - 1][parseInt(col,10) - 1] > parseInt(pointValue,10)) {
                        pointValue = game.boardValues[parseInt(row,10) - 1][parseInt(col,10) - 1];
                        newCell = (parseInt(row,10) -1 ) + "-" + (parseInt(col,10) -1);
                        oldCell = row + "-" + col;
                    }
                }
           // }
        }

    }
//console.log(pointValue);
    game.redSquarePointValue = pointValue;
    return [oldCell, newCell];
}


function machineVsPlayer(cell) {
    //if(game.lastPieceMove.color === 'red'){
    var space = boardTranslate(cell);

    if (cell[0] !== 'R' && game.board[space[0]][space[1]] !== 'BP' || game.board[space[0]][space[1]] !== 'BPK') {
        game.selectedCell = cell;
        selectCell();
    }
   // console.log(game.lastCell);
    //console.log(game.selectedCell);
    if (!game.lastCell && !game.selectedCell) {
        machine();
    }


    //}else if(game.lastPieceMove.color === 'black'){
    //  machine();
    //}


}


function generateRedPositions() {
    var arry = [];
    for (var col = 7; col >= 0; col--) {
        for (var row = 0; row < game.rank.length; row++) {
            var cell = game.board[row][col];
            if (cell !== 'BP' && cell !== -1 && cell !== 0 && cell !== 'BPK') {
                arry.push(row + '-' + col);
            }
        }
    }
    return arry;
}

function availableRedPositions(positions){
    var col;
    var row;
    var arry = [];
    for(var i=0; i < positions.length; i++){
        col = positions[i][2];
        row = positions[i][0];
        if(col === 0){
            if(game.board[row - 1][col + 1] !== 'RP' && game.board[row - 1][col + 1] !== 'RPK'){
                arry.push(positions[i]);
            }
        }else if(col === 7){
            if(game.board[row - 1][col - 1] !== 'RP' && game.board[row - 1][col + 1] !== 'RPK'){
                arry.push(positions[i]);
            }
        }else{
            if(game.board[row - 1][col + 1] !== 'RP' && game.board[row - 1][col + 1] !== 'RPK' && game.board[row - 1][col - 1] !== 'RP' && game.board[row - 1][col + 1] !== 'RPK'){
                arry.push(positions[i]);
            }
        }

    }
    return arry;
}

function generateBlackPositions() {
    var arry = [];
    for (var col = 7; col >= 0; col--) {
        for (var row = 0; row < game.rank.length; row++) {
            var cell = game.board[row][col];
            if (cell !== 'RP' && cell !== -1 && cell !== 0 && cell !== 'RPK') {
                arry.push(row + '-' + col);
            }
        }
    }
    return arry;
}