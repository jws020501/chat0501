var socket = io()

socket.on('connect', function() {

  var name = prompt("이름을 적어주세요");

  socket.emit('newUser', name)
})


socket.on('update', function(data) {
  var chat = document.getElementById('chat')

  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''
  var ID1 = document.getElementById('connp');
  var pnode = document.createElement("<div class="{data.name}"></div>");
  var ptextnode = document.createTextNode(`${data.name}`);
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

  if(data.type=='connect'){
    node.appendChild(ptextnode);
    ID1.appendChild(pnode);
  };
  if(data.type=='disconnect'){
    var header = document.querySelector("h1");	//제거하고자 하는 엘리먼트
    var body = document.body;	// 그 엘리먼트의 부모 객체
    body.removeChild(header);
    var header = document.querySelector("h1");	//제거하고자 하는 엘리먼트
    header.parentNode.removeChild(header);
  };

})

function value_test(){
  var message = document.getElementById('test').value
  message = message.trim();
  if((message == "")||(message == null)){
   document.getElementById('test').value = ''
  }
  if(message.length <= 150){
    alert('글자는 150자까지 쓸 수 있습니다')
  }else{
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


}
