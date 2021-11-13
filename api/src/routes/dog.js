const { Breed, Temperament } = require('../db');
const router = require('express').Router();

router.post("/", async (req, res) => {
  try{
    const {
      name,
      life_span,
      temperament,
      height_min,
      height_max,
      weight_min,
      weight_max,
      image,
    } = req.body;
    if(!name || !temperament || !height_min || !height_max || !weight_min ||!weight_max){
      return res.status(400).send('Params not registered');
    }
    const new_Breed = await Breed.create({
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      image,
    });
    //encontrar los temperamentos que me llegen por body(formulario)
    //los temperamentos los encuentro en Temperament,
    const db_temps = await Temperament.findAll({
            where: { name: temperament },
        });
    await new_Breed.addTemperaments(db_temps);
    res.send(`Breed ${name} created`);
    } catch (error){
      res.status(404).send(error);
    }
  });


  module.exports=router;