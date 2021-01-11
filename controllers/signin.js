const handleSignin = (req, res, db, bcrypt) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json('Email and password required for signin.');
  }

  db.select('email', 'hash')
  .from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    if (bcrypt.compareSync(req.body.password, data[0].hash)) {
      return db.select('*')
      .from('users')
      .where({email: data[0].email})
      .then(user => {
        res.json(user[0]);
      })
      .catch(err => res.status(400).json('Error finding user.'));
    } else {
      res.status(400).json('Error finding user.');
    }
  })
  .catch(err => res.status(400).json('Error finding user.'));
}

module.exports = {
  handleSignin: handleSignin
}