const { response, request } = require('express');
const { validationResult }= require('express-validator');

const validarCampos = ( req, res, next ) =>{
  const errors = validationResult(req);
 
  if(!errors.isEmpty()){
   //  return res.status(400).json(errors); // devuelve el array completo
    return res.status(400).json(errors.errors[0]);
  }
  next();
}

module.exports = {
  validarCampos
}