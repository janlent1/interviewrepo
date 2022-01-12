const mysql = require('mysql');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const http = require('http');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'admin',
    password: 'some_pass',
    database: 'bookstore'
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

// while(true){
// const ans = await askQuestion("What query do you like to execute?(Please answer select, update, drop, delete) ");
// switch (ans.toUpperCase()) {
//     case 'INSERT':
//         break;
//     case 'SELECT':
//         const table = await askQuestion("From which table would you like to select from?");
//         const column = await askQuestion("Which columns would you like to select?");
//         const where = await askQuestion("Which special conditions do you have?(Please write the condition into here");
//
//         break;
//     case 'UPDATE':
//         break;
//     case 'DROP':
//         break;
//     case 'DELETE':
//         break;
//     default:
//
// }

// }
const requestListener = async function (req, res) {
    const whattodo = req.url.split('/')
    // first one is empty
    const request = whattodo[1]
    let response = '';
    switch (request.toLowerCase()) {
        case 'getallbooks':
            await connection.query('SELECT * FROM BOOKS', function (error, results, fields) {
                if (error) throw error;
                if(results){
                    response = results
                }
            });
            break;
        default:
            break;

    }
    res.writeHead(200);
    res.end(JSON.stringify(response))
    // res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8088);


connection.query('SELECT 1', function (error, results, fields) {
    if (error) throw error;
    // connected!
});
