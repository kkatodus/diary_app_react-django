import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { api_base_url } from '../pages/Resource';
import {AiFillDelete} from "react-icons/ai"

import "../styles/item.css"

class DiaryItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        var {photos, content} = this.props;
        return ( 
            <div className="diary-item">
                <button className="delete-button"><AiFillDelete/></button>
                <div className="image-slide">                
                {photos.map(photo=>{
                    return(
                        <img className="diary-image" src={api_base_url+photo.image}></img>
                    )
                    
                })}
                </div>

                
                <div className="diary-descript">
                    <h3>{content}</h3>
                   
                </div>
                
            </div>         
         );
    }
}
 
export default DiaryItem;