# checkers

===============
This is a basic checkers game complete with computer AI. It's very basic and I will continue to add updates as I see fit.


This is the basic algorithm used to create this game.
Given the current board position, player-to-move, and search depth
0.  If the search depth is 0, call an evaluator function to assign a value to given position,
expressed as a positive number if the player-to-move has the better position, negative number if the player-to-move has a worse position,
or zero if the position is equal, and return the value.
1.  Generate a list of all possible legal moves
2.  For each move:
     a.  Make the move
     b.  Recursively call this function, with the new board position, other player-to-move, and search depth - 1.
     c.  Store off the negative value of the board position (returned by the recursive call).
     d.  Unmake the move
3.  Return the maximum of all the values you stored, along with the move that was associated with it.
4.  Finally, after the initial call returns, make the move returned.


5. Each square has a point value. Each red square has a value of -1. The sides has a value of 4 since those are the best moves to make.
   The the ends also have a value of 4 since the backend enable the player to attain a king.
   The array is as follows:
   [
           [4, -1, 4, -1, 4, -1, 4, -1],
           [-1, 3, -1, 3, -1, 3, -1, 4],
           [4, -1, 2, -1, 2, -1, 3, -1],
           [-1, 3, -1, 1, -1, 2, -1, 4],
           [4, -1, 2, -1, 1 - 1, 3, -1],
           [-1, 3, -1, 2, -1, 2, -1, 4],
           [4, -1, 3, -1, 3, -1, 3, -1],
           [-1, 4, -1, 4, -1, 4, -1, 4]
    ]

6. We also assign values according to

<b>TO DO</b>
=======================================
Double Jumping for reqular pieces and kings