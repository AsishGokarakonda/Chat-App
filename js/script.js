const socket = io("http://localhost:8000");

const cont = document.querySelector('.container');
const form = document.querySelector('#sendMessage');
const messageInput = document.querySelector('#MessageInput');

const username = prompt('Enter your Name');

var audio = new Audio('message.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("first")
    appendUser(messageInput.value,'right');
    socket.emit('message-send',messageInput.value)
    messageInput.value = ""
})

const appendUser = (message,positon) =>{
    
    const ele = document.createElement('div');
    console.log(message);
    ele.innerText=message;
    ele.classList.add('message');
    ele.classList.add(positon);
    cont.append(ele);
    if(positon == 'left'){
        audio.play();
    }
}
socket.emit('new-user-joined',username)

socket.on('new-user-came',data=>{
    appendUser(`${data} joined the chat`,'left')
})

socket.on('receive',data1=>{
    appendUser(`${data1.name} : ${data1.message}`,'left');
})

socket.on('left',data2=>{
    appendUser(`${data2.name} left the chat`,'left');
})