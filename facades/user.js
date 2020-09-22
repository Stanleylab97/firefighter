const JWT = require('jsonwebtoken');
const db = require("../models");
const User = db.users;
const { JWT_SECRET } = require('../config/config');

signToken = user => {
    return JWT.sign({
        iss: 'StanleyLab97',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const method = req.body.method;
        const email=req.body.email;
        const tel=req.body.tel;
        const password=req.body.password;
        // Check if there is a user with the same email
        let foundUser = await User.findOne({ where: {"email": email}});
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        if (!foundUser && method ==="local") {
            // Let's merge them?
            
           const newUser = {
                method: method,
                email: email,
                tel:tel,
                password: password
            };
            await User.create(newUser)
                .then(data => {
                    // Generate the token
                    const token = signToken(newUser);
                    
                    // Respond with token
                    
                    res.status(200).json({
                        msg: "Utilisateur créé via login-password",
                        token: token
                    });
                    
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                });
            
        }

    },

    signIn: async (req, res, next) => {
        // Generate token
        const user={
            email:req.body.email,
            password: req.body.password};
        const token = signToken(user);
        /* res.cookie('token', token, {
            httpOnly: true
        }); */
        res.status(200).json({ 'token': token});
    },

    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        // console.log('I managed to get here!');
        res.json({ success: true });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log('req.user:',req.user);
        const token = signToken(req.user);
        res.status(200).json({'token': token});
    },

    linkGoogle: async (req, res, next) => {
        res.json({
            success: true,
            method: req.body.method,
            message: 'Successfully linked account with Google'
        });
    },

    unlinkGoogle: async (req, res, next) => {
        // Delete Google sub-object
        if (req.body.method) {
            req.body.method = undefined
        }
        // Remove 'google' from methods array
        const googleStrPos = req.user.methods.indexOf('google')
        if (googleStrPos >= 0) {
            req.method.splice(googleStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({
            success: true,
            method: req.method,
            message: 'Successfully unlinked account from Google'
        });
    },

  
    dashboard: async (req, res, next) => {
       
        res.json({
            secret: "resource",
            methods: req.method
        });
    },

    checkAuth: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ success: true });
    }
}

/* const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const config=require("../config/config");
const jwt=require('jsonwebtoken');



// Create and Save a new User
exports.create = (req, res) => {
    console.log('Inside registration');

    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password      
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Login a  User 
exports.login = (req, res) => {

    User.findOne({ where: { email: req.body.email } })
        .then(function (user){
            if (user === null) {
                res.status(403).json("Ce utilisateur n'existe pas");
            }
            if (user.password === req.body.password) {

                let token=jwt.sign({username:user.username,id:user.id},config.key,{expiresIn:"1h"});
                res.status(200).json({
                    token: token,
                    msg: "success" 
                });
            } else {
                console.log(user);
                res.status(403).json("Mot de passe incorrect");
            } 
        })
         .catch((e) => {
             res.status(500).json({ msg: e });
         });
};

// Find a single User with an id
exports.getUser = (req, res) => {

    User.findOne({ where: { email: req.body.email } }
    )
     .then(data => {
            res.status(200).json({
                user: data
            })
     })
    .catch((e) => {
            res.status(500).json({ msg: e });
    });

};

// Update a User by the id in the request
exports.patch = async (req, res) => {
    console.log('inside update');
    try {
        const userCollection = await User.findAll({
            where: { username: req.params.username }
        });

        if (userCollection) {
            const updatedUser = await User.update({ password: req.body.password },
                { where: { username: req.params.username } });
            res.status(201).send({ "msg": req.params.username + " account updated successfully" })
        }
        else { res.status(404).send("User Not Found"); }
    }
    catch (e) {
        res.status(500).send(e);
    }

}


// Delete a User the specified id in the request
exports.delete = async (req, res) => {
    try {
        const userCollection = await User.findAll({
            where: { username: req.params.username }
        });

        if (userCollection) {
            await User.destroy({ where: { username: req.params.username } });
            res.status(200).send({ "msg": req.params.username + " deleted" })
        }
        else { res.status(404).send("User Not Found"); }
    }
    catch (e) {
        res.status(500).send(e);
    }
};



 */
