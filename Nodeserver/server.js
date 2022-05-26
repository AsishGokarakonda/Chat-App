
const port = process.env.PORT || 8000

const io= require('socket.io')(port,{
    cors: {
        origin: '*',
      }
    });
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
        console.log("joined",name)
        users[socket.id]=name;
        socket.broadcast.emit('new-user-came',name);
    });
    socket.on('message-send',message =>{
        socket.broadcast.emit('receive',{'message':message,'name':users[socket.id]})
    })
    socket.on("disconnect", () => {
        console.log("left",users[socket.id])
        socket.broadcast.emit('left',{'name':users[socket.id]})
    });
});