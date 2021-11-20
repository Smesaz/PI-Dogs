const { Temperament } = require('../db');
const {DB_Api_Dogs} = require('../controller/api_db');
const router = require('express').Router();

router.get('/', async(req,res)=>{
    try{
    const db_api_Dogs = await DB_Api_Dogs();
    const db_api_temperaments = db_api_Dogs.map(b=>b.temperament);
    const more_than_temps= db_api_temperaments.map(t=>t && t.split(', ')).flat() ;
    const repeated_temps=more_than_temps.filter(b=>{if(b) return b});
    const set_temps = new Set(repeated_temps)
    const unique_temps=[...set_temps];

    unique_temps.forEach(async(e)=>{
        await Temperament.findOrCreate({
            where: {name: e},
        })  
        });
    res.send(unique_temps);
    } catch (error){
        res.status(404).send(error);
    }
});

module.exports = router;