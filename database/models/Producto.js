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

    Producto.associate = function(models){
        Producto.belongsToMany(models.Usuario,{
            foreignKey:'idProductos',
            otherKey:'idUsuarios',
            as:'usuarios02',
            through:'Producto_usuario',
            timestamps: false
        })
        Producto.belongsTo(models.Categoria,{
            as:'categoria',
            foreignKey:'idCategoria'
        })
        Producto.belongsTo(models.Plataforma,{
            as:'plataforma',
            foreignKey:'idPlataforma'
        })
        Producto.belongsTo(models.Consola,{
            as:'consola',
            foreignKey:'idConsola'
        })

    }


    return Producto;
}