import React from 'react';
import { loadOneAds } from '../helpers/ads';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.onLoadAd()
    }

    onLoadAd(){
        loadOneAds(this.props.params.id)
    }
    render() { 
        return (  
            <div>

            </div>
        );
    }
}
 
export default Detail;