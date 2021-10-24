### Semana : 2-8 de agosto de 2021

    - 5 de agosto de 2021
        ¿Qué se hizo?:
        Diseño responsivo en el sitio web
        Fusión de css en un solo archivo 

        Problemas presentados:
        Vista "Product Detail" con errores en diseño (css) al implementarse en el archivo css principal

        ¿Qué se va a hacer?
        Solucionar problema de estilo/diseño en la vista "Product Detail"
        Avanzar en el CRUD

    - 7-8 de agosto de 2021
        ¿Qué se hizo?:
        Funcionalidad al 100% del formulario de creación
        Funcionalidad al 90% de la lista de todos los productos
        Se solucionó el problema de estilo/diseño en la vista "Product Detail"
        Creación de archivo JSON con información de usuario


        Problemas presentados:
        ----

        ¿Qué se va a hacer después?
        Automatizar el product detail
        Habilitar funciones de put y delete
        Agregar imagenes en la lista de todos los productos
        Avanzar en sprint 5


        
### Semana : 9-15 de agosto de 2021

    - 9-10 de agosto de 2021
        ¿Qué se hizo?:
        Formulario para registrar funcionando : muestra middlewares y guarda el usuario en el archivo JSON
        Formulario login funcionando : muestra middlewares, muestra error si las contraseñas no coinciden y si sí coinciden se muestra inicio con nombre del usuario.


        Problemas presentados:
        Errores en la funcionalidad de mostrar el nombre del usuario logeado 

        ¿Qué se va a hacer después?
        Mejorar la funcionalidad de mostrar el nombre del usuario logeado 
        Activar funcionalidad de recordar usuario ( Cookies y middlewares) - Entregable Opcional 7
        Implementar rutas de huéspedes y de usuarios - Entregable 8
        

### Semana : 16-22 de agosto de 2021
        ¿Qué se hizo?:
        Implementación del método put y delete en la sección de productos que permite actualizar la información de un producto o eliminar un producto.
        Implementación de rutas de huéspedes y usuarios. Se agregaron middlewares de session para especificar a que rutas se tiene acceso siendo usuario logueado o si es un usuario que aún no se ha registrado.
        Se mejoró el diseño del formulario para registrar/editar producto y agregar sus estilos de css al css principal
        Se corrigió el error que no guardaba el rol de usuario al crear un nuevo usuario
        Se implementarón los métodos put y delete para editar información de usuario o borrar usuario.

        Problemas presentados:
        Errores en la funcionalidad de mostrar el nombre del usuario logeado en la página de inicio
        Una vez iniciada sesión no se puede "salir de la sesión" a menos que se reinicie el servidor 

        ¿Qué se va a hacer después?
        Mejorar la funcionalidad de mostrar el nombre del usuario logeado en el index
        Implementar "cerrar sesión" para que el usuario pase de logueado a invitado/normal.
        Mejorar el formato y diseño del carrito de compras
        Implementar función recordar usuario

### Semana : 23-29 de agosto de 2021
        ¿Qué se hizo?:
        Se realizó el diagrama de base de datos de los productos, el cual se tomará como base para el script de structura.
        Se creó el script de estructura para crear las tablas y las relaciones de los productos
        

        Problemas presentados:
        Problemas en la función recordar usuario
        

        ¿Qué se va a hacer después?
        Agregar botón de añadir productos
        Validaciones para usuarios compradores y usuarios administradores
        Implementar delete desde sequelize para la base de datos

        
### Semana : 30 de agosto de 2021   - 6 de septiembre de 2021
      ¿Qué se hizo?:
        Se implemento ver perfil, editar usuario, ver lista de usuarios con Base de Datos

        

        Problemas presentados:
        Error al crear usuario con base de datos
        

        ¿Qué se va a hacer después?
        Agregar botón de añadir productos
        Validaciones para usuarios compradores y usuarios administradores
        Implementar delete desde sequelize para la base de datos
          

### Semana : 7 - 13 de septiembre de 2021
        ¿Qué se hizo?:
                -Agregar botón de añadir productos

                -CRUD de usuarios con Base de datos: registrar usuario (create), actualizar información de usuario  (update), eliminar usuario (destroy)
                
                -CRUD de productos con Base de datos: actualizar información de productos (update), eliminar productos (destroy)


        Problemas presentados:
                -Usuario nuevo se guarda en la base de datos y se puede apreciar la nueva tupla en MySQL Workbench pero al intentar iniciar sesión con este nuevo usuario, no se loguea porque no parece existir en la base de datos.

                -Error al intentar actualizar producto (update) : UnhandledPromiseRejectionWarning: SequelizeForeignKeyConstraintError: Cannot add or update a child row: a foreign key constraint fails (`dhg_db`.`productos`, CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consola` (`idConsola`))
        

        ¿Qué se va a hacer después?
        Validaciones para usuarios compradores y usuarios administradores
        Implementar Carrito de Compras Dinamico con Base de Datos   

### Semana : 14 - 20 de septiembre de 2021
        ¿Qué se hizo?:
                -Se corrigió el error que no permitía acceder con un nuevo usuario almacenado en la base de datos
                -CRUD de usuarios con Base de datos: Autenticar usuario usando la base de datos
                -Actualización de middlewares con base de datos
                -Implementación de middleware para Administrador



        Problemas presentados:
                -Error al intentar actualizar producto (update) : UnhandledPromiseRejectionWarning: SequelizeForeignKeyConstraintError: Cannot add or update a child row: a foreign key constraint fails (`dhg_db`.`productos`, CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consola` (`idConsola`))
                -Error de prueba: Al intentar acceder con una contraseña incorrecta o cuenta no existente en la base de datos, la interfaz no muestra los errores y permanece cargando.
        

        ¿Qué se va a hacer después?
        Implementar Carrito de Compras Dinamico con Base de Datos   

### Semana : 21 - 27 de septiembre de 2021
        ¿Qué se hizo?:
                -Se corrigió el error al intentar actualizar un producto utilizando update.
                -Se corrigió el mensaje de error que ocasionaba el middleware que validaba si el usuario se había autenticado
                -Se corrigió el error que provocaba que el sitio se detuviera y no mostraba los errores de validación si se ingresaba una cuenta de correo no existente en la base de datos
        

        ¿Qué se va a hacer después?
                Implementar Carrito de Compras Dinamico con Base de Datos
                Iniciar con sprint 7

### Semana : 15 - 17 de octubre de 2021

        ¿Qué se hizo?:
                -Se implementaron las validaciones en el front-end para el Login
        
        ¿Qué se va a hacer después?
                Implementar las validaciones en el front-end para el Register
                Implementar las validaciones en el front-end y back-end para los forms de productos (Registrar producto, etc)

### Semana : 18-25 de octubre de 2021
        ¿Qué se hizo?:
                -Se implementaron las validaciones en el front-end para el Login
                -Se implementaron las validaciones en el front-end para la creación de cuenta
                -Se implementaron las validaciones en el front-end para la modificación de información de usuarios
                -Se implementaron las validaciones en el back-end para la modificación de información de usuarios
                -Se implementaron las validaciones en el back-end para la creación y modificiación de productos
        
        ¿Qué se va a hacer después?
                -Implementar las validaciones en el front-end para los forms de productos (Registrar producto, etc)
                -Iniciar la última sprint de la certificación