const express=require("express");

const app = express();

var db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.\nThe database is ready!");
});


//Middleware
app.use(express.json());

const userRoute = require("./routes/user");

app.use("/user",userRoute);

const Port=process.env.PORT || 5000;

app.route("/").get((req,res)=>res.json("Welcome to the web service of Firefighters"));

app.listen(Port,()=>console.log(`Your server is running on port ${Port}`));