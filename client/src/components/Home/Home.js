import React, {useState} from "react";
import {connect} from 'react-redux';
import './Home.css'
import {orderBreeds,getBreedsName,getfilterTemperamentBreeds,getBreeds,ResetfilterTemps,ResetAllfilterTemps} from '../../actions/index';
import Breeds from "../Breeds/Breeds";
import Nav from "../Nav/Nav";

const Home=({orderBreeds,ResetAllfilterTemps,Temps_selected,ResetfilterTemps,getBreeds,getBreedsName,Only_Breeds, Temperaments, Breeds_state,getfilterTemperamentBreeds})=>{
    const [input,setinput] = useState('');
    
    const HandleInputChange = (event)=>{       
        setinput(event.target.value);
        const breeds_filter= Only_Breeds.filter(b=>{if(b.toUpperCase().includes(event.target.value.toUpperCase())){
            return b;
        }});
        if(breeds_filter) getBreedsName(event.target.value);
        }
    
    const HandleInputReset = async()=>{
        ResetAllfilterTemps();
        if(input.length===0)await getBreeds();
        else{setinput('');}
    }
    
    const HandleTemperaments = async(event)=>{
        await getfilterTemperamentBreeds(event.target.name)
    }

    const ResetTemps = async(event)=>{
        if(input.length===0)await getBreeds();
        else{ await getBreedsName(input)}
        await ResetfilterTemps(event.target.name)
        if(input.length>0) await getBreedsName(input)
        if(input.length===0)await getBreeds();
    }
    const HandleOrders=async(event)=>{
        if(event.target.name==="Form"||event.target.name==="Server"){
            await getBreeds();
            await orderBreeds(event.target.name);   
        }else if(event.target.name==="FyS") await getBreeds();
        else{await orderBreeds(event.target.name);}
    }

    return(
        <div className='container_Home'>
            <Nav/>
            <div className='line_rigth'></div>
            <div className='container_search_and_breeds'>
                <div className='search_filter'>
                    <h3>Search Breed</h3>
                    <input placeholder='Breed name...' 
                    value={input}
                    onChange={(e)=>HandleInputChange(e)}
                    ></input>

                    <div className='temps_selected'>
                    {Temps_selected&&Temps_selected.map(t=>{
                        return (
                            <a name={t} onClick={(e)=>ResetTemps(e)}>
                            {t} (X)</a>
                        )
                    })}
                    </div>

                    <div className='dropdown'>
                    <button>FILTER TEMPERAMENTS</button>
                    <div className='dropdown-content'>
                        {Temperaments.map(t=>{
                            return (
                                <a name={t} onClick={(e)=>HandleTemperaments(e)}>{t}</a>
                            )
                        })}
                    </div>
                    </div>
                    <div className='content_order'>
                    <h3>Order By Name</h3>
                    <div className='content_order_buttns'>
                       <button name='Ascending' onClick={(e)=>HandleOrders(e)}>Ascending</button>
                       <button name='Descending' onClick={(e)=>HandleOrders(e)}>Descending</button>
                       <button name='Form' onClick={(e)=>HandleOrders(e)}>Form</button>
                       <button name='Server' onClick={(e)=>HandleOrders(e)}>Server</button>
                       <button name='FyS' onClick={(e)=>HandleOrders(e)}>Form & Server</button>
                    </div>
                    <h3>Order by Weight</h3>
                    <div className='content_order_buttns'>
                       <button name='minW' onClick={(e)=>HandleOrders(e)}>min Weight</button>
                       <button name='maxW' onClick={(e)=>HandleOrders(e)}>max Weight</button>
                    </div>
                    </div>
                </div>
                <div className='content_breeds'>
                <Breeds reset={HandleInputReset} input={input}/>:
                </div>
            </div>
        </div>
    )
}



const mapDispatchToProps={
    getBreedsName, 
    getfilterTemperamentBreeds,
    getBreeds,
    ResetfilterTemps,
    ResetAllfilterTemps,
    orderBreeds,
}
const mapStateToProps= (state)=>{
    return {
        Breeds_state: state.Breeds,
        Only_Breeds:state.Only_Breeds,
        Temperaments:state.Temperaments,
        Temps_selected:state.Temps_selected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;