module.exports = function(sequelize,dataTypes){
    let alias= 'Categoriau';
    let cols= {
       idCategoriaU: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(30)
       }  
    }
    let config = {
        tableName: 'categoriau',
        timestamps: false
    }
    let Categoriau = sequelize.define(alias,cols,config);
    Categoriau.associate = function(models){
        Categoriau.hasMany(models.Usuario,{
            as:'usuarios',
            foreignKey:'idCategoriaU'
        })
    }

    return Categoriau;
}