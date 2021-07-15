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
            photo_idx:0
        }
        this.handleSlide = this.handleSlide.bind(this)
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

    render() { 
        var {photos, content} = this.props;
        var {photo_idx} = this.state;
        return ( 
            <div className="diary-item">
                <button className="delete-button"><AiFillDelete/></button>
                <div className="image-slide">      
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