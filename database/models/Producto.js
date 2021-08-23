module.exports = function(sequelize,dataTypes){
    let alias= 'Producto';
    let cols= {
       idProductos: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       nombre:{
           type:dataTypes.STRING(200)
       },
       rating:  {
           type: dataTypes.INTEGER
       },
       precio:{
           type: dataTypes.INTEGER
       },
       breveDescripcion:{
           type: dataTypes.TEXT('medium')
       },
       informacionAdicional:{
           type: dataTypes.TEXT('long')
       },
       imagenPrincipal:{
           type:dataTypes.STRING(200)
       },
       idConsola:{
           type: dataTypes.INTEGER
       },
       idPlataforma:{
           type: dataTypes.INTEGER
       },
       idCategoria:{
           type: dataTypes.INTEGER
       }
        
    }
    let config = {
        tableName: 'productos',
        timestamps: false
    }
    let Producto = sequelize.define(alias,cols,config);

    return Producto;
}