var db = require('./schema');
var fs = require('fs');
var multiparty = require('multiparty');

/**
 * 取得初始的活动的详细信息
 */
exports.getUserAllAct = function (req,res) {
    var httpResult ={};
    db.PreActivity.find({username: req.body.username},function (err, results) {
        if(err){
            console.log('出错'+err);
        }
        else{
            httpResult.code =200;
            httpResult.preAct = results;
            res.send(httpResult);
        }
    })
}

/**
 * 取得所有的活动总数
 */
exports.getAllCount = function (req, res) {
    var httpResult = {};
    var date = new Date();
    var month =Number(date.getMonth())+1;
    if(month<10){
        month = '0'+month;
    }
    var thistime = date.getFullYear()+'-'+month+'-'+date.getDate();

    db.PreActivity.find({username: req.body.username},{'time':1},function (err, results) {
        if(err){
            console.log('出错PreActivity'+err);
        }
        else{
            var allCount = results.length;
            var i=0;
            var fin =0;
            var ing =0;
            var allIng =0;
            for (;i<allCount;i++){
                if(results[i].time == thistime){
                    allIng = allIng+1;
                }
                else if(new Date(results[i].time).getTime() < new Date().getTime()){
                    fin =fin+1;
                }
            }
            db.AfterActivity.find({username: req.body.username}).count(function (err, results) {
                if(err){
                    console.log('出错AfterActivity'+err);
                }
                else{
                    var allEditAfter = results;
                    httpResult.noFin = fin - allEditAfter;
                    httpResult.allCount = allCount;
                    httpResult.allIng = allIng;
                    httpResult.allEditAfter = allEditAfter;
                    httpResult.code =200;
                    res.send(httpResult);


                }
            })
        }
    })
}

/**
 * 取得已编辑活动的总数
 */
exports.getUserEditAfter = function (req, res) {
    var httpResult = {};
    db.AfterActivity.find({username: req.body.username},function (err, results) {
        if(err){
            console.log('出错'+err);
        }
        else{
            httpResult.code =200;
            httpResult.afterAct = results;
            res.send(httpResult);
        }
    })
}
/**
 * 编辑或者新增初始活动
 */
exports.editPreAct = function (req,res) {
    var httpResult ={};
    var params = req.body;
    if(params._id ==''){
        db.PreActivity.find().count(function (err, results) {
            if (err) {
                console.log('出错'+ err);
                return
            }
            else{
                params._id = Number(results) +1;
                db.PreActivity(params).save(function (err ,results) {
                    if (err) {
                        console.log('出错'+ err);
                        return
                    }
                    else{
                        httpResult.code =200;
                        res.send(httpResult);
                    }
                })
            }
        })
    }
    else{
        db.PreActivity.findOne({_id:params._id},function (err,results) {
            if(err){
                console.log('出错'+err);
            }
            results.title = params.title;
            results.username = params.username;
            results.slogan = params.slogan;
            results.dec = params.dec;
            results.time = params.time;
            results.actPhotoAddress = params.actPhotoAddress;
            results.aliPayAddress = params.aliPayAddress;
            results.weiPayAddress = params.weiPayAddress;
            results.like = params.like;
            results.likeNum = params.likeNum;
            results.monneyVal = params.monneyVal;
            results.monneyMax = params.monneyMax;
            db.PreActivity(results).save(function (err) {
                if(err){
                    console.log('出错'+err);
                }
                else{
                    httpResult.code =200;
                    res.send(httpResult);
                }
            })
        })
    }

}



/**
 * 编辑或者新增活动回顾
 */
exports.editAfterAct = function (req,res) {
    var httpResult ={};
    var params = req.body;
    if(params._id ==''){
        db.AfterActivity.find().count(function (err, results) {
            if (err) {
                console.log('出错'+ err);
                return
            }
            else{
                params._id = Number(results) +1;
                db.AfterActivity(params).save(function (err ,results) {
                    if (err) {
                        console.log('出错'+ err);
                        return
                    }
                    else{
                        httpResult.code =200;
                        res.send(httpResult);
                    }
                })
            }
        })
    }
    else{
        db.AfterActivity.findOne({_id:params._id},function (err,results) {
            if(err){
                console.log('出错'+err);
            }
            results.title = params.title;
            results.username = params.username;
            results.dec = params.dec;
            results.actPhotoAddress = params.actPhotoAddress;
            db.AfterActivity(results).save(function (err) {
                if(err){
                    console.log('出错'+err);
                }
                else{
                    httpResult.code =200;
                    res.send(httpResult);
                }
            })
        })
    }

}

/**
 * 上传图片
 */
exports.uploadPhoto = function(req, res) {
    var httpResult = {};
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        //将前台传来的base64数据去掉前缀
        var imgData = req.body.photoBase.replace(/^data:image\/\w+;base64,/, '');
        var dataBuffer = new Buffer(imgData, 'base64');
        db.Photo.find().count(function (err,results) {
            if(!err){
                var name = Number(results) +1;
                fs.writeFile('../src/assets/'+name+'.jpg',dataBuffer, function (err) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        db.Photo({_id:name,address:'/src/assets/'+name+'.jpg'}).save(function (err,results) {
                            if(!err){
                                httpResult.code = 200;
                                httpResult.address = '/src/assets/'+name+'.jpg';
                                res.send(httpResult);
                            }
                            else{
                                res.send(err);
                            }
                        })
                    }
                })
            }
        })
    });
}

