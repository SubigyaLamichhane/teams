const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    // const user = getUserByEmail(email)
    // if (user == null) {
    //   return done(null, false, { message: 'No user with that email' })
    // }

    // try {
    //   if (await bcrypt.compare(password, user.password)) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false, { message: 'Password incorrect' })
    //   }
    // } catch (e) {
    //   return done(e)
    // }
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        res.status(200).json(user)
      } catch (err) {
        res.status(500).json(err)
      }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize