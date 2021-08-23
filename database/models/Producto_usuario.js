module.exports = function(sequelize,dataTypes){
    let alias= 'Producto_Usuario';
    let cols= {
       idProductoUsuarios: {
           type: dataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       idProductos:{
           type:dataTypes.INTEGER
       },
       idUsuarios:{
           type:dataTypes.INTEGER
       }  
    }
    let config = {
        tableName: 'productos_usuarios',
        timestamps: false
    }
    let Productos_Usuarios = sequelize.define(alias,cols,config);

    Productos_Usuarios.associate = function(models){
        Productos_Usuarios.belongsTo(models.Producto,{
            foreignKey:'idProductos'
        })
    }
    Productos_Usuarios.associate = function(models){
        Productos_Usuarios.belongsTo(models.Usuario,{
            foreignKey:'idUsuarios'
        })
    }

    return Productos_Usuarios;
}