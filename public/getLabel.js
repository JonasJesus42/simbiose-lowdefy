import mysql from 'mysql'
import bcrypt from 'bcrypt'
function  getLabel(email, password, callback) {

  console.log(email, password)


  const connection = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: 'sua-senha',
    database: 'lowdefy'
  });

  connection.connect();

  const query = 'SELECT user_id, fist_name, email, password FROM user WHERE email = ?';

  connection.query(query, [ email ], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
    const user = results[0];

    bcrypt.compare(password, user.password, function(err, isValid) {
      if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

      callback(null, {
        user_id: user.id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}
window.lowdefy.registerJsOperator('getLabel', getLabel);