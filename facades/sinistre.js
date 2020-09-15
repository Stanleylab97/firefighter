const db = require("../models");
const Sinistre = db.sinistre;
const Op = db.Sequelize.Op;

exports.uploadImage = async (req, res) => {
    const sinistre = {
        typeSin: req.body.typeSin,
        lon: req.body.lon,
        lat: req.body.lat,
        image: req.file.path,
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
    Sinistre.findAll({});
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










