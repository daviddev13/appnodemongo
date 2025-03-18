var express = require('express');
var router = express.Router();

const mongoose = require('./conexion');
const Usuario = require('./modusuario'); 

// Ruta para crear usuario
router.post('/', async (req, res) => {
   console.log('Subiendo nuevo usuario');  
   const direccion = {
      calle: req.body["direccion[calle]"],
      ciudad: req.body["direccion[ciudad]"],
      pais: req.body["direccion[pais]"],
      codigo_postal: req.body["direccion[codigo_postal]"]
  };
  const nuevoUsuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      edad: parseInt(req.body.edad),
      fecha_creacion: req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : new Date(),
      direcciones: [direccion]
  });
  
  //console.log(nuevoUsuario);  
  //console.log(direccion); 
  // Verificar campos vacíos
  if (
        !nuevoUsuario.nombre || 
        !nuevoUsuario.email || 
        !direccion.calle || 
        !direccion.ciudad || 
        !direccion.pais || 
        !direccion.codigo_postal
     ) {
        return res.status(400).send('Datos incompletos');
     }
   //Verificar país
   const validCountries = ["Colombia", "Peru", "Mexico", "Chile", "Venezuela", "Argentina", "Brasil", "Bolivia", "Panama"]; // Lista de países válidos
   if (!validCountries.includes(direccion.pais)) {
      return res.status(400).json({ error: "El país no es válido." });
   }

   // Verificar código postal sea un número
   if (isNaN(direccion.codigo_postal)) {
      return res.status(400).json({ error: "El código postal debe ser un número." });
   }

  try {
    // Verifica email ya existe
    const usuarioExistente = await Usuario.findOne({ email: nuevoUsuario.email });
    if (usuarioExistente) {
      return res.status(400).send('El email ya existe.');
    }
    else {// Guardar en DB
        await nuevoUsuario.save();
        res.redirect('http://localhost:3000/usuarios');  
    }
    } catch (error) {
            console.error('Error al guardar:', error);
            res.status(500).send('Error al guardar:');
    }
});

router.get('/', async (req, res) => {
    console.log('Cargando usuarios...');
    const limite = parseInt(req.query.limit) || 8;
    const pagina = parseInt(req.query.page) || 1;

    try {
        const usuarios = await Usuario.find()
            .limit(limite)
            .skip((pagina - 1) * limite);

        const totalUsuarios = await Usuario.countDocuments();
        const totalPaginas = Math.ceil(totalUsuarios / limite);

        const paginaAnterior = pagina > 1 ? pagina - 1 : null;
        const paginaSiguiente = pagina < totalPaginas ? pagina + 1 : null;

        // Generar lista de páginas con información de clases CSS
        const paginas = [];
        for (let i = 1; i <= totalPaginas; i++) {
            paginas.push({
                numero: i,
                activo: i === pagina // Indica si la página actual está activa
            });
        }

        res.render('listusers', {
            usuarios,
            paginaActual: pagina,
            totalPaginas,
            paginaAnterior,
            paginaSiguiente,
            limite,
            paginas // Lista de páginas con estado predefinido
        });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

// Ruta para conseguir ususario x Id
router.get('/:id', async  (req, res) =>{
   const id = req.params.id; 
   console.log(`Buscando user Id: ${id}`);
   try {
          const usuarios = await Usuario.findById(id); 
          if (usuarios) {
              //console.log('usuario obtenido:', usuarios);
              res.render('formuser',{usuarios})
          } else {
              res.status(404).send({ error: 'Usuario no encontrado' }); // Manejo cuando no se encuentra
          }
   } catch (error) {
       console.error('Error al buscar usuario:', error);
       res.status(500).json({ error: 'Error al obtener el usuario' });
   }
  });

// Ruta para actualizar usuario x ID
router.put('/:id', async function (req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    console.log(`ID a actualizar: ${id}`);
    //console.log('Datos recibidos para actualizar:', datosActualizados);
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Ruta para eliminar usuario x Id
router.delete('/:id', async function (req, res) {
   const id = req.params.id; 
   console.log(`ID a eliminar: ${id}`);
    try {
        const resultado = await Usuario.findByIdAndDelete(id);
        if (resultado) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para clasificar usuarios x ciudad
router.get('/buscar/:ciudad', async (req, res) => {
   const ciudad = req.params.ciudad;
   console.log(`Ciudad a buscar en BD: ${ciudad}`);
    try {
        // Encontrar usuarios x ciudad
        const usuarios = await Usuario.find({ "direcciones.ciudad": ciudad });
        if (usuarios.length > 0) {
            res.render('listusers',{usuarios})
        } else {
            res.status(404).json({ message: `No se encontraron usuarios en la ciudad ${ciudad}` });
        }
    } catch (error) {
        console.error('Error al buscar usuarios por ciudad:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
