'use strict';
var db = require('./db'),
    handler = {
        connectDb: db.connect,
        thought: {}
    };

handler.thought.get = function(req, res){
    var q  = req.params.batId ? { id:  req.params.batId } : {};
    db.find(q).then(
        function(docs){
            res.send(200, docs);
        },
        function(err){ console.log(err); }
    );
};

handler.thought.put = function(req,res){
    res.send(404);
};

module.exports = handler;