let PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ramin1998',
  database: 'mybase'
});

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/user', function(req, res) {
    connection.query('SELECT * FROM mybase.users;', 
  (err, data) => {
    res.json(data);
  })
});

app.post('/user', function (req, res) {
    connection.query(`
  INSERT INTO users (username)
  VALUES ('${req.body.username}');
`,);
})

app.delete('/user/:id', function (req, res) {
    connection.query(`DELETE FROM users
WHERE id = '${req.params.id}';`)});

app.put("/user/:id", function (req, res) {
    connection.query(`UPDATE users
       SET username = '${req.body.username}'
       WHERE id = '${req.params.id}'`
  );
})

app.listen(PORT, function () {
    console.log("port: " + PORT)
});