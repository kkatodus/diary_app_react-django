import React, { Component } from 'react';
import {AiFillDelete} from "react-icons/ai"

import "../styles/base.css"
import "../styles/creating.css"

class ImagePreview extends Component {
    constructor(props){
        super(props)
        this.state = {
            hovering:false
        }
    }
    render() { 
        var {hovering} = this.state;
        var delete_button_class = hovering ? " preview-hover":""
        return ( 
            <div onMouseEnter={()=>this.setState({...this.state, hovering:true})} onMouseLeave={()=>this.setState({...this.state, hovering:false})} onClick={()=>this.props.onDelete()} className="preview-image">
                <img src={this.props.image_url}/>
                <div className={"image-delete-button"+delete_button_class}><AiFillDelete/></div>
            </div>
         );
    }
}
 
export default ImagePreview;