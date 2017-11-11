var express = require('express');
var bodyParser = require('body-parser');
////////////////////////////////////////////////
//var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({extended:false}));

////////////////////////////////////////////////
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'exchangerate'
});
connection.connect();
////////////////////////////////////////////////
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'ExchangeRateInfo' });
});

app.post('/user', function(req,res){
	var user_id = req.body.user_id;
	var password = req.body.password;
	var email = req.body.email;

	connection.query(
	'insert into user(user_id,password,email) values(?,?,?)',
	[user_id, password, email],
	function(err, result){
		if(err){
			res.send(JSON.stringify(err));
		}else{
			res.send(JSON.stringify(result));
		}
	});
});

app.post('/user/login', function(req,res){
	var user_id = req.body.user_id;
	var password = req.body.password;

	connection.query(
		'select count(1) from user where user_id=? and password=?',
		[user_id, password],
		function(err, result){
			if(err){
				res.send(JSON.stringify(err));
			}else{
				res.send(JSON.stringify(result));
			}
		});
});


app.put('/user', function(req,res){
	var user_id = req.body.user_id;
	var password = req.body.password;
	var email = req.body.email;
	
	connection.query(
		'update user set password=?, email=? where user_id = ?',
		[password, email, user_id],
		function(err, result){
			if(err){
				res.send(JSON.stringify(err));
			}else{
				res.send(JSON.stringify(result));
			}
		});
});

app.delete('/user', function(req,res){
	var user_id = req.body.user_id

	connection.query(
		'delete from user where user_id=?',
		[user_id],
		function(err, result){
			if(err){
				res.send(JSON.stringify(err));
			}else{
				res.send(JSON.stringify(result));
			}
		});
});

app.put('/main', function(req,res){
	var code = req.body.code;
	res.send(JSON,stringify({rowid:rowid}));
});

app.put('/main/country', function(req,res){
	var code = req.body.code;
	var country1 = req.body.country1;
	var country2 = req.body.country2;
});

app.put('/main/amount', function(req,res){
	var rowid = req.body.rowid;
	var amt1 = req.body.amt1;
	var amt2 = req.body.amt2;
	res.send(JSON,stringify({rowid:rowid,amt1:amt1,amt2:amt2}));
});

app.put('/main/country/list', function(req,res){
	var rowid = req.body.rowid;
	var countrylist = req.body.countrylist;
	res.send(JSON,stringify({rowid:rowid,countrylist:countrylist}));
});

app.put('/main/currency', function(req,res){
	var rowid = req.body.rowid;
	res.send(JSON,stringify({rowid:rowid}));
});

app.get('/main/chart', function(req,res){
	var rowid = req.body.rowid;
	res.send(JSON,stringify({rowid:rowid}));
});

app.get('/getcountryinfo', function(req,res){
	var country = req.query.country;
	querystr = 'select currency_code, alpha2, alpha3, kor_name, eng_s_name  from country_code where alpha3 in ('+country+')';
	console.log(querystr);
	connection.query(
		querystr,
		function(err, result){
			console.log('result='+result);
			if(err){
				res.send(JSON.stringify(err));
			}else{
				res.send(JSON.stringify(result));
			}
		});	
});

app.get('/allcountryinfo', function(req,res){
	var country = req.query.country;
	querystr = 'select num_code, alpha2, alpha3, kor_name from country_code order by kor_name';
	// console.log(querystr);
	connection.query(
		querystr,
		function(err, result){
			console.log('result='+result);
			if(err){
				res.send(JSON.stringify(err));
			}else{
				res.send(JSON.stringify(result));
			}
		});	
});

//module.exports = router;

app.listen(52273, function(){
	console.log('Server running...');
});