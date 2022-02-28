import React from 'react';
import { loadOneAds } from '../helpers/ads';
import { config } from '../config';
import { Link } from 'react-router-dom';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ad: null
        }
    }

    componentDidMount(){
        this.onLoadAd()
        console.log(this.state.ad)
    }

    onLoadAd(){
        loadOneAds(this.props.params.id)
        .then((res)=>{
            console.log(res)
            this.setState({ad:res})
        })
    }
    render() { 
        return (  
            <div>
                <h1>Detail page</h1>
                {this.state.ad !== null && <div>
                    <img style={{width:"90%"}} src={config.pict_url+this.state.ad.url} alt={this.state.ad.url} />
                    <h3>{this.state.ad.title}</h3>
                    <p>{this.state.ad.contents}</p>
                    <Link style={{paddingBottom:"10px",textDecoration:"none"}} to={'/'}>Return to home</Link>
                </div>}
            </div>
        );
    }
}
 
export default Detail;