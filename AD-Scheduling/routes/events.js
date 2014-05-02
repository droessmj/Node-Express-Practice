var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('events', { title: 'AD-Scheduling' });
});

/* GET events listing. */
router.get('/eventlist', function(req, res) {
	var db = req.db;
    //sort events by upcoming first (1 vs. -1 -- -1 being last events first)
	db.collection('eventlist').find().sort({date: 1}).toArray(function(err,items){
		res.json(items);
	});
});

router.post('/addevent', function(req,res){
    var db = req.db;
    db.collection('eventlist').insert(req.body, function(err,result){
        res.send(
            (err == null) ? {msg: ''} : {msg: err}
        );
    });
});

router.delete('/deleteevent/:id', function(req, res){
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('eventlist').removeById(userToDelete, function(err, result){
        res.send((result === 1) ? { msg: ''} : { msg: 'error: '+ err});
    });
});

module.exports = router;
