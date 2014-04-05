'use strict';
var mongoose = require('mongoose'),
    promised = require('promised-io/promise'),
    db = {},
    theModelSchema, theModel;

var conf = {
    db: {
        user: '',
        pw: '',
        host: '',
        database: '',
        collection: ''
    }
};

theModelSchema = mongoose.Schema({
    id: String,
    text: String,
    num: Number
}, { collection: conf.db.collection });

theModel = mongoose.model('theModel', theModelSchema);

db.find = function(query){
    var def = new promised.Deferred();
    theModel.find(query || {}, function(err, docs){
        if (err) { def.reject(err); }
        else { console.log(docs); def.resolve(docs); }
    });
    return def;
};

db.putAModel = function(model){
    var def = new promised.Deferred(),
        _id = model._id;
    delete model._id;
    theModel.findOneAndUpdate({ _id: _id }, model, { upsert : true }, function(err, numChanges){
        if (err) { def.reject(err); }
        else { def.resolve(numChanges); }
    });
    return def;
};

db.putABunchOfModels = function(models){
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