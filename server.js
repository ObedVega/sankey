const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
/*
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});
*/
app.get('/data', (req, res) => {
  const data = {
      nodes: [
          { name: 'A' },
          { name: 'B' },
          { name: 'C' }
      ],
      links: [
          { source: 0, target: 1, value: 100 },
          { source: 1, target: 2, value: 50 }
      ]
  };
  res.json(data);
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});