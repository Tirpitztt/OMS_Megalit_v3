module.exports = (sequelize,DataTypes)=>{
    const Article = sequelize.define('articles',{
        author:{type:DataTypes.STRING},
        title:{type:DataTypes.STRING},
        text:{type:DataTypes.STRING},
        status:{type:DataTypes.STRING},
        likes:{type:DataTypes.INTEGER}
    },{timestamps:true});

    Article.associate = Model => {

        Article.hasMany(Model.comments,{
            foreignKey:'articleId',
            onDelete:'cascade'
        });

    }
    return Article;
}
