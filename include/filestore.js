var Sequelize = require("sequelize")

//Our beloved model
var Songs = sequelize.define('Songs', {
    id: {type: Sequelize.INTEGER, autoIncrement: true },
    title: Sequelize.STRING,
    album: Sequelize.STRING,
    artist: Sequelize.STRING,
    duration: Sequelize.STRING,
    genre: Sequelize.STRING,
    year: Sequelize.STRING,
    albumart: Sequelize.STRING
});

export.storeSong = function(song,callback){
    
}