var express = require('express');
var router = express.Router();
var fs = require('fs')

router.get('/', function(req, res) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
      res.write(data)
      res.end()
    }
  })
});

  module.exports = router;