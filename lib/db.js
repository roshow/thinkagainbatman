'use strict';
var mongoose = require('mongoose'),
    promised = require('promised-io/promise'),
    db = {},
    batThoughtSchema, batThoughtModel, conf;

conf = {
    db: {
        user: 'batman',
        pw: 'androbin',
        host: 'ds043388.mongolab.com:43388',
        database: 'thinkbatman',
        collection: 'imgs'
    }
};

batThoughtSchema = mongoose.Schema({
    id: String,
    img : {
        src: String,
        scale: String
    },
    credit : {
        name: String,
        link: String
    }
}, { collection: conf.db.collection });

batThoughtModel = mongoose.model('batThoughtModel', batThoughtSchema);

db.find = function(query){
    var def = new promised.Deferred();
    batThoughtModel.find(query || {}, function(err, docs){
        if (err) { def.reject(err); }
        else { def.resolve(docs); }
    });
    return def;
};

db.putAThought = function(model){
    var def = new promised.Deferred(),
        _id = model._id;
    delete model._id;
    batThoughtModel.findOneAndUpdate({ _id: _id }, model, { upsert : true }, function(err, numChanges){
        if (err) { def.reject(err); }
        else { def.resolve(numChanges); }
    });
    return def;
};

db.putABunch = function(models){
    var that = this,
        allthosepromises = [];
    models.forEach(function(model){
        allthosepromises.push(that.update(model));
    });
    return promised.all(allthosepromises);
};

db.connect = function(){
    var deferred = new promised.Deferred();
    mongoose.connect('mongodb://' + conf.db.user + ':' + conf.db.pw +  '@' + conf.db.host + '/' + conf.db.database);
    mongoose.connection
        .on('error', console.error.bind(console, 'connection error:'))
        .once('open', deferred.resolve);
    return deferred;
};

module.exports = db;