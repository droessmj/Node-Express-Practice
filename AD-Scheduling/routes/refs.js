var express = require('express');
var router = express.Router();

/* GET refs list*/
router.get('/', function(req, res) {
  res.render('refs', { title: 'AD-Scheduling' });
});

/* GET refs listing. */
router.get('/reflist', function(req, res) {
	var db = req.db;
	db.collection('reflist').find().toArray(function(err,items){
		res.json(items);
	});
});

router.post('/addref', function(req,res){
    var db = req.db;
    db.collection('reflist').insert(req.body, function(err,result){
        res.send((err === null) ? {msg: ''} : {msg: err});
    });
});

router.delete('/deleteref/:id', function(req, res){
    var db = req.db;
    var refToDelete = req.params.id;
    db.collection('reflist').removeById(refToDelete, function(err, result){
        res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err} );
    });
});

module.exports = router;
