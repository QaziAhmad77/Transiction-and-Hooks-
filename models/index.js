const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("qazi","root","",{
    host: "localhost",
    logging: false,
    pool: {  //  improve performance of our application through pool becuase we must make a new connection if we fetch some data from the data base. So pool store the previous connection and for future its use when need it.
        max: 5,   // maximum connections
        min: 0,   // minimum connections
        acquire: 30000,
        idle: 10000
    },
    dialect: "mysql"
});

try{
    sequelize.authenticate();
    console.log("Connected to database");
}catch(error){
    console.log("Failed to connect to database",error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize,DataTypes);
db.contact = require("./contact")(sequelize,DataTypes);
db.image = require("./image")(sequelize,DataTypes);
db.video = require("./video")(sequelize,DataTypes);
db.comment = require("./comment")(sequelize, DataTypes);

db.user.hasMany(db.contact, {as: 'contactDetails'});  
db.contact.belongsTo(db.user);

db.image.hasMany(db.comment, {
    foreignKey: "commentTableId",
    constraints: false,
    scope: {
        commentableType: 'image'
    }
})
db.comment.belongsTo(db.image, {
    foreignKey: 'commentableId', 
    constraints: false,
});

db.video.hasMany(db.comment, {
    foreignKey: "commentTableId",
    constraints: false,
    scope: {
        commentableType: 'video'
    }
})
db.comment.belongsTo(db.video, {
    foreignKey: 'commentableId', 
    constraints: false,
});

db.sequelize.sync({ force: false});

module.exports = db;