const db = require("../models");
const decodeToken=require("../config/middleware");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Sinistre = db.sinistre;
const Op = db.Sequelize.Op;

exports.uploadImage = async (req, res) => {
     const baseUrl= "http://localhost:5000/"

    const sinistre = {
        typeSin: req.body.typeSin,
        lon: parseFloat(req.body.lon),
        lat: parseFloat(req.body.lat),
        imageUrl: baseUrl+""+req.file.path,
        consulted: false,
        UserId: 1
    };

    await Sinistre.create(sinistre)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the sinistre."
            });
        });
}


exports.getList = (req, res) => {
    Sinistre.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting list"
            });
        });
}

exports.findOne=(req,res)=>{
    Sinistre.findOne({ where: { id: req.params.id } }
    )
        .then(data => {
            res.status(200).json({
                user: data
            })
        })
        .catch((e) => {
            res.status(500).json({ msg: e });
        });
}













