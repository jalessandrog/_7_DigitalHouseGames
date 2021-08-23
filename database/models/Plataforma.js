module.exports = function(sequelize,dataTypes){
    let alias= 'Plataforma';
    let cols= {
       idPlataforma: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(30)
       }  
    }
    let config = {
        tableName: 'plataforma',
        timestamps: false
    }
    let Plataforma = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto,{
            as:'productos03',
            foreignKey:'idPlataforma'
        })
    }

    return Plataforma;
}