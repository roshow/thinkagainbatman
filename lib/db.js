'use strict';
var mongoose = require('mongoose'),
    promised = require('promised-io/promise'),
    db = {},
    batThoughtSchema, batThoughtModel;

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
}, { collection: 'imgs' });

batThoughtModel = mongoose.model('batThoughtModel', batThoughtSchema);

db.find = function(query){
    var def = new promised.Deferred();
    batThoughtModel.find(query || {}, function(err, docs){
        if (err) def.reject(err);
        else def.resolve(docs);
    });
    return def;
};

db.update = function(model){
    var def = new promised.Deferred(),
        _id = model._id;
    delete model._id;
    batThoughtModel.update({ _id: _id }, model, {upsert:true}, function(err, numChanges){
        if (err) def.reject(err);
        else def.resolve(numChanges);
    });
    return def;
};

db.batchUpdate = function(models){
    var that = this,
        allthosepromises = [];
    models.forEach(function(model){
        allthosepromises.push(that.update(model));
    });
    return promised.all(allthosepromises);
};

db.connect = function(mongodb){
    var deferred = new promised.Deferred();
    mongoose.connect(mongodb);
    mongoose.connection
        .on('error', console.error.bind(console, 'connection error:'))
        .once('open', deferred.resolve);
    return deferred;
};

module.exports = db;

// var cmxJSON = mongoose.model('cmxJSON', cmxjsonSchema);
//     cmxJSON.find(function (err, cmxmd) {
//         if (err){
//             console.log(err);
//         }
//         console.log(
//         cmxmd[2].JSON[20]);
//     });