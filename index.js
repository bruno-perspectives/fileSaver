const express = require('express')
const fs = require('fs');

const app = express()

const PORT = 3000
const FILE_PATH = "/Users/stephane/Documents/PointCloudSnapshots"

app.use (function(req, res, next) {
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });
  req.on('end', function() {
      req.body = data;
      next();
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  
  if(!fs.existsSync(FILE_PATH)) fs.mkdirSync(FILE_PATH)
  const data = JSON.parse(req.body)
  const ts = Date.now().valueOf()
  fs.writeFileSync(`${FILE_PATH}/${ts}.txt`, data.vertices)
  fs.writeFileSync(`${FILE_PATH}/${ts}.pose`, data.pose)
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})