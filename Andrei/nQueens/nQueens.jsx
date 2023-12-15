import React from 'react';
import ParticlesBg from 'particles-bg';
import "./nQueens.css";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const NQueens = () => {
    const cppCode = `
    #include <iostream>
    #include <vector>
    #include <windows.h>
    
    using namespace std;
    
    vector<vector<string> > sol;
    vector<vector<string> > matrix;
    int n, cnt;
    
    void show_metrics(int x, int y) {
      for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
          cout << matrix[i][j] << " ";
        }
        cout << "\n";
      }
      cout << "\n";
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
      if (cnt == n)
        solution();
      if (x < n && y < n) {
        matrix[x][y] = "T";
        Sleep(1000);
        system("cls");
        show_metrics(x, y);
        if (isSafe(x, y)) {
          matrix[x][y] = "Q";
          Sleep(1000);
          system("cls");
          show_metrics(x, y);
          back(0, y + 1, cnt + 1);
          matrix[x][y] = ".";
        } else {
          matrix[x][y] = ".";
        }
        Sleep(1000);
        system("cls");
        show_metrics(x, y);
        back(x + 1, y, cnt);
      } else
        return;
    }
    
    vector<vector<string> > solveNQueens(int num) {
      for (int i = 0; i < n; i++) {
        vector<string> arr;
        for (int j = 0; j < n; j++) {
          arr.push_back(".");
        }
        matrix.push_back(arr);
      }
    
      back(0, 0, 0);
    
      return sol;
    }
    
    int main() {
      cin >> n;
      vector<vector<string> > a = solveNQueens(n);
    
      system("cls");
    
      for (int i = 0; i < sol.size(); i++) {
        for (int j = 0; j < sol[i].size(); j++) {
          cout << a[i][j] << "\n";
        }
        cout << "\n";
      }
    }
    
    `

    return(
        <>
            <div className='title'>
                <h1>BackTracking Problem: nQueens</h1>
            </div>
            <div className='div1'>
                <SyntaxHighlighter language="cpp" style={docco}>
                    { cppCode }
                </SyntaxHighlighter>
            </div>
            <div className='div2'>
                 <img src="https://codeahoy.com/img/books/recursion/n-queen-problem.png" />   
            </div>
            <ParticlesBg type="tadpole" bg={true} />
        </>
    )
}

export default NQueens;