import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router';
import FormAds from '../components/formAds';
import { config } from '../config';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            title: "",
            contents: "",
            redirect: false,
            selectedFile: null
        }
    }

    componentDidMount(){
        axios.get(config.api_url+"/api/v1/ads/"+this.props.params.id)
        .then((res)=>{
            this.setState({title:res.data.results.ad.title})
            this.setState({contents:res.data.results.ad.contents})
        })
    }

    updateAd(data){
        axios.put(config.api_url+"/api/v1/ads/update/"+this.props.params.id,data)
        .then((res)=>{
            console.log(res)
            if(res.data.status === 200){
                this.setState({redirect: true})
            }
        })
    }


    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.state.selectedFile === null){
            let data = {
                title: this.state.title,
                contents: this.state.contents,
                url: "no-pict.jpg"
            }
            this.updateAd(data)
        }else{
            const formData = new FormData();
            formData.append("image", this.state.selectedFile);
            axios.post(config.api_url+"/api/v1/ads/pict",formData)
            .then((res)=>{
                if(res.data.status === 200){
                    let data = {
                        title: this.state.title,
                        contents: this.state.contents,
                        url: res.data.url
                    }
                    this.updateAd(data)
                }
            })
        }
    }
    render() { 
        if(this.state.redirect){
            return (
                <Navigate to={"/admin"}/>
            )
        }
        return (  
            <div>
                <FormAds submit={this.handleSubmit} title={this.state.title} contents={this.state.contents} titleChange={(e)=>this.setState({title:e.target.value})} contentsChange={(e)=>this.setState({contents: e.target.value})}/>
            </div>
        );
    }
}
 
export default Edit;