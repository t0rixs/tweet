const express = require('express');
const app = express();

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
  res.json([
    {
      "emoji": "🐈", 
      "userName": userName,
      "text": text, 
      "createdAt": "2025/11/17"
    }
  ]);
});

app.listen(3000, () => console.log("http://localhost:3000/"));