import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { api_base_url } from '../pages/Resource';

import {AiOutlineClose } from "react-icons/ai"
import { BsPencilSquare } from 'react-icons/bs';
import {FiPenTool} from "react-icons/fi"

import "../styles/base.css"
import "../styles/creating.css"


class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state={
            images:null,
            content:"",
            redirect:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this);
        
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleChange(e){
        var edited = e.target.name
        if (edited === "content"){
            this.setState({
                ...this.state,
                content:e.target.value,
                
            })
        }else if (edited === "image"){
            console.log(e.target.files)
            this.setState({
                ...this.state,
                images:e.target.files
            })
        }
       
    }

    handleSubmit(e){
        e.preventDefault();
        const  csrftoken = this.getCookie("csrftoken")

        var formdata = new FormData()
        Array.from(this.state.images).forEach(file=>{formdata.append("image",file)}
        )
        formdata.append("content",this.state.content) 

        var request_headers = new Headers();
        request_headers.append("X-CSRFToken",csrftoken)

        var request_options = {
            method: "POST",
            headers:request_headers,
            body: formdata,
            redirect:"follow",
        }
        fetch(api_base_url+"/api/diary_list/", request_options)
            .then(response=>response.text())
            .then(result=>{
                console.log(result)
                this.setState({
                    ...this.state,
                    redirect:"",
                })
            })
            .catch(error=>console.log("error",error))
    }

    render() { 
        var {redirect,images, content} = this.state;
        var no_pic_message = images ? "":<h3>NO PICTURES</h3>

        return (
            <div onClick={(e)=>e.target.id==="background"? this.props.onClose():""} id="background" className="background-fill create-background">
                <div className="bubble create-bubble">
                    <AiOutlineClose className="bubble-close" onClick={()=>this.props.onClose()}/>
                    <div className="bubble-header">
                        <h1 className="bubble-title">Write</h1>
                        <FiPenTool className="bubble-header-icon"/>
                    </div>
                    <div className="bubble-pic-preview">
                        {no_pic_message}
                    </div>
                </div>
            
            </div>
        );
    }
}
 
export default CreateForm;