const { Router } = require('express');
const videgamesRouter = require("./videogamesRoutes")
const genresRouter = require("./genresRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/videogames", videgamesRouter);
router.use("/genres", genresRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
