/**
 * Created by junjun on 2017/5/7.
 */
var mongoose =require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://127.0.0.1:27017/activity')

var userSchema = new mongoose.Schema({
    name: String,
    pwd: String,
    email: String,
    telephone:String,
},{ collection: "User" })

var preActSchema = new mongoose.Schema({
    _id: String,
    username:String,
    title: String,
    actPhotoAddress: String,
    address:String,
    dec: String,
    time: String,
    aliPayAddress:String,
    weiPayAddress:String,
    slogan:String,
    like: Boolean,
    likeNum: String,
    monneyVal:Number,
    monneyMax:Number
},{ collection: "PreActivity" })

var afterActSchema = new mongoose.Schema({
    _id: String,
    username:String,
    title: String,
    actPhotoAddress: [String],
    dec: String
},{ collection: "AfterActivity" })

var photoSchema = new mongoose.Schema({
    _id :String,
    address : String
},{collection:"Photo"})

var complainSchema = new mongoose.Schema({
    username:String,
    dec : String,
    actname : String,
    telephone : String
},{collection:"Complain"})


var Models = {
    User: mongoose.model('User', userSchema),
    PreActivity: mongoose.model('PreActivity',preActSchema),
    Photo: mongoose.model('Photo',photoSchema),
    AfterActivity:mongoose.model('AfterActivity',afterActSchema),
    Complain:mongoose.model('Complain',complainSchema)
}

module.exports = Models

