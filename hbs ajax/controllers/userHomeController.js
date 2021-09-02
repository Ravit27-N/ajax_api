


// View Users
exports.view = (req, res) => {
    res.render("home") 
}

// // Find User by Search
// exports.find = (req, res) => {
//   let searchTerm = req.body.search;
//   // User the connection
//   connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
//     if (!err) {
//       res.render('home', { rows });
//     } else {
//       console.log(err);
//     }
//     // console.log('The data from user table: \n', rows);
//   });
// }

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
// exports.create = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   let searchTerm = req.body.search;

//   // User the connection
//   connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
//     if (!err) {
//       res.render('add-user', { alert: 'User added successfully.' });
//     } else {
//       console.log(err);
//     }
//     // console.log('The data from user table: \n', rows);
//   });
// }


// Edit user
exports.edit = (req, res) => {
  // User the connection
 res.render("edit-user");
}


// Update User
// exports.update = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   // User the connection
//   connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

//     if (!err) {
//       // User the connection
//       connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//         // When done with the connection, release it
        
//         if (!err) {
//           res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
//         } else {
//           console.log(err);
//         }
//         // console.log('The data from user table: \n', rows);
//       });
//     } else {
//       console.log(err);
//     }
//     // console.log('The data from user table: \n', rows);
//   });
// }

//Delete User


// View Users
exports.viewall = (req, res) => {
  res.render("view-user")
}