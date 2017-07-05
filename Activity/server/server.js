/**
 * Created by junjun on 2017/5/8.
 */
/**
 * Created by junjun on 2017/5/7.
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var userRelated = require('./userRelated');
var actRelated = require('./actRelated');
var personRelated = require('./personRelated');
var adminRelated = require('./adminRelated');
var app = express();

// 跨域支持
app.all('*', (req, res, next)=> {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token,sign');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});

/**
 * 用户login判断
 */
app.post('/judgeLoading', bodyParser.json(), function(req, res) {
    userRelated.judgeLoading(req, res);
})

/**
 * 用户注册
 */
app.post('/register', bodyParser.json(), function(req, res) {
    userRelated.register(req, res);
})

/**
 * 首页活动信息展示
 */
app.post('/getactivity', bodyParser.json(), function(req, res) {
    actRelated.getActMes(req, res);
})

/**
 * 首页活动回顾信息展示
 */
app.post('/getAfterActivity', bodyParser.json(), function(req, res) {
    actRelated.getAfterActMes(req, res);
})
/**
 * 首页活动更新点赞数
 */
app.post('/changeLikeNum', bodyParser.json(), function(req, res) {
    actRelated.changeLikeNum(req, res);
})

/**
 * 个人中心编辑图片
 */
app.post('/uploadPhoto', bodyParser.json(), function(req, res) {
    personRelated.uploadPhoto(req, res);
})

/**
 * 个人中心取得 所有 活动数
 */
app.post('/getAllCount', bodyParser.json(), function(req, res) {
    personRelated.getAllCount(req, res);
})

/**
 * 个人中心取得已编辑的活动
 */
app.post('/getUserEditAfter', bodyParser.json(), function(req, res) {
    personRelated.getUserEditAfter(req, res);
})

/**
 * 个人中心编辑初始活动
 */
app.post('/editPreAct', bodyParser.json(), function(req, res) {
    personRelated.editPreAct(req, res);
})
/**
 * 取得用户初始化的活动列表
 */
app.post('/getUserAllAct', bodyParser.json(), function(req, res) {
    personRelated.getUserAllAct(req, res);
})


/**
 * 新建或者编辑活动回顾
 */
app.post('/editAfterAct', bodyParser.json(), function(req, res) {
    personRelated.editAfterAct(req, res);
})

/**
 * 得到全部用户信息
 */
app.post('/getUsers', bodyParser.json(), function(req, res) {
    adminRelated.getUsers(req, res);
})

/**
 * 得到删除单个用户
 */
app.post('/deleteUser', bodyParser.json(), function(req, res) {
    adminRelated.deleteUser(req, res);
})

/**
 * 得到全部的活动和全部的用户
 */
app.post('/getActandUser', bodyParser.json(), function(req, res) {
    adminRelated.getActandUser(req, res);
})

/**
 * 提交投诉信息
 */
app.post('/uploadComplain', bodyParser.json(), function(req, res) {
    adminRelated.uploadComplain(req, res);
})

/**
 * 得到全部投诉信息
 */
app.post('/getComplain', bodyParser.json(), function(req, res) {
    adminRelated.getComplain(req, res);
})

/**
 * 管理员删除活动
 */
app.post('/deleteAct', bodyParser.json(), function(req, res) {
    adminRelated.deleteAct(req, res);
})


app.listen(3000);
console.log('server opening at localhost:3000');