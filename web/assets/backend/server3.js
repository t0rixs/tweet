const express = require('express');
const app = express();
const fs = require('fs'); // これを追加

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <input name="userName" placeholder="名前">
      <input name="text" placeholder="メッセージ">
      <input type="submit" value="送信">
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { userName, text } = req.body;
  // 追加するJSONデータ
  const newItem = {
    emoji: "🐈",
    userName: userName ?? "名前",
    text: text ?? "メッセージ",
    createdAt: "2025/11/17"
  };
  // ファイル読み込み
  const FILE_PATH = "backend/data.json";
  let data = [];
  if (fs.existsSync(FILE_PATH)) {
    data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    if (!Array.isArray(data)) data = [];
  }  
  data.push(newItem); // 末尾に追加
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8"); // 保存
  res.json(data); // 結果を表示
});

app.listen(3000, () => console.log("http://localhost:3000/"));