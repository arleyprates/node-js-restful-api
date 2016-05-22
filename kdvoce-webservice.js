var express = require('express');
var app = express();
var fs = require("fs");
var jsonfile = require('jsonfile');
var file = 'kdvoce-location.json';
var bodyParser = require('body-parser')

/*
/     Dentro do arquivo JSON deve conter obrigatoriamente as chaves:
/     =================>>>>     []
/     Define o tipo de arquivo JSON correto
/     Para utilizar o PARSER
/     E concatenar os dados
*/

//Object para parser
app.use(bodyParser.json());

app.post('/addLocation', function (req, res) {

  console.log('Lendo JSON');
  fs.readFile( __dirname + "/" + "kdvoce-location.json", 'utf8', function (err, data) {
    console.log( 'Criando object ARRAY' );
    var data = JSON.parse( data );  
    
    console.log( 'Adicionando no ARRAY' );
    console.log( 'Utilizando parser para receber os dados' );
    data.push(req.body);

    console.log( 'Atributos do array' );
    console.log( req.body.id_telefone );
    console.log( req.body.latitude );
    console.log( req.body.longitude );
    
    console.log( 'Gravando JSON' );
    jsonfile.writeFileSync(file, data, {spaces: 2})

    console.log( 'Retornando JSON' );
    res.end( JSON.stringify(data));
  });
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("KdVoce Webservice rodando em http://%s:%s", host, port)

})