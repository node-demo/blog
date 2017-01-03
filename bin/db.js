const mysql = require('mysql');

// 线上
// const username = '6cb78e801aa7490cb9f3beaaa2aa7aed';
// const password = '0a615de5c61a4fb5a8086199338f64e9';
// const db_host = 'sqld.duapp.com';
// const db_port = 4050;
// const db_name = 'QUWXvEKfsUCoqIZEdgQf';

// 本地
const username = 'root';
const password = 'root';
const db_host = 'localhost';
const db_port = 3306;
const db_name = 'test';

const option = {
  host: db_host,
  port: db_port,
  user: username,
  password: password,
  database: db_name
}

const db = mysql.createPool(option);

module.exports = db;


// 数据库=>操作类
function testSql(req, res) {
  var TEST_TABLE = 'baeSql';

  // var client = mysql.createConnection(option);

  // MySQL连接池
  var client = mysql.createPool(option);

  client.on('error',function(err) {
      if (err.errno != 'ECONNRESET') {
        throw err;
      } else {
        console.log('on error =>' + err);
      }
  });

  //至此连接已建立，可以对数据库进行操作
  function insertData(client) {
    client.query(
      'INSERT INTO '+ TEST_TABLE +
      ' SET title = ?, text = ?',
      ['baidu', 'welcome to BAE'],
      function(err, results) {
        if (err) {
          res.end('insertData error');
          console.log(err);
          return;
        }
        res.write('insert success \n');
        queryData(client);
      }
    );
  }

  function queryData (client) {
    client.query(
      'SELECT * FROM '+TEST_TABLE,
      function (err, results, fields) {
        if (err) {
          res.end('query error');
          console.log(err);
          return;
        }
        // res.end('results: ' + JSON.stringify(results) + '\n');
        res.write('query success \n');
        res.end('results length: ' + results.length);
        client.end();
      }
    );
  }
}
// module.exports = testSql