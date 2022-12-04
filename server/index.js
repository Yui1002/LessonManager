const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', (req, res) => {
  res.send('hello test')
})

app.listen(port, () => console.log(`Listening on ${port}`));

