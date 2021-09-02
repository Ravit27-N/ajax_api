const mysql = require('mysql');
// const connection = require("../utils/dbConnection");
// Connection Pool
let connection = mysql.createConnection({
   host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_login'
});


// View Users
exports.viewAPI = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status('200').json({msg:"success",rows});
    }
  });
}

// Find User by Search
exports.findAPI = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status('200').json({message:"success",rows});
    }
    console.log("completed2")
  });
}

exports.formAPI = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.createAPI = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // let searchTerm = req.body.search;
  // User the connection
  data=[first_name, last_name, email, phone, comments]
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', data, (err, rows) => {
    if (!err) {
      // res.render('add-user', { alert: 'User added successfully.' });
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }
    console.log("completed3")
  });
}


// Edit user
exports.editAPI = (req, res) => {
  // User the connection
  req.params.id
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status('200').json({msg:"success",rows});
    }
    console.log("completed4")
  });
}


// Update User
exports.updateAPI = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  const data_update = [first_name, last_name, email, phone, comments, req.params.id]
  
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', data_update, (err, rows) => {
     if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
          if(err){
            res.json({msg:'error'});
          }else{
            res.status('200').json({msg:"success",rows});
          }
        
      });
    } else {
      console.log(err);
    }
    console.log("completed5")
  });
}

// Delete User
exports.deleteAPI = (req, res) => {
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {

    if (!err) {
      // res.render('add-user', { alert: 'User added successfully.' });
      res.json({msg:'success'});
    } else {
      console.log(err);
      res.json({msg:'error'});
    }

    console.log("completed6")
  });

}

// View Users
exports.viewallAPI = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if(err){
      res.json({msg:'error'});
    }else{
      res.status('200').json({message:"success",rows});
    }
  });
}
