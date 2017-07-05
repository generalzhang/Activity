/**
 * Created by junjun on 2017/5/24.
 */
var db = require('./schema');

exports.getUsers = function (req,res) {
    var httpResult= {}
    db.User.find({},function (err, results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            httpResult.code = 200;
            httpResult.users = results;
            res.send(httpResult);
        }

    })
}

exports.getComplain = function (req,res) {
    var httpResult= {}
    db.Complain.find({},function (err, results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            httpResult.code = 200;
            httpResult.complain = results;
            res.send(httpResult);
        }

    })
}

exports.uploadComplain = function (req,res) {
    var httpResult= {}
    db.Complain({username:req.body.username,telephone:req.body.telephone,actname:req.body.actname,dec:req.body.dec}).save(function (err, results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            httpResult.code = 200;
            res.send(httpResult);
        }

    })
}

exports.deleteUser = function (req,res) {
    var httpResult= {}
    db.User.remove({'name':req.body.name},function (err, results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            httpResult.code = 200;
            httpResult.description = '删除成功';
            res.send(httpResult);
        }

    })
}

exports.getActandUser = function (req,res) {
    var httpResult= {}
    db.PreActivity.find(function (err, results) {
        if(err){
            console.log('出错'+err);
            return
        }
        else{
            httpResult.activity = results;
            db.User.find({},function (err, results) {
                if (err) {
                    console.log('出错'+ err);
                    return
                }
                else{
                    httpResult.code = 200;
                    httpResult.users = results;
                    res.send(httpResult);
                }

            })

        }
    })
}

exports.deleteAct = function (req,res) {
    var httpResult= {};
    var description ='';
    db.AfterActivity.findOne({title:req.body.actname},function (err, results) {
        if(err){
            console.log('出错'+err);
            return
        }
        else{
            if(results){
                console.log(results);
                db.AfterActivity.remove({'title':req.body.actname},function (err, results) {
                    if (err) {
                        console.log('出错'+ err);
                        return
                    }
                    else{
                        description = description+ '活动回顾删除成功';
                    }

                })

            }
            db.PreActivity.remove({'title':req.body.actname},function (err, results) {
                if (err) {
                    console.log('出错'+ err);
                    return
                }
                else{
                    httpResult.code = 200;
                    description = description+ '  初始活动删除成功';
                    httpResult.description = description;
                    res.send(httpResult);
                }

            })

        }
    })
}