
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')

const app = express()

const server = http.createServer(app)

const io = socket(server)


app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })
})
var client_list=new Array;
io.sockets.on('connection',function(socket){
  
  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.')
    socket.name = name;
    client_list.push(name);
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.',list: client_list})
  })
  socket.on('message', function(data) {
    
    data.name = socket.name
    
    console.log(data)

    
    socket.broadcast.emit('update', data);
  })

  socket.on('disconnect', function() {
    for(var i=0;i<client_list.length;i++)
    if(client_list[i]==socket.name){
      client_list.splice(i,1);
    }
    console.log(socket.name + '님이 나가셨습니다.')
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.',list: client_list});
  })
})
var port = process.env.PORT||8080

server.listen(port, function() {
  console.log('http://localhost:'+port)
})