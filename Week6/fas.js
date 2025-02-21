// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  database: 'week',
});

const express = require('express')
const app = express()
const port = 3002



app.use(express.json())


app.get('/', (req, res) => {
   // A simple SELECT query
connection.query(
    'SELECT * FROM tbl_user' ,
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
})

app.get('/:id',(req,res) =>  {
    connection.query(
    'SELECT * FROM tbl_user WHERE id = ' + req.params.id,
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
    )
 })

app.post('/', (req,res) => {
    const data = req.body
    connection.query(
        `INSERT INTO tbl_user (fname, lname, status)
         VALUES ('${data.fname}','${data.lname}','1')`,
         function (err, results, fields) {
            res.json(results)
         }
    )
})

app.put('/:id', (req,res) => {
  connection.query(
    `UPDATE thl_user SET fname = ? , lname = ? WHERE id = ?` ,
    [req.body.fname, req.body.lname , req.params.id],
    (err, results, fields) => {
      console.log(err)
      res.json(results)
    }
  )
})


app.delete('/:id' , (req,res) => {
    connection.query(
    `UPDATE tbl_user SET status = 0 WHERE id = ${req.params.id}`,
    function (err,results, fields){
        res.json(results)
    }
    )
})


app.listen(port, () => {
    console.log('Server is running on port :', port)
})