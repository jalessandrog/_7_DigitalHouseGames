module.exports = function(sequelize,dataTypes){
    let alias= 'Categoria';
    let cols= {
       idCategoria: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(30)
       }  
    }
    let config = {
        tableName: 'categoria',
        timestamps: false
    }
    let Categoria = sequelize.define(alias,cols,config);

    return Categoria;
}