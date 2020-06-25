var socket = io()
var client_list = new Array;

socket.on('connect', function() {
  var name = prompt("이름을 적어주세요");
  if(!name){
    name = '익명';
  }
  socket.emit('newUser', name)
})
socket.on('update', function (data) {
  var chat = document.getElementById('chat')
  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = '';
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

  
  client_list = data.list;

  var divdiv = document.getElementById("chat");
  divdiv.scrollTop = divdiv.scrollHeight;
})

function cli_list(){
  client_list = client_list;
  for(var i=0;i<client_list.length;i++){
    var str3 = new String;
    str3 += cli_list[i]+'\n';
  }

  alert("접속자 리스트\n"+str3)

}

function value_test(){
  var message = document.getElementById('test').value
  message = message.trim();
  if((message == "")||(message == null)){
   document.getElementById('test').value = ''
  }
  else{
    return length_test();
  }
}
function length_test(){
  var message = document.getElementById('test').value
  if(message.length >= 150){
    alert('메시지는 150자까지만 쓸수 있습니다');
  }else{
    return send()
}
document.getElementById('test').value = ''
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



