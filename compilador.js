var express = require('express'); 
var path = require('path');
var bodyParser=require('body-parser');
var fs = require('fs');
var app = express();
var childProcess = require('child_process'),ls;
var compilar=require('./js/compilar')

var page = require('./controllers/content');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(page);



app.get('/test',function(req,res){
  console.log(req.query.data);
  var data=decodeURIComponent(req.query.data);
  data=JSON.parse(data);

  var code=data.code;
  var lenguaje=data.lenguaje;
  var path=data.path;
  var callback=data.callback;
  var stream = fs.createWriteStream("code/"+lenguaje+"/"+path);
  var sep=code.split("<salt>");

  stream.once('open', function(fd) {
    for(var x in sep){
      stream.write(sep[x]+"\n");
    }
    stream.end();
    compilar.python_comp(res,path,callback,lenguaje);
  });
})

require('http').createServer(app).listen(3000, function(){
  console.log('Listening on 3000');
});


