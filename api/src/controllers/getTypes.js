const {Type} = require("../db")

const getTypes = async(req, res)=>{
    try{
        const tipos = await Type.findAll(
            {
                order: [['id', 'ASC']]
            }
        );
        // const success = {
        //     result: "success",
        //     prueba: "prueba getTypes"
        // }
        //res.status(200).json(success)
        const types = []
        tipos.forEach(element => {
            types.push(element.type)
        });
    res.status(200).json(types)

    }catch (error){
        //MANEJO DE ERRORES EN LA BASE DE DATOS 
      res.status(500).send(error)
  }
}
  module.exports = getTypes;