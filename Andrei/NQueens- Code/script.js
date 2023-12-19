let sol = [];
let matrix = [];
let n, cnt;

function showMetrics(x, y) {
  for (let i = 0; i < n; i++) {
    console.log(matrix[i].join(" ") + "\n");
  }
  console.log("\n");
}

function solution() {
  let arr = [];

  for (let i = 0; i < n; i++) {
    let a = "";
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === "Q") a += "Q";
      else a += ".";
    }
    arr.push(a);
  }

  sol.push(arr);
}

function isSafe(x, y) {
  let a = x - 1,
    b = y - 1;
  while (0 <= a && a < n && 0 <= b && b < n) {
    if (matrix[a][b] === "Q") return false;
    a--;
    b--;
  }
  a = x + 1;
  b = y - 1;
  while (0 <= a && a < n && 0 <= b && b < n) {
    if (matrix[a][b] === "Q") return false;
    a++;
    b--;
  }
  y--;
  while (y >= 0) {
    if (matrix[x][y] === "Q") return false;
    y--;
  }

  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function back(x, y, cnt) {
  if (cnt === n) {
    solution();
    return;
  }

  if (x < n && y < n) {
    matrix[x][y] = "T";
    console.clear();
    showMetrics(x, y);
    await sleep(1000);
    if (isSafe(x, y)) {
      matrix[x][y] = "Q";
      console.clear();
      showMetrics(x, y);
      await sleep(1000);
      await back(0, y + 1, cnt + 1);
      matrix[x][y] = ".";
    } else {
      matrix[x][y] = ".";
    }
    console.clear();
    showMetrics(x, y);
    await sleep(1000);
    await back(x + 1, y, cnt);
  }
}

async function solveNQueens(num) {
  n = num;

  for (let i = 0; i < n; i++) {
    let arr = [];
    for (let j = 0; j < n; j++) {
      arr.push(".");
    }
    matrix.push(arr);
  }

  await back(0, 0, 0);
  return sol;
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the value of n: ", async (answer) => {
  const solutions = await solveNQueens(parseInt(answer));
  console.clear();
  for (let i = 0; i < solutions.length; i++) {
    console.log(solutions[i].join("\n") + "\n");
  }
  rl.close();
});
