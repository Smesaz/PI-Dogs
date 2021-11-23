import React from "react";
import './Breed.css';
import { NavLink } from "react-router-dom";

const Breed = ({datos,reset,page}) =>{
    return(
        <div className={datos.weight_min||datos.weight_max?'container_Breed':'container_Breed_min'}>
           {datos.image? <NavLink to={`/details/${datos.id}`}><img src={datos.image} alt={`imagen de ${datos.name}`}/>
           </NavLink>:<br></br>}
            <h3>{datos.name.toUpperCase()}</h3>
            {datos.temperament||datos.weight_min||datos.weight_max?
            <br></br>:<input type='reset' value='Try Again' onClick={()=>reset()} />}
            {datos.temperament&& datos.temperament!=='undefined,'?datos.temperament!==','?<h4>Temperaments:</h4>:
            <br></br>:<br></br>}
            {datos.temperament&& datos.temperament!=='undefined,'?datos.temperament!==','?<p>{datos.temperament}</p>:<br></br>:<br></br>}
            <div className='weight'>
                {datos.weight_min && datos.weight_min!=="NaN"?<h4>Weight min: </h4>:<br></br>}
                {datos.weight_min && datos.weight_min!=="NaN"?<p>{datos.weight_min}Kg &nbsp;&nbsp;&nbsp;&nbsp;</p>:<br></br>}
                {datos.weight_max?<h4>Weight max: </h4>:<br></br>}
                {datos.weight_max?<p>{datos.weight_max}Kg</p>:<br></br>}
            </div>
        </div>
    )
}

export default Breed;