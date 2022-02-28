import axios from 'axios';
import {config} from '../config';
// On met toutes les fonction lié à notre api dans un fichié api

//On charge toutes les annonces
export function loadAds(){
    return axios.get(config.api_url+'/api/v1/ads')
    .then((response)=>{
        return response.data.results.ads;
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

//On charge juste une annonce 
export function loadOneAds(id){
    return axios.get(config.api_url+'/api/v1/ads/'+id)
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
}

