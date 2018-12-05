const express = require('express');
const app = express();

const path = require('path');

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const indexFile = path.resolve(path.join(__dirname, './public/html/index.html'));
  res.sendFile(indexFile);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));