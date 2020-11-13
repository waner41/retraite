import express from "express";
const app = express();

app.use(static(__dirname + '/dist'));

app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/retraite/index.html');
});

app.listen(process.env.PORT || 8080);