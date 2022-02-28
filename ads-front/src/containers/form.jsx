import React from 'react';
import FormAds from '../components/formAds';
import { config } from '../config';
import axios from 'axios';
import { Navigate } from "react-router"


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            contents: "",
            redirect: false,
            selectedFile: null
        }
    }

    saveAd(data){
        axios.post(config.api_url+"/api/v1/ads/save",data)
        .then((res)=>{
            if(res.data.status === 200){
                this.setState({redirect: true})
            }
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        if(this.state.selectedFile === null){
            let data = {
                title: this.state.title,
                contents: this.state.contents,
                url: "no-pict.jpg"
            }
            this.saveAd(data)
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
                    this.saveAd(data)
                }
            })
        }
    }

    render() { 
        if(this.state.redirect){
            return (
                <Navigate to={"/"} />
            )
        }
        return (  
            <FormAds submit={this.handleSubmit} titleChange={(e)=>this.setState({title:e.target.value})} contentsChange={(e)=>this.setState({contents: e.target.value})} urlChange={(e)=>this.setState({selectedFile: e.target.files[0]})} />
        );
    }
}
 
export default Form;