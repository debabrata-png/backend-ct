// socket.js
let io;

module.exports = {
    init: (httpServer) => {
        io = require("socket.io")(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        var usernames = [];

        io.on("connection", (socket) => {
            //console.log("New client connected:", socket.id);

            socket.on("disconnect", () => {
               // console.log("Client disconnected:", socket.id);
            });

            // Example listener
            socket.on("joinRoom", (room) => {
                socket.join(room);
                console.log(`Socket ${socket.id} joined room ${room}`);
            });

            var un="";
        var room="";

    socket.on('new user', function(data, callback){
        //console.log(data);
        var res = data.split("-");
        un=res[0];
        room=res[1];
        //console.log("un " + un + " room " + room)
        //socket.join(room);
		//socket.username = un;
        callback(true);
            socket.join(room);
			socket.username = data;
			////usernames.push(socket.username);
			updateUsernames();
		// if(usernames.indexOf(data) != -1){
		// 	callback(false);
		// } else {
		// 	callback(true);
        //     socket.join(room);
		// 	socket.username = data;
		// 	usernames.push(socket.username);
		// 	updateUsernames();
		// }
	});

	// Update Usernames
	function updateUsernames(){
		//io.sockets.emit('usernames', usernames);
        io.sockets.emit('usernames', 'hello');
	}

	// Send Message
	socket.on('send message', function(data){
		//io.sockets.emit('new message', {msg: data, user:socket.username});
        io.sockets.in(room).emit('new message', {msg: data, user:socket.username});
	});

  // Send Message
	socket.on('drawing', function(data){
		//io.sockets.emit('new message', {msg: data, user:socket.username});
        io.sockets.in(room).emit('drawing', data);
	});

  socket.on('lock', function(data){
		//io.sockets.emit('new message', {msg: data, user:socket.username});
        io.sockets.in(room).emit('lock', data);
	});

  socket.on('lockc', function(data){
		//io.sockets.emit('new message', {msg: data, user:socket.username});
        io.sockets.in(room).emit('lockc', data);
	});

  socket.on('addProduct', function(data){
		//io.sockets.emit('new message', {msg: data, user:socket.username});
        //io.sockets.in(room).emit('lockc', data);
        //console.log(data);
        //console.log(data.price);
        var price=parseInt(data.price) -1;
        io.sockets.emit('getmessage', {message: price, item :'test'});


	});

    socket.on('mjournal2', function(data){
        //console.log(data);
        //var price=parseInt(data.price) -1;
        io.sockets.emit('mjournal2', {message: 'refresh journal', item :'test'});
	});


  socket.on('users_info_to_signaling_server', (data) => {
    //console.log('userconnect', data.current_user_name, data.meetingid);
    var other_users = _userConnections.filter(p => p.meeting_id == data.meetingid);
    _userConnections.push({
        connectionId: socket.id,
        user_id: data.current_user_name,
        meeting_id: data.meetingid
    });
    //console.log(`all users: ${_userConnections.map(a => a.connectionId)}`);
    //        console.log(_userConnections);
    //console.log(`other users: ${other_users.map(a => a.connectionId)}`);
    //console.log(`connection id: ${connectionId} socket id:${socket.id}`);

    other_users.forEach(v => {
        socket.to(v.connectionId).emit('newConnectionInformation', {
            other_user_id: data.current_user_name,
            connId: socket.id
        });
    });

    socket.emit('other_users_to_inform', other_users);



    //        _userConnections[0].meeting_id
})

socket.on('exchangeSDP', (data) => {

    socket.to(data.to_connid).emit('exchangeSDP', {
        message: data.message,
        from_connid: socket.id
    });

}); //end of exchangeSDP
socket.on('reset', (data) => {
    var userObj = _userConnections.find(p => p.connectionId == socket.id);
    if (userObj) {
        var meetingid = userObj.meeting_id;
        var list = _userConnections.filter(p => p.meeting_id == meetingid);
        _userConnections = _userConnections.filter(p => p.meeting_id != meetingid);

        list.forEach(v => {
            socket.to(v.connectionId).emit('reset');
        });

        socket.emit('reset');
    }

}); //end of reset


	// Disconnect
	// socket.on('disconnect', function(data){
    //     var userObj = _userConnections.find(p => p.connectionId == socket.id);
    //     if (userObj) {
    //         var meetingid = userObj.meeting_id;

    //         _userConnections = _userConnections.filter(p => p.connectionId != socket.id);
    //         var list = _userConnections.filter(p => p.meeting_id == meetingid);
    //         //console.log(`disconnected socket id   ${socket.id}`);
    //         //console.log(`connection id: ${connectionId} socket id:${socket.id}`);
    //         list.forEach(v => {
    //             socket.to(v.connectionId).emit('informAboutConnectionEnd', socket.id);
    //         });
    //     }
	// 	if(!socket.username){
	// 		return;
	// 	}

	// 	    usernames.splice(usernames.indexOf(socket.username), 1);
	// 	    updateUsernames();
	//     });





        });

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
};
