import React, {useState} from "react";
import './NewBreed.css';
import Nav from "../Nav/Nav";
import image_newbreed from "../../img/newbreed.jpg";
import {postbreed} from "../../actions/index";
import { connect } from "react-redux";

const NewBreed=({postbreed,Temperaments})=>{
    const [selectedTemps, setselectedTemps]= useState([]);
    const [input, setInput] = useState({
        name:'',
        life_span:'',
        weight_min:0,
        weight_max:0,
        temperament:[],
        height_min:0,
        height_max:0,
        image:image_newbreed,
    });
    const HandleInputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        });
    };
    const HandleOnSubmit = async(e)=>{
        e.preventDefault();
        await postbreed(input);
    }
    const HandleSelectedTemps =(e)=>{
        setselectedTemps(e.target.value);
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament:[...input.temperament,e.target.value],
            })
        }
    }
    const deleteTemp=(e)=>{
        let new_temps=input.temperament.filter(t=>t!==e.target.value);
        setInput({
            ...input,
            temperament:[...new_temps],
        }) 
    }


    return(
        <div>
            <Nav/>
            <div className='line_rigth'></div>
            <div className='Form_newBreed'>
                <form onSubmit={HandleOnSubmit}>
                    <label>Name</label>
                    <input required  placeholder='name...' type="text" name="name" value={input.name} onChange={HandleInputChange}/>
                    <label>Weigth</label>
                    <input required placeholder='min weigth...' type="number" name="weight_min" value={input.weight_min} onChange={HandleInputChange}/>
                    <input required placeholder='max weigth...' type="number" name="weight_max" value={input.weight_max} onChange={HandleInputChange}/>
                    <label>Heigth</label>
                    <input required placeholder='min heigth...' type="number" name="height_min" value={input.height_min} onChange={HandleInputChange}/>
                    <input required placeholder='max heigth...' type="number" name="height_max" value={input.height_max} onChange={HandleInputChange}/>
                    <label>Life Span</label>
                    <input required placeholder='life span...' type="text" name="life_span" value={input.life_sapn} onChange={HandleInputChange}/>
                    
                    <select onChange={HandleSelectedTemps} name='temperaments' value={selectedTemps}>
                        <option value="">Select Temperaments</option>
                        {Temperaments.map((t,id)=>{
                           return <option value={t} key={id}>{t}</option>
                        })}
                    </select>
                    <input className='submit_btn' type='submit' value='create'/>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps={
    postbreed,
}
const mapStateToProps=(state)=>{
    return{
        Temperaments:state.Temperaments,

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewBreed);