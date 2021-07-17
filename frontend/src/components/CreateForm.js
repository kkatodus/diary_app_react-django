import React, { Component } from 'react';
import { api_base_url } from '../pages/Resource';

import {AiOutlineClose } from "react-icons/ai"
import {FiPenTool} from "react-icons/fi"
import {MdPhotoCamera} from "react-icons/md"
import {AiTwotoneSave} from "react-icons/ai"

import "../styles/base.css"
import "../styles/creating.css"
import ImagePreview from './ImagePreview';


class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state={
            images:[],
            content:"",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this)
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

    handleImageUpload(e){
        var files = Array.from(e.target.files);
        var new_files = [...this.state.images]
        files.forEach(file=>new_files.push(file))
        this.setState({
            ...this.state,
            images:new_files
            }
        )   
    }

    handleDelete(key){
        var new_images = [...this.state.images]
        new_images.splice(key,1)
        this.setState({
            ...this.state,
            images:new_images
        })
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
                this.props.onClose(true)
            })
            .catch(error=>console.log("error",error))
    }

    render() { 
        var {images, content} = this.state;
        var num_images = images.length
        var no_pic_message = images.length !==0 ? "":<h3>NO PICTURES</h3>
        var image_previews = <div className="images-container">
                                {images.reverse().map((image,idx)=>{
                                    var image_url = URL.createObjectURL(image)
                                    var image_idx = num_images-(idx+1)
                                    return (
                                        <ImagePreview onDelete={()=>this.handleDelete(image_idx)} key={idx} image_url={image_url}/>
                                    );
                                })}
                            </div>
        var save_button = content !== "" ? <button className="diary-save-button button" onClick={this.handleSubmit}><AiTwotoneSave/></button>:""

        return (
            <div onClick={(e)=>e.target.id==="background"? this.props.onClose(false):""} id="background" className="background-fill create-background">
                <div className="bubble create-bubble">
                    <AiOutlineClose className="bubble-close" onClick={()=>this.props.onClose(false)}/>
                    <div className="bubble-header">
                        <h1 className="bubble-title">Write</h1>
                        <FiPenTool className="bubble-header-icon"/>
                    </div>
                    <div className="bubble-pic-preview">
                        <button className="button photo-add-button" onClick={()=>{document.getElementById("image_input").click()}}><MdPhotoCamera/></button>
                        {no_pic_message}
                        {no_pic_message === "" ? image_previews:""}
                        <input type="file" id="image_input" className="image-input" accept="image/*" multiple={true} onChange={this.handleImageUpload}/>
                    </div>
                    <textarea className="diary-content-entry" value={content} onChange={(e)=>this.setState({...this.state, content:e.target.value})} placeholder="your story..."></textarea>
                    {save_button}
                </div>
            </div>
        );
    }
}
 
export default CreateForm;