const db = require("../models");
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

                let token=jwt.sign({username:req.body.email},config.key,{expiresIn:"1h"});
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

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};



// Find a single User with an id
exports.getUser = (req, res) => {

    User.findAll({ where: { email: req.body.email } }
    )
        .then(data => {
            res.status(200).json({
                data: data
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
        console.log('check');
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



