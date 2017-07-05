/**
 * Created by junjun on 2017/5/10.
 */
var db = require('./schema');

//模糊查询，有就传，没有就全部
exports.getActMes = function (req , res) {
    var httpResult ={};
    if(req.body.title){
        var key = new RegExp(req.body.title);
        db.PreActivity.find({title:key}, function (err, results) {
            if (err) {
                console.log('出错' + err);
                return
            }
            else {
                httpResult.code = 200;
                httpResult.activity = results;
                res.send(httpResult);
            }
        })
    }
    else {
        db.PreActivity.find({}, function (err, results) {
            if (err) {
                console.log('出错' + err);
                return
            }
            else {
                httpResult.code = 200;
                httpResult.activity = results;
                res.send(httpResult);
            }
        })
    }
}


exports.getAfterActMes = function (req ,res) {
    var httpResult={};
    db.AfterActivity.find(function (err, results) {
        if(err){
            console.log('出错'+err);
            return
        }
        else{
            httpResult.code = 200;
            httpResult.afterActivity = results;
            res.send(httpResult);
        }
    })
}


exports.changeLikeNum = function (req, res) {
    var httpResult = {};
    db.PreActivity.where({'id':req.body.id}).update({$set:{'like':req.body.like,'likeNum':req.body.likeNum}},function (err, results) {
        if(err){
            console.log('出错'+err);
            return
        }
        else{
            httpResult.code = 200;
            httpResult.activity = results;
            res.send(httpResult);
        }
    })
}
