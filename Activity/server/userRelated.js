var db = require('./schema');


exports.judgeLoading = function (req, res) {
    var httpResult ={};
    db.User.findOne({"name":req.body.name},function (err,results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            if(results){
                if(results.pwd == req.body.pwd){
                    httpResult.code = 200;
                }
                else{
                    httpResult.code = -1;
                    httpResult.description = '密码错误!';
                }
                res.send(httpResult);
            }
            else{
                httpResult.code = -1;
                httpResult.description = '用户名不存在!';
                res.send(httpResult);

            }
        }
    })
}

exports.register = function (req,res) {
    var httpResult= {}
    db.User.findOne({"name":req.body.name},function (err, results) {
        if (err) {
            console.log('出错'+ err);
            return
        }
        else{
            if(results){
                console.log('jinlaile');
                httpResult.code = -1;
                httpResult.description = '用户名重复';
                res.send(httpResult);
            }
            else{
                db.User({name : req.body.name , pwd : req.body.pwd, email:req.body.email, telephone:req.body.telephone}).save(function (err,results) {
                    if (err) {
                        console.log('出错'+ err);
                        return
                    }
                    else{
                        httpResult.code = 200;
                    }
                    res.send(httpResult);
                })
            }
        }

    })
}