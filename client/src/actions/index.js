import axios from 'axios';

export const getBreeds= ()=>{
    return async(dispatch)=>{
         return await axios.get(`http://localhost:3002/dogs`)
        .then( json=>{
           return dispatch({type: "GET_BREEDS", payload: json.data});
        }) 
    };
}
export const getBreedsName=(name)=>{
        return async(dispatch)=>{
        return await axios.get(`http://localhost:3002/dogs?name=${name}`)
                .then(json=> dispatch({type: "GET_BREEDS_NAME", payload: json.data}))
            .catch(error=> dispatch({type: "GET_BREEDS_NAME_FAILURE", error:[{name:"Breed not found"}]}))
           }
        
}

export const getTemperaments=()=>{
        return async(dispatch)=>{
        let json= await axios.get(`http://localhost:3002/temperament`)
           return dispatch({type: "GET_TEMPERAMENTS", payload: json.data});
        }
}

export const getfilterTemperamentBreeds=(payload)=>{
    return {
        type:"GET_FILTER_TEMPERAMENT_BREEDS",
        payload,
    }
}
export const ResetfilterTemps=(payload)=>{
    return {
        type:"RESET_FILTER_TEMPERAMENT_BREEDS",
        payload,
    }
}
export const ResetAllfilterTemps=()=>{
    return{
        type:"RESET_ALL_FILTER_TEMPERAMENTS"
    }
}
export const orderBreeds=(payload)=>{
    return {
        type:"ORDER_BY",
        payload
    }
}
export const getBreedDetails=(id)=>{
    
    return async(dispatch)=>{
    let json= await axios.get(`http://localhost:3002/dogs/${id}`)
       return dispatch({type: "BREED_DETAILS", payload: json.data});
    }
}
export const postbreed=(breed)=>{
return async(dispatch)=>{
    try{
        return axios.post(`http://localhost:3002/dog`, breed)
    } catch (er){
        console.log('Error POST/dog',er);
        }
    }
}
export const loading=()=>{
    return{
        type:"LOAD",
    }
}
