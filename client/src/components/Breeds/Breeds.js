import React, {useState,useEffect} from "react";
import './Breeds.css'
import {getBreeds,getTemperaments, loading} from '../../actions/index';
import { connect } from "react-redux";
import Breed from '../Breed/Breed';
import img_loading from '../../img/dog2.gif';

const Breeds = ({getBreeds, getTemperaments,Breeds_state,input,reset,loading,waiting})=>{
    const [paginated, setPaginated] = useState(0);

    useEffect(async() => {
        if(input.length===0) {
            await loading()
            await getBreeds();
            await getTemperaments();
        } 
    }, [input.length]);

    useEffect(async()=>{
        setPaginated(0);
    },[Breeds_state]);
    // const nextpage = ()=>{
    //     if(Breeds_state.length>paginated+8) setPaginated(paginated+8);
    // } 
    // const previouspage = () => {
    //     if(paginated>0)setPaginated(paginated-8);
    // }
    const firstpage=()=> setPaginated(0);
    const lastpage=()=> {
        let con=0;
        while((Breeds_state.length-con)%8!==0){
            con++;
        }
        if(con){
            setPaginated(Breeds_state.length-con);
        }else setPaginated(Breeds_state.length-8);
    }
    const number_page=(paginated+8)/8;
    const Handler_number_page= (event)=>{
        let value=(event.target.value*8)-8;
        if(Breeds_state.length>value && value>=0) setPaginated(value);
    }
    const SetupPagination_l=(number,limit,arr=[])=>{
        number--;
        if(number>0&&limit>0){
            arr=[number,...arr];
            limit--;
           return SetupPagination_l(number,limit,arr);
        }else return arr;
    }
    const SetupPagination_r=(number,limit,breeds,arr=[])=>{
        number++;
        if(number<=Math.ceil(breeds/8)&&limit>0){
            arr=[...arr,number];
            limit--;
            return SetupPagination_r(number,limit,breeds,arr);
        }else return arr;
    }
    
    const filtered_breeds= (Breeds_state)=> Breeds_state.slice(paginated,paginated+8);

    return (
        <div>
            <div className='buttons_paginated'>
                {/* first page */}
                <button onClick={firstpage} disabled={number_page===1}>
                &lt;&lt;
                </button>
                {SetupPagination_l(number_page,2).map(n=>{
                    return(
                        <button
                           onClick={Handler_number_page} value={n}>
                               {n}
                        </button>
                    )
                })}
                {/* number page */}
                <button onClick={Handler_number_page} value={number_page}  className='selected_page'>
                {number_page}
                </button>
                {SetupPagination_r(number_page,2,Breeds_state.length).map(n=>{
                    return (
                        <button
                            onClick={Handler_number_page} value={n}>
                                {n}
                            </button>
                    )
                })}
                {/* last page */}
                <button onClick={lastpage} disabled={number_page===Math.ceil(Breeds_state.length/8)}>
                &gt;&gt;
                </button>
            </div>
        <div className='container_Breeds'>

            {waiting?<img src={img_loading} className='loading_img' alt='loading'/>
            :filtered_breeds(Breeds_state).map((b,id)=>{ return <Breed page={number_page} key={id} datos={b}reset={reset}/>})}
        </div>
        <div className='buttons_paginated'>
                {/* first page */}
                <button onClick={firstpage} disabled={number_page===1}>
                &lt;&lt;
                </button>
                {SetupPagination_l(number_page,2).map(n=>{
                    return(
                        <button
                           onClick={Handler_number_page} value={n}>
                               {n}
                        </button>
                    )
                })}
                {/* number page */}
                <button onClick={Handler_number_page} value={number_page}  className='selected_page'>
                {number_page}
                </button>
                {SetupPagination_r(number_page,2,Breeds_state.length).map(n=>{
                    return (
                        <button
                            onClick={Handler_number_page} value={n}>
                                {n}
                            </button>
                    )
                })}
                {/* last page */}
                <button onClick={lastpage} disabled={number_page===Math.ceil(Breeds_state.length/8)}>
                &gt;&gt;
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps={
    getBreeds, 
    getTemperaments,
    loading,
}
const mapStateToProps= (state)=>{
    return {
        Breeds_state: state.Breeds,
        Breeds_Details:state.Breeds_Details,
        waiting:state.loading,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
