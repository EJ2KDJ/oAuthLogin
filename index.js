require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');

//middlewawre to check if user is logged in (protects routes)
function isLoggedIn(req, res, next) {
 req.user ? next() : res.sendStatus(401);
}

const app = express();

// session middleware (must come before passport.initialize + passport.session)
// stores session info in a cookie so login can persist
app.use(session({ secret: "cats" }));

app.use(passport.initialize());
// connects passport to the session
app.use(passport.session());

//Homepage to login
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});


//Login get access token with google
app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
);

// callback route to protected page if successful or else send to failure
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);


//failure message route
app.get('/auth/failure', (req, res) => {
    res.send('something went wrong');
});


// Protected route only allowed after user is authenticated
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});


//logout callback, destroys session and user is kicked out of protected route
app.get('/logout', (req, res) =>{
    req.logout((err) => {
        if (err) return res.send('Error logging out');
        req.session.destroy();
        res.send('Goodbye!');
    });
})

app.listen(4000, () => console.log(`listening on: 4000`));