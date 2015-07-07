var express = require('express');
var router = express.Router();
var mysql = require('./mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/posts',function(req,res,next){
  var qry = "select * from posts";
  console.log("here2");
  mysql.fetchData(qry,[],function(err,results){
    if(!err){
      var posts = {
        'posts' :results
      };
      console.log(results);
      qry = "select * from author";
      mysql.fetchData(qry,[],function(err,results){
        if(!err){
          posts.authors=results;
          res.send(posts);
        }else{
          res.send({'error':"Error fetching the data"});
          res.end();
        }
      });
    }else{
      res.send({'error':"Error fetching the data"});
      res.end();
    }

  });
});
router.get('/api/testposts',function(req,res,next){
 // var qry = "select * from posts";
  console.log("here2");
  //var posts = {
  //  "testposts":[
  //    {
  //      "id":1,
  //      "title" : 'post_1',
  //      "author" : 1,
  //      "test_col":"testing_col"
  //    }
  //  ],
  //  "authors":[
  //    {
  //      "id":1,
  //      "fname":"yahoo",
  //      "lname":"yam+"
  //
  //    }
  //  ]
  //};


  var posts = {
    "testposts":[
      {
        "id":1,
        "title" : 'post_1',
        "author" : {
          "id":1,
          "fname":"yahoo",
          "lname":"yam+"

        },
        "test_col":"testing_col"
      },
      {
        "id":2,
        "title" : 'post_2',
        "author" : {
          "id":2,
          "fname":"sjsu",
          "lname":"spartans"

        },
        "test_col":"testing_col"
      }
    ]
  };
   res.send(posts);
  res.end();

});

router.get('/api/authors',function(req,res,next){
  var qry = "select * from author";
  console.log("here2");
  mysql.fetchData(qry,[],function(err,results){
    if(!err){
      var authors = {
        'authors' :results
      };
      res.send(authors);
    }else{
      res.send({'error':"Error fetching the data"});
      res.end();
    }

  });

});

router.get('/api/posts/:id',function(req,res,next) {
  var qry = "select * from posts where id=?";
  console.log("here");
  var id = parseInt(req.params.id);
  mysql.fetchData(qry, [id], function (err, results) {
    if (!err) {
      console.log(results);
      var post = results[0];
      res.send(post);
      res.end();
    } else {
      res.send({'error': "Error fetching the data"});
      res.end();
    }

  });

});

router.post('/api/posts/',function(req,res,next) {
  var qry = "insert into posts (title,author) values (?,?)";

  var post = req.body.post;
  //console.log("here=> "+ title);
  var title=post.title;
  console.log(req.body);
  var author = post.author;
  mysql.execQuery(qry, [title,author], function (err, results) {
    if (!err) {
      console.log(results.insertId);
      res.send({"post":{"id":results.insertId,"title":title,"author":author}});
      res.end();
    } else {
      res.send({'status': "error"});
      res.end();
    }

  });

});

router.post('/api/authors/',function(req,res,next) {
  var qry = "insert into author (fname,lname) values (?,?)";

  var author = req.body.author;
  //console.log("here=> "+ title);
  var fname=author.fname;
  console.log(req.body);
  var lname = author.lname;
  mysql.execQuery(qry, [fname,lname], function (err, results) {
    if (!err) {
      console.log(results.insertId);
      res.send({"author":{"id":results.insertId,"fname":fname,"lname":lname}});
      res.end();
    } else {
      res.send({'status': "error"});
      res.end();
    }

  });

});



router.put('/api/posts/:id',function(req,res,next) {
  var qry = "update posts set author=?,title=? where id =?";

  var post = req.body.post;
  //console.log("here=> "+ title);
  var title=post.title;
  console.log(req.body);
  var author = post.author;
  var id = parseInt(req.params.id);
  mysql.execQuery(qry, [author,title,id], function (err, results) {
    if (!err) {
      res.send({'status':'success'});
      res.end();
    } else {
      res.send({'status': "error"});
      res.end();
    }

  });

});

router.put('/api/authors/:id',function(req,res,next) {
  var qry = "update author set fname=?,lname=? where id =?";

  var author = req.body.author;
  //console.log("here=> "+ title);
  var fname=author.fname;
 // console.log(req.body);
  var lname = author.lname;
  var id = parseInt(req.params.id);
  mysql.execQuery(qry, [fname,lname,id], function (err, results) {
    if (!err) {
      res.send({'status':'success'});
      res.end();
    } else {
      res.send({'status': "error"});
      res.end();
    }

  });

});

router.delete('/api/posts/:id',function(req,res,next) {
  var qry = "delete from posts where id=?";


  var id = parseInt(req.params.id);
  mysql.execQuery(qry, [id], function (err, results) {
    if (!err) {
      res.send({'status':'success'});
      res.end();
    } else {
      res.send({'status': "error"});
      res.end();
    }

  });

});

module.exports = router;
