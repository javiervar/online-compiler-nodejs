module.exports={
  python_comp:compilar
}


function compilar(res,path,callback,extension){
  var python = require('child_process').spawn(extension,["code/"+extension+"/"+path]);
  var output = "";

  python.stdout.on('data', function(data){
    output += data 
  });

  python.on('close', function(code){       
    console.log("log---- ",code);
    response(res,callback,output);
  });
}


function response(res,callback,data) {
  console.log(callback);
  var dat = { data: data };
  res.header('Content-type','application/json');
  res.header('Charset','utf8');
  res.jsonp(dat);
}


