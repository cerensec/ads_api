import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router';
import { config } from '../config';
import { loadAds } from '../helpers/ads';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            ads: []
        }
    }

    componentDidMount(){
        this.onLoadAds()
    }

    onLoadAds() {
        loadAds()
        .then((res)=>{
            console.log(res)
            this.setState({ads:res})
        })
    }
    render() { 
        return (  
            <div>
                <h1>Admin</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ads.map((ad)=>{
                            return (
                                    <tr>
                                        <td>{ad.title}</td>
                                        <td><Link to={'/edit/'+ad.Id}>Edit</Link></td>
                                        <td><button onClick={(e)=>{
                                            axios.delete(config.api_url+"/api/v1/ads/delete/"+ad.Id)
                                            .then((res)=>{
                                                if(res.data.status === 200){
                                                    console.log("deleted")
                                                }
                                            })
                                        }}>Delete</button></td>
                                    </tr>
                            )
                        })}                   
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Admin;