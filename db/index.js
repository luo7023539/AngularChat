/*
* 创建Schema实例 创建模块 导出
* */
var mongoose = require('mongoose');
var config = require('../setting');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;
mongoose.connect(
    config.url
);
var UserSchema = new mongoose.Schema({
    email:String,
    avatar:String
});

var User = mongoose.model('User',UserSchema);

var RoomSchema = new mongoose.Schema({
    name:String,
    user:[{type:ObjectId,ref:'User'}],
    messages:[{
        user:{type:ObjectId,ref:'User'},
        content:String,
        createAt:{type:Date,default:Date.now()}
    }]
});

var Room = mongoose.model('Room',RoomSchema);

exports.User = User;
exports.Room = Room;
