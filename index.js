const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bitcoin = require("bitcoinjs-lib");


var app = express();
app.use(cors());


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_name'
});


connection.connect(function (err) {
    if (!err) {
        console.log('Connected');
    } else {
        console.log('Not Connected');
    }
});


app.get('/createbtc', (req, res) => {
    
    var keyPair = bitcoin.ECPair.makeRandom();
    var address = keyPair.getAddress();
    var key = keyPair.toWIF();
    var data = {
      "address": address,
      "privateKey": key
    }

    connection.query('INSERT INTO test_wallet SET ?', [data], (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        res.json(data);
      }
    });
});


app.listen(3000, function(err, res) {
    if(err) throw err;
    console.log('Server is listening.');
});