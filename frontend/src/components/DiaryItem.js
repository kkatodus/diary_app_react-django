import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { api_base_url } from '../pages/Resource';


class DiaryItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        var {photos, content} = this.props;
        return ( 
            <div className="diary-detail">
                <img className="diary-image" src={api_base_url+photos[0].image}></img>
                <div >
                    <h3>{content}</h3>
                   
                </div>
                
            </div>         
         );
    }
}
 
export default DiaryItem;