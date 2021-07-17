import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { api_base_url } from '../pages/Resource';
import {AiFillDelete} from "react-icons/ai"
import {IoIosArrowDropleftCircle,IoIosArrowDroprightCircle} from "react-icons/io"

import "../styles/item.css"

class DiaryItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            photo_idx:0,
            waiting_delete:false
        }
        this.handleSlide = this.handleSlide.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleSlide(direction){
        var num_photos = this.props.photos.length
        switch(direction){
            case "right":
                var new_idx = this.state.photo_idx + 1
                new_idx = new_idx > num_photos-1 ? 0:new_idx
                this.setState({...this.state, photo_idx:new_idx})
                break;
            case "left":
                var new_idx = this.state.photo_idx - 1 
                new_idx = new_idx < 0 ? num_photos-1:new_idx
                this.setState({...this.state, photo_idx:new_idx})
                break;
        }
    }

    handleDelete(){
        this.setState({...this.state, waiting_delete:true})
        var {id} = this.props;
        var request_headers = new Headers();
       
        
        var request_options = {
            method:"DELETE",
            headers:request_headers,
            redirect:"follow"
        };
        fetch(api_base_url+"/api/diary_detail/"+ id,request_options)
        .then(response=>response.text())
        .then(response=>{
           this.props.onDelete()
        })
        .catch(error=>console.log("error",error))
    }

    handleClick(e){
        var target_element_id = e.target.className;
        console.log(target_element_id)

    }

    render() { 
        var {photos, content} = this.props;
        var {photo_idx,waiting_delete} = this.state;
        if (waiting_delete){
            return(
            <div className="diary-item">
                <h1 className="deleting-placeholder">Deleting...</h1>
            </div>
            )
        }

        return ( 
            <div className="diary-item">
                <button className="delete-button" onClick={this.handleDelete}><AiFillDelete onClick={this.handleDelete}/></button>
                <div className="image-slide" id="slide">      
                <IoIosArrowDropleftCircle className="slide-arrow left-arrow" onClick={()=>this.handleSlide("left")}/>
                <IoIosArrowDroprightCircle onClick={()=>this.handleSlide("right")} className="slide-arrow right-arrow"/> 
                {photos.map((photo, idx)=>{
                    var active_class = idx === photo_idx? " active":""
                    return(
                        <img key={photo.id} className={"diary-image"+active_class} src={api_base_url+photo.image}></img>
                    )
                })}
                <h3 className="photo-counter">{photo_idx+1}/{photos.length}</h3>
                </div>
                <div className="diary-descript">
                    <h3>{content}</h3>
                </div>
                
            </div>         
         );
    }
}
 
export default DiaryItem;