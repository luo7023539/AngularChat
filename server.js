var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./db/index').User;
var Room = require('./db/index').Room;
var app = express();




app.get('/', function (req, res) {
    res.sendFile(path.resolve('app/index.html'))
});


/*
* 封装一个err函数用来发送
* */

app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/user/login', function (req, res) {
    var email = req.body.email;
    User.findOne({email: email}, function (err, doc) {
        if (err) {
            res.send({err: 1, msg: '查询出错', data: err})
        } else {
            if (doc) {
                res.send({err: 0, msg: '成功', data: doc})
            } else {

                User.create({email: email,avatar:'https://secure.gravatar.com/avatar/email'}, function (err, doc) {
                    if (err) {
                        res.send({err: 1, msg: '创建出错', data: err})
                    } else {
                        res.send({err: 0, msg: '成功', data: doc})
                    }
                })
            }
        }
    })
});
app.get('/rooms',function (req, res) {
   Room.find({},function (err, docs) {
       if(err){
           res.send({err:1,msg:'查询出错',data:err})
       }else{
           res.send({err:0,msg:'成功',data:docs})
       }
   })
});
app.post('/rooms/add',function (req, res) {
    var room = {name:req.body.name};
    room.users = room.messages = [];
    Room.create(room,function (err,doc) {
        if(err){
            res.send({err:1,msg:'创建出错',data:err})
        }else{
            res.send({err:0,msg:'成功',data:doc})
        }
    })
});

app.get('/room/:_id',function (req, res) {
    var _id = req.params._id;
    Room.findById(_id,function (err, doc) {
        if(err){
            res.send({err:1,msg:'查询出错',data:err})
        }else{
            res.send({err:0,msg:'成功',data:doc})
        }
    })
});

var io = require('socket.io')(app.listen(8080));

io.on('connection',function (socket) {
    socket.on('message',function (msg) {
        msg.createAt = Date.now();
        io.emit('message',msg)
    })
});
