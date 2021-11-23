import React, {useState} from "react";
import './NewBreed.css';
import Nav from "../Nav/Nav";
import image_newbreed from "../../img/newbreed.jpg";
import {postbreed} from "../../actions/index";
import { connect } from "react-redux";

const NewBreed=({postbreed,Temperaments,Only_Breeds})=>{
    const [selectedTemps, setselectedTemps]= useState([]);
    const [errors, seterrors] = useState(false)
    const [input, setInput] = useState({
        name:'',
        life_span:'',
        weight_min:'',
        weight_max:'',
        temperament:[],
        height_min:'',
        height_max:'',
        image:image_newbreed,
    });
    
    const HandleInputChange = async(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        });
        validate_name(e.target.value);
        
    };
    const HandleOnSubmit = async(e)=>{
        e.preventDefault();
        await postbreed(input);
        alert('Breed Created Successfully')
    }
    const HandleSelectedTemps =(e)=>{
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament:[...input.temperament,e.target.value],
            });
            setselectedTemps([...selectedTemps,e.target.value]);
        }
    }
    const deleteTemp=(e)=>{
        let new_temps=input.temperament.filter(t=>t!==e.target.name);
        setInput({
            ...input,
            temperament:[...new_temps],
        })
        setselectedTemps([...new_temps]); 
    }
    const validate_name=(input)=>{
        if(Only_Breeds.find(b=>b.toUpperCase()===input.toUpperCase())) seterrors(true)
        else{seterrors(false);}
    }

    return(
        <div>
            <Nav/>
            <div className='line_rigth'></div>
            <div className='Form'>
            <div className='Form_newBreed'>
                <form onSubmit={HandleOnSubmit}>
                    <label>Name*</label>
                    <input required  placeholder='name...' type="text" name="name" value={input.name} onChange={HandleInputChange}/>
                    {errors?<p>Breed already exists</p>:<br/>}
                    <br/>
                    <br/>
                    <label>Weigth*(Kg)</label>
                    <input required placeholder='min weigth...' min='1' max={input.weight_max-1} type="number" name="weight_min" value={input.weight_min} onChange={HandleInputChange}/>
                    <input required placeholder='max weigth...' min='1' type="number" name="weight_max" value={input.weight_max} onChange={HandleInputChange}/>
                    <br/>
                    <br/>
                    <br/>
                    <label>Heigth*(m)</label>
                    <input required placeholder='min heigth...' min='1' max={input.height_max-1} type="number" name="height_min" value={input.height_min} onChange={HandleInputChange}/>
                    <input required placeholder='max heigth...' min='1' type="number" name="height_max" value={input.height_max} onChange={HandleInputChange}/>
                    <br/>
                    <br/>
                    <br/>
                    <label>Life Span*(years)</label>
                    <input required placeholder='# years' type="text" name="life_span" value={input.life_sapn} onChange={HandleInputChange}/>
                    <br/>
                    <br/>
                    <br/>
                    <select onChange={HandleSelectedTemps} name='temperaments' value={selectedTemps}>
                        <option value="">Select Temperaments</option>
                        {Temperaments.map((t,id)=>{
                           return <option value={t} key={id}>{t}</option>
                        })}
                    </select>
                    <div className='selected_temps'>
                        {selectedTemps.map(t=>{
                            return <a name={t} onClick={deleteTemp}>{t}</a>
                        })}
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <input className='submit_btn' type='submit' value='CREATE'disabled={errors} />
                </form>
            </div>
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
        Only_Breeds:state.Only_Breeds,

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewBreed);