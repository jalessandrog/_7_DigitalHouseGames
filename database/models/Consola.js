module.exports = function(sequelize,dataTypes){
    let alias= 'Consola';
    let cols= {
       idConsola: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(30)
       }  
    }
    let config = {
        tableName: 'consola',
        timestamps: false
    }
    let Consola = sequelize.define(alias,cols,config);

    return Consola;
}