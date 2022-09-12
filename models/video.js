module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define("videos", {
        title: DataTypes.STRING,
        text: DataTypes.STRING
    });
    return Video;
}