module.exports = (sequelize, DataTypes)=>{
  const Comment = sequelize.define("comments",{
    title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING
  });
  return Comment;
}
  