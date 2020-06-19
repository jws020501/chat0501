var socket = io()

socket.on('connect', function() {
 name = '익명'

  socket.emit('newUser', name)
})


socket.on('update', function(data) {
  var chat = document.getElementById('chat')

  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''
  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)

  var divdiv = document.getElementById("chat");
  divdiv.scrollTop = divdiv.scrollHeight;

})

function value_test(){
  var message = document.getElementById('test').value
  message = message.trim();
  if((message == "")||(message == null)){
   document.getElementById('test').value = ''
  }
  else{
    return logchk();
  }
}

function logchk(){
  if(!name){
    alert("메시지를 전송하려면 로그인")
    document.getElementById('test').value = ''
  }else{
    return send();
  }
}

function send() {
  var message = document.getElementById('test').value

  document.getElementById('test').value = ''

  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
 
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)


  socket.emit('message', {type: 'message', message: message})

  var divdiv = document.getElementById("chat");
  divdiv.scrollTop = divdiv.scrollHeight;
}


