const db = require("../models");
const config = require("../config/config");
const Sinistre = db.sinistre;
const Op = db.Sequelize.Op;

exports.uploadImage = async (req, res) => {
    const sinistre = {
        typeSin: req.body.typeSin,
        lon: req.body.lon,
        lat: req.body.lat,
        image: config.baseUrl+""+req.file.path,
        UserId: req.decoded.id
    };

    await Sinistre.create(sinistre)
        .then(data => {
            res.send(data);
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










