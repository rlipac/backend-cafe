 const { Router } = require('express');
//const { check } = require('express-validator');
const  checkAuth  = require('../middlewares/authenticar')

 const router = Router();

 const { Login, perfil } =require('../controllers/authController.js')

 router.post('/login', Login  )

 router.get("/perfil", checkAuth, perfil)




module.exports = router;