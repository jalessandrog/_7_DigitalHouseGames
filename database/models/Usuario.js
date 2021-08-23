module.exports = function(sequelize,dataTypes){
    let alias= 'Usuario';
    let cols= {
       idUsuario: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(200)
       },
       apellidos:  {
           type:dataTypes.STRING(200)
       },
       email:{
           type:dataTypes.STRING(200)
       },
       password:{
           type:dataTypes.STRING(200)
       },
       cumpleanios:{
           type: dataTypes.DATE
       },
       avatar:{
           type:dataTypes.STRING(200)
       },
       idCategoriaU:{
           type: dataTypes.INTEGER
       }
        
    }
    let config = {
        tableName: 'usuarios',
        timestamps: false
    }
    let Usuario = sequelize.define(alias,cols,config);

    return Usuario;
}