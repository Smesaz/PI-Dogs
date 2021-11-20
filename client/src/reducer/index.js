import Breeds from "../components/Breeds/Breeds";

const initialState={
    Breeds:[],
    Only_Breeds:[],
    Temperaments:[],
    loading:true,
    Temps_selected:[],
    Breeds_Details:[],
};

const breeds_reucer = (state=initialState, action) =>{
    switch (action.type) {
        case "GET_BREEDS":
            let get_breeds=action.payload.map(b=>{
                b.temperament+=",";
                return b;
            });
            let arra=state.Temps_selected;
            let get_breeds_all=arra.length>0?get_breeds.filter(b=>{
                let cont=0;
                for (let i = 0; i < arra.length; i++) {
                        if(b.temperament&& b.temperament.includes(arra[i]+",")) cont=cont+1;
                    }
                    if(cont===arra.length) return b;   
                }):get_breeds
            return {
                ...state, 
                Breeds:get_breeds_all.length>0?get_breeds_all:[{name:"Breed not found"}],
                Only_Breeds:action.payload.map((b)=>b.name),
            }
        case "GET_BREEDS_NAME":
            let get_breeds_name=action.payload.map(b=>{
                b.temperament+=",";
                return b;
            })
            let array=state.Temps_selected;
            let Breeds_name=array.length>0?get_breeds_name.filter(b=>{
                let cont=0;
                for (let i = 0; i < array.length; i++) {
                        if(b.temperament&& b.temperament.includes(array[i]+",")) cont=cont+1;
                    }
                    if(cont===array.length) return b;   
                }):get_breeds_name


            return {
                ...state, Breeds:Breeds_name.length>0?Breeds_name:[{name:"Breed not found"}],
            }
        case "GET_TEMPERAMENTS":
            let temps= action.payload.sort()
            return {
                ...state, Temperaments:temps,
            }
        case "GET_BREEDS_NAME_FAILURE":
            return {
                ...state, Breeds:action.error
            }
        case "GET_FILTER_TEMPERAMENT_BREEDS":
            let arr=[...state.Temps_selected];
            arr.includes(action.payload)?
            arr=[...arr]:
            arr=[...arr,action.payload];
            let newBreed=state.Breeds.filter(b=>b.temperament && b.temperament.includes(action.payload+",")   
                );
            return{
                ...state, 
                Breeds: newBreed.length<1?[{name:"Breed not found"}]:newBreed,
                Temps_selected:arr,
            }
        case "RESET_FILTER_TEMPERAMENT_BREEDS":
            let ar=[...state.Temps_selected];
            let new_ar=ar.filter(t=>t!==action.payload);
            
            let newBreed_2=state.Breeds.filter(b=>{
                let cont=0;
                for (let i = 0; i < new_ar.length; i++) {
                        if(b.temperament&& b.temperament.includes(new_ar[i]+",")) cont=cont+1;
                    }
                    if(cont===new_ar.length) return b;   
                });
            return {
                ...state,
                Temps_selected:new_ar,
                Breeds:newBreed_2.length>0||new_ar.length!==0?newBreed_2.length>0?newBreed_2:[{name:"Breed not found"}]:state.Breeds,
            }
        case "RESET_ALL_FILTER_TEMPERAMENTS":
            return{
                ...state, Temps_selected:[],
            }
        case "ORDER_BY":
            let typeorder=action.payload;
            let Breeds_order=[...state.Breeds];
            switch (typeorder) {
                case "Ascending":
                    let asc=Breeds_order.map(b=>b.name).sort();
                    let Asc=asc.map(n=>{
                        let arr=[];
                        Breeds_order.find(b=>{if(b.name===n) arr.push(b)})
                        return arr;
                    });
                    Breeds_order=[...Asc].flat();
                    break;
                case "Descending":
                    let desc=Breeds_order.map(b=>b.name).sort().reverse();
                    let Desc=desc.map(n=>{
                        let arr=[];
                        Breeds_order.find(b=>{if(b.name===n) arr.push(b)})
                        return arr;
                    });
                    Breeds_order=[...Desc].flat();
                    break;
                case "Form":
                    let form_breeds=Breeds_order.filter(b=>b.id>1000);
                    Breeds_order=[...form_breeds];
                    break;
                case "Server":
                    let api_breeds=Breeds_order.filter(b=>b.id<500);
                    Breeds_order=[...api_breeds];
                    break;
                case "minW":
                    let min_weight=Breeds_order.map(b=>{if(b.weight_min&&b.weight_min!=="NaN"&&b.weight_max)return b.weight_min}).sort((mn,mx)=>mn-mx)
                    let min_w=min_weight.filter((w,id)=>min_weight.indexOf(w)===id);
                    let min_W=min_w.map(w=>{
                        let arr=[];
                        Breeds_order.find(b=>{if(b.weight_min&&b.weight_max&&b.weight_min===w) arr.push(b)})
                        return arr;
                    });
                    Breeds_order=[...min_W].flat();
                    break;
                case "maxW":
                    let max_weight=Breeds_order.map(b=>{if(b.weight_max)return b.weight_max}).sort((mn,mx)=>mx-mn)
                    let max_w=max_weight.filter((w,id)=>max_weight.indexOf(w)===id);
                    let max_W=max_w.map(w=>{
                        let arr=[];
                        Breeds_order.find(b=>{if(b.weight_max&&b.weight_max===w) arr.push(b)})
                        return arr;
                    });
                    Breeds_order=[...max_W].flat();
                    break;
                default:
                    break;
            }
            return{
                ...state,
                Breeds:Breeds_order.length>0?Breeds_order:[{name:"Breed not found or another error"}],
            }
        case "BREED_DETAILS":  
            return{
                ...state,
                Breeds_Details: action.payload,
            }
        default:
            return state;
    }
}
export default breeds_reucer;