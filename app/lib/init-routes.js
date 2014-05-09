'use strict';

var traceur = require('traceur');
var routeDebugger = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var priorities = traceur.require(__dirname + '/../routes/priorities.js');
  var tasks = traceur.require(__dirname + '/../routes/tasks.js');

  app.all('*', routeDebugger);
  app.get('/', home.index);
  app.get('/priorities', priorities.index);
  app.delete('/priorities/:id', priorities.destroy);
  app.post('/priorities', priorities.create);
  app.get('/tasks', tasks.index);
  app.post('/tasks', tasks.create);
  app.put('/tasks/:id', tasks.update);
  app.get('/tasks/filter/:pid', tasks.filter);
  app.get('/tasks/sort/date', tasks.datesort);
  app.get('/tasks/sort/title', tasks.titlesort);
  app.get('/tasks/sort/isComplete', tasks.isCompleteSort);
  app.delete('/tasks/:id', tasks.destroy);

  console.log('Routes Loaded');
  fn();
}
