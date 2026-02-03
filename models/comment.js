module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('comments',{
        articleId:{type:DataTypes.INTEGER},
        author:{type:DataTypes.STRING},
        text:{type:DataTypes.STRING},
        likes:{type:DataTypes.STRING}
    },{timestamps:true});

    Comment.associate = Model => {
        Comment.belongsTo(Model.articles);


    }
    return Comment;
}
