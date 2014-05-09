'use strict';

var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');

exports.index = (req, res)=>{
  priorities.find().toArray((err, records)=>res.render('priorities/index', {priorities: records, title: 'Priorities'}));
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  priorities.findAndRemove({_id:_id}, ()=>res.redirect('/priorities'));
};

exports.create = (req, res)=>{
  priorities.save(req.body, ()=>res.redirect('/priorities'));
};
