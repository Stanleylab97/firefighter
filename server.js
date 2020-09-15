const express=require("express");

const app = express();

const db = require("./models");



//Middleware
app.use(express.json());

const userRoute = require("./routes/user");
const sinistreRoute = require("./routes/sinistre");
//Only on dev mode||Remove existing files from uploads dir
var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
        require('./config/rm_files');
        db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.\nThe database is ready!");
        });
        break;
    case 'prod':
        db.sequelize.sync().then(() => {
            console.log("The database is ready!");
        });
        break;
}

app.use("/users",userRoute);
app.use("/sinistres", sinistreRoute);
app.use("/uploads/",express.static("uploads"));

const Port=process.env.PORT || 5000;

app.route("/").get((req,res)=>res.json("Welcome to the web service of Firefighters"));

app.listen(Port,()=>console.log(`Your server is running on port ${Port}`));