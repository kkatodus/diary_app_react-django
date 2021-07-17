import React, { Component, Fragment} from 'react';
import { Redirect } from 'react-router';

import {AiOutlineClose,AiTwotoneSave} from "react-icons/ai"
import {MdPhotoCamera} from "react-icons/md"

import ImagePreview from './ImagePreview';
import { api_base_url } from '../pages/Resource';

import "../styles/base.css"
import "../styles/editing.css"
import "../styles/creating.css"

class EditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            content:this.props.content,
            deleted_photo_ids:[],
            photos:this.props.photos,
            new_photos:[],
            changed:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
        this.handleImageDelete = this.handleImageDelete.bind(this)
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

    handleImageDelete(key, category){
        switch(category){
            case "new":
                var new_images = [...this.state.new_photos]
                new_images.splice(key,1)
                this.setState({
                    ...this.state,
                    new_photos:new_images,
                    changed:true
                })
                break;
            case "old":
                console.log(key)
                var deleted_photos = [...this.state.deleted_photo_ids]
                deleted_photos.push(key)
                var photos = [...this.state.photos].filter(photo=>photo.id !== key)
                this.setState({
                    ...this.state,
                    deleted_photo_ids:deleted_photos,
                    photos:photos,
                    changed:true
                })
                break;
        }

    }

    handleImageUpload(e){
        var files = Array.from(e.target.files);
        var new_files = [...this.state.new_photos]
        files.forEach(file=>new_files.push(file))
        this.setState({
            ...this.state,
            new_photos:new_files,
            changed:true
            }
        )   
    }

    handleSubmit(e){
        e.preventDefault();
        const csrftoken = this.getCookie("csrftoken")
    
        var formdata = new FormData();
        if(this.state.new_photos){
            Array.from(this.state.new_photos).forEach(file=>{
               formdata.append("new_photos",file)
            })
        }
        Array.from(this.state.deleted_photo_ids).forEach(removed_id=>{
            formdata.append("deleted_photo_ids",removed_id)
        })
        formdata.append("content",this.state.content);

        var request_headers = new Headers();
        request_headers.append("X-CSRFToken",csrftoken);
        
        var request_options = {
            method:"POST",
            headers:request_headers,
            body:formdata,
            redirect:"follow"
        }
        fetch(api_base_url+"/api/diary_detail/"+this.props.id,request_options)
        .then(response=>response.text())
        .then(result=>{
            this.props.onClose(true)
        })
        .catch(error=>console.log("error",error))

    }

    render() { 
        var {id} = this.props;
        var {content, new_photos, photos,changed} = this.state;
        var num_new_photos = new_photos.length
        var no_pic_message = photos.length !==0 | new_photos.length !== 0 ? "":<h3>NO PICTURES</h3>
        var image_previews = <div className="images-container">
                                {new_photos.reverse().map((image,idx)=>{
                                    var image_url = URL.createObjectURL(image)
                                    var image_idx = num_new_photos-(idx+1)
                                    return (
                                        <ImagePreview onDelete={()=>this.handleImageDelete(image_idx,"new")} key={idx} image_url={image_url}/>
                                    );
                                })}
                                {photos.map((image,idx)=>{
                                    var image_url = api_base_url + image.image
                                    return (
                                        <ImagePreview onDelete={()=>this.handleImageDelete(image.id,"old")} key={idx} image_url={image_url}/>
                                    );
                                })}
                            </div>
        var save_button =changed ? <button className="diary-save-button button" onClick={this.handleSubmit}><AiTwotoneSave/></button>:""
        return ( 
            <div onClick={(e)=>e.target.id==="background"? this.props.onClose(false):""} id="background" className="background-fill edit-background">
                <div className="bubble edit-bubble">
                    <AiOutlineClose className="bubble-close" onClick={()=>this.props.onClose(false)}/>
                    <div className="bubble-header">
                        <h1 className="bubble-title">Edit</h1>
                    </div>
                    <div className="bubble-pic-preview">
                            <button className="button photo-add-button" onClick={()=>{document.getElementById("image_input").click()}}><MdPhotoCamera/></button>
                            {no_pic_message}
                            {no_pic_message === "" ? image_previews:""}
                            <input type="file" id="image_input" className="image-input" accept="image/*" multiple={true} onChange={this.handleImageUpload}/>
                    </div>
                    <textarea className="diary-content-entry" value={content} onChange={(e)=>this.setState({...this.state, content:e.target.value,changed:true})} placeholder="your story..."></textarea>
                    {save_button}
                </div>
            </div>
        );
        
    }
}
 
export default EditForm;