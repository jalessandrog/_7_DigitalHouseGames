module.exports = function(sequelize,DataTypes){
    let alias= 'Categoria';
    let cols= {
       idCategoria: {
           type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:DataTypes.STRING(30)
       }  
    }
    let config = {
        tableName: 'categoria',
        timestamps: false
    }
    let Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto,{
            as:'productos01',
            foreignKey:'idCategoria'
        })
    }

    return Categoria;
}