const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

// CORSとJSON/URLエンコードのミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Tokyo の現在時刻を返す
function getTokyoTime() {
  return new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour12: false
  });
}

// ルートページ - フォーム表示
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <input name="userName" placeholder="名前">
      <input name="emoji" placeholder="絵文字">
      <input name="text" placeholder="メッセージ">
      <input type="submit" value="送信">
    </form>
  `);
});

// ツイート一覧を取得
app.get('/tweets', (req, res) => {
  const FILE_PATH = "backend/data.json";
  let data = [];
  if (fs.existsSync(FILE_PATH)) {
    data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    if (!Array.isArray(data)) data = [];
  }
  res.json(data);
});

// ツイートを投稿
app.post('/submit', (req, res) => {
  const { userName,emoji, text } = req.body;
  
  // 追加するJSONデータ（createdAtを自動生成）
  const newItem = {
    emoji: emoji || "🐈",
    userName: userName || "名無し",
    text: text || "メッセージ",
    createdAt: getTokyoTime() // 東京時間を自動設定
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
  
  res.json(newItem); // 追加したアイテムを返す
});

app.listen(2335, () => console.log("http://localhost:2335/"));
