// app/routes.js
module.exports = function(app, passport) {


// routes ======================================================================
// api ---------------------------------------------------------------------
// get all todos
  app.get('/api/todos', function (req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(todos); // return all todos in JSON format
    });
  });

// create todo and send back all todos after creation
  app.post('/api/todos', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
      text: req.body.text,
      done: false
    }, function (err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function (err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

// delete a todo
  app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function (err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function (err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });


  app.get('/loggedin', function(req,res){
    res.send(req.isAuthenticated()?req.user:'0');
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  }));


  app.post('/login', passport.authenticate('local-login'),function(req,res){
    res.render('index', {user:JSON.stringify(req.user)}); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.post('/logout',function(req,res){
    req.logout();
    res.send(200);
  });


  app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
  });

  app.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
  });
  // =====================================
// MAIN SECTION ========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
  app.get('/main', auth, function (req, res) {
    res.json({message:'hello there'});
  });


// application -------------------------------------------------------------
  app.get('*', function (req, res) {
   res.render('index', {user:JSON.stringify(req.user)}); // load the single view file (angular will handle the page changes on the front-end)
  });
}

// route middleware to make sure a user is logged in
var auth =  function(req, res, next) {

  // if user is authenticated in the session, carry on
  if (!req.isAuthenticated())
    res.send(401);
  else
  // if they aren't redirect them to the home page
    next();
}
