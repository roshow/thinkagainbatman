'use strict';
var db = require('./db'),
    handler = {
        connectDb: db.connect
    };

function WrappedResponse(docs){
    this.code = 200;
    this.count = docs.length;
    this.docs = docs;
}

handler.get = function(req, res){
    var q  = req.params[0] ? { _id:  req.params[0] } : {};
    db.find(q).then(
        function(docs){
            res.send(200, new WrappedResponse(docs));
        },
        function(err){ console.log(err); }
    );
};

handler.put = function(req,res){
    // db.putAThought(res.);
    res.send(404);
};

module.exports = handler;