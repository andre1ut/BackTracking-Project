import React, { useState, useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import "./nQueens.css";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import QueenSolver from '../QueenSolver/QueenSolver';

const NQueens = () => {
  const [route, setRoute] = useState("runCode");
  const [n, setN] = useState(0);
  const [solutions, setSolutions] = useState([]);

  const runCode = async () => {
    const num = parseInt(prompt("Enter the value of n:"), 10);

    // Call solveNQueens with the value of n
    const sol = await solveNQueens(num);

    // Update state with the solutions and the value of n
    setSolutions(sol);
    setN(num);
    setRoute("nQueensFor 1");
  };

  const solveNQueens = async (num) => {
    const sol = [];

    const isSafe = (row, col, board) => {
      for (let i = 0; i < row; i++) {
        if (board[i] === col || Math.abs(board[i] - col) === row - i) {
          return false;
        }
      }
      return true;
    };

    const solve = (row, board) => {
      if (row === num) {
        const solution = [...board];
        sol.push(solution);
        return;
      }

      for (let col = 0; col < num; col++) {
        if (isSafe(row, col, board)) {
          board[row] = col;
          solve(row + 1, [...board]); // Use a copy of the board to avoid sharing state
        }
      }
    };

    solve(0, Array(num).fill(-1));

    return sol;
  };

  const routeChange1 = () => {
    setRoute("nQueensFor 1");
  };

  const cppCode = `
  #include <fstream>
#include <vector>

using namespace std;

ifstream fin("nQueens.in");
ofstream fout("nQueens.out");

vector<vector<string>> sol;
vector<vector<string>> matrix;
int n, cnt;

void show_metrics(int x, int y) {
  for(int i=0;i<n;i++) {
    for(int j=0;j<n;j++) {
      fout<<matrix[i][j]<<" ";
    }
    fout<<"\n";
  }
  fout<<"\n";
}

void solution() {
  vector<string> arr;

  for (int i = 0; i < n; i++) {
    string a;
    for (int j = 0; j < n; j++) {
      if (matrix[i][j] == "Q")
        a += "Q";
      else
        a += ".";
    }
    arr.push_back(a);
  }

  sol.push_back(arr);
}

bool isSafe(int x, int y) {
  int a = x - 1, b = y - 1;
  while (0 <= a && a < n && 0 <= b && b < n) {
    if (matrix[a][b] == "Q")
      return false;
    a--;
    b--;
  }
  a = x + 1, b = y - 1;
  while (0 <= a && a < n && 0 <= b && b < n) {
    if (matrix[a][b] == "Q")
      return false;
    a++;
    b--;
  }
  y--;
  while (y >= 0) {
    if (matrix[x][y] == "Q")
      return false;
    y--;
  }

  return true;
}

void back(int x, int y, int cnt) {
  if(cnt == n) solution();
  if(x < n && y < n) {
    if(isSafe(x,y)) {
      matrix[x][y] = "Q";
      show_metrics(x,y);
      back(0,y+1,cnt+1);
      matrix[x][y] = ".";
    }
    show_metrics(x,y);
    back(x+1,y,cnt);
  }
  else return;
}

vector<vector<string>> solveNQueens(int num) {
  for (int i = 0; i < n; i++) {
    vector<string> arr;
    for (int j = 0; j < n; j++) {
      arr.push_back(".");
    }
    matrix.push_back(arr);
  }

  back(0,0,0);
  
  return sol;
}

int main() {
  fin >> n;
  vector<vector<string>> a = solveNQueens(n);

  for (int i = 0; i < sol.size(); i++) {
    for (int j = 0; j < sol[i].size(); j++) {
      fout << a[i][j] << " ";
    }
    fout << "\n";
  }
}
  `;

  useEffect(() => {
    if (route === "runCode") {
      return;
    }

    const intervalId = setTimeout(async () => {
      const sol = await solveNQueens(n);
      setSolutions(sol);
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [n, route]);

  return (
    <>
      <div className='title'>
        <h1>BackTracking Problem: nQueens</h1>
      </div>
      <div className='div1'>
        <SyntaxHighlighter language="cpp" style={docco}>
          {cppCode}
        </SyntaxHighlighter>
      </div>
      <div className='div2'>
        {route === "runCode" ? (
          <>
            <img src="https://codeahoy.com/img/books/recursion/n-queen-problem.png" alt="N-Queens" />
            <button onClick={runCode} className='btn btn-outline-primary'>Run Code</button>
          </>
        ) : (
          <QueenSolver key={n} n={n} />
        )}
      </div>
      <ParticlesBg type="tadpole" bg={true} />
    </>
  );
}

export default NQueens;
