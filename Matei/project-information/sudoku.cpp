#include <iostream>
#include <vector>
#include<cstdlib>
#include <chrono>   
#include <thread> 
#include <windows.h>
#include <unistd.h>
#include <stack>
using namespace std;

// Aceasta este o rezolvare a problemei "sudoku solbver" folosind backtracking (37. Sudoku Solver - LeetCode)

vector<vector<char>> board = {
   { '5', '3', '.', '.', '7', '.', '.', '.', '.' },
   { '6', '.', '.', '1', '9', '5', '.', '.', '.' },
   { '.', '9', '8', '.', '.', '.', '.', '6', '.' },
   { '8', '.', '.', '.', '6', '.', '.', '.', '3' },
   { '4', '.', '.', '8', '.', '3', '.', '.', '1' },
   { '7', '.', '.', '.', '2', '.', '.', '.', '6' },
   { '.', '6', '.', '.', '.', '.', '2', '8', '.' },
   { '.', '.', '.', '4', '1', '9', '.', '.', '5' },
   { '.', '.', '.', '.', '8', '.', '.', '7', '9' }
};
void printBoard(vector<vector<char>> &board){

    string red = "\033[31m";
    string reset = "\033[0m";

    cout << red << "-------------------------" << reset << '\n'; // Print top border
    for (int i = 0; i < board.size(); i++)
    {
        if (i % 3 == 0 && i != 0)
            cout << red << "-------------------------" << reset << '\n';
        cout << red << "| " << reset; // Print left border
        for (int j = 0; j < board[0].size(); j++)
        {
            if (j % 3 == 0 && j != 0)
                cout << red << "| " << reset;
            cout << board[i][j] << " ";
        }
        cout << red << "| " << reset <<'\n'; // Print right border
    }
    cout << red << "-------------------------" << reset << '\n'; // Print bottom border
}

bool isValid(vector<vector<char>> &board, int row, int col, char c) {
        for (int i = 0; i < 9; i++)
        {
            if (board[i][col] == c)
                return false;
            if (board[row][i] == c)
                return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c)
                return false;
        }
        return true;
    }




bool solve(vector<vector<char>> &board)
    {
        for (int i = 0; i < board.size(); i++)
        {
            for (int j = 0; j < board[0].size(); j++)
            {
                if (board[i][j] == '.')
                {
                    for (char c = '1'; c <= '9'; c++)
                    {
                        if (isValid(board, i, j, c))
                        {
                            board[i][j] = c;
                            if (solve(board))
                                return true;
                            else
                                board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }




bool verboseSolve(vector<vector<char>> &board){
    Sleep(0.001);
    {
        for (int i = 0; i < board.size(); i++)
        {
            for (int j = 0; j < board[0].size(); j++)
            {
                if (board[i][j] == '.')
                {
                    for (char c = '1'; c <= '9'; c++)
                    {
                        if (isValid(board, i, j, c))
                        {
                            board[i][j] = c;
                            system("cls");
                            printBoard(board);
                             Sleep(0.001);
                            if (verboseSolve(board))
                                return true;
                            else{
                                board[i][j] = '.';
                                system("cls");
                                printBoard(board);
                                Sleep(0.001);
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}



int main (int argc, char **argv){
    
    
    if(argc > 1){
        if(argv[1] == string("-v")){
            verboseSolve(board);
            system("cls");
            printBoard(board);
        }
    }
    else{
        solve(board);
        system("cls");
        printBoard(board);
    }
   
    
    return 0;
}