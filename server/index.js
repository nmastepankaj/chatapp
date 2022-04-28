// const connectToMongo = require('./db');
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
var cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require("./router");
// connectToMongo();
const app = express()
const port = process.env.PORT || 5000

const server = http.createServer(app);
const io = socketio(server)
 
io.on("connect", (socket)=> {
    console.log("New connection added");
    socket.on('join', ({name,room}, callback) => {
        const {error,user} = addUser({id:socket.id,name:name,room:room})

        if(error){
            return callback({error:"error"})
        }

        socket.join(user.room)

        socket.emit("message",{user:"admin",text:`${user.name} welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name} has joined`})

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback()

        console.log(name,room);
      });

    socket.on("sendMessage",(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("message",{user:user.name,text:message});
        callback()
    })
    // handle the event sent with socket.emit()
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});

app.use(cors())
// app.use(express.json())
// Available Routes 
app.use(router)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})