import React, {useEffect} from "react";
import './Details.css';
import Nav from "../Nav/Nav";
import { useParams } from "react-router";
import {getBreedDetails} from '../../actions/index';
import {connect} from 'react-redux';

const Details=({getBreedDetails,Details_Breed})=>{
        const Breed_id=useParams().id;
        useEffect(async() => {
            await getBreedDetails(Breed_id)
        }, [Breed_id])
    return(
        <div className='container_details'>
            <Nav/>
            <div className='line_rigth'></div>
            <div className='breed_details'>
                {Details_Breed.map(b=>{
                    return b?(
                        <div>
                        <img src={b.image} alt={`imagen de ${b.name}`}></img>
                        <h3>{b.name}</h3>
                        <h4>Temperaments:</h4>
                        <p>{b.temperament}</p>
                        <div className='weight'>
                        {b.weight_min && b.weight_min!=="NaN"?<h4>Weight min: </h4>:<br></br>}
                        {b.weight_min && b.weight_min!=="NaN"?<p>{b.weight_min}Kg &nbsp;&nbsp;&nbsp;&nbsp;</p>:<br></br>}
                        {b.weight_max?<h4>Weight max: </h4>:<br></br>}
                        {b.weight_max?<p>{b.weight_max}Kg</p>:<br></br>}
                        </div>
                        <div className='heigth'>
                        {b.height_min && b.height_min!=="NaN"?<h4>Height min: </h4>:<br></br>}
                        {b.height_min && b.height_min!=="NaN"?<p>{b.height_min}m &nbsp;&nbsp;&nbsp;&nbsp;</p>:<br></br>}
                        {b.height_max?<h4>Height max: </h4>:<br></br>}
                        {b.height_max?<p>{b.height_max}m</p>:<br></br>}
                        </div>
                        <div className='more_details'>
                        {b.life_span&& b.life_span!=="NaN"?<h4>Life Span:</h4>:<br></br>}
                        {b.life_span&& b.life_span!=="NaN"?<p>{b.life_span}</p>:<br></br>}
                        {b.bred_for?<h4>Bred for:</h4>:<br></br>}
                        {b.bred_for?<p>{b.bred_for}</p>:<br></br>}
                        {b.breed_group?<h4>Breed Group:</h4>:<br></br>}
                        {b.breed_group?<p>{b.breed_group}</p>:<br></br>}
                        </div>
                        </div>
                    ):<h1>Error when was charge the Breed...</h1>
                })}
            </div>
        </div>
    )
}

const mapDispatchToProps={
    getBreedDetails,
}
const mapStateToProps= (state)=>{
    return{
        Details_Breed: state.Breeds_Details,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);