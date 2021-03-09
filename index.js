const express = require('express')
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors())


// homepage server
app.get('/', (req, res) => {
  // console.log('adasda')
  res.status(200).json({
    status: 1,
    code: 200,
    message: 'Selamat datang di Parkeer'
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})