import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {config} from '../config';
//on importe la fonction ajax pour charger les annonces
import { loadAds } from '../helpers/ads';
//Page de présentation
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            ads: []
        }
    }
     //chargement des annonces au chargement du component
    componentDidMount(){
        this.onLoadAds()
        
    }
    
    //chargement des annonces
    onLoadAds() {
        loadAds()
        .then((res)=>{
            console.log(res)
            this.setState({ads:res})
        })
    }
    
    render(){
        return (
            <div className="home-page">
                <h1>Home Page</h1>
                {this.state.ads.length !== 0 && <div>
                    {this.state.ads.map((ad)=>{
                        return (
                            <section key={ad.title}>
                                <img src={config.pict_url+ad.url} alt={ad.url}/>
                                <h5>{ad.title}</h5>
                            </section>
                        )
                    })}
                </div>}
            </div>
        )
    }
    
}

export default Home;