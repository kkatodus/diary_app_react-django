import React, { Component } from 'react';
import { connect } from 'react-redux';

import {BsPencilSquare} from "react-icons/bs"


import { mapState2Props } from '../other/Resource';
import DiaryItem from '../components/DiaryItem';
import {api_base_url} from "../pages/Resource";
import CreateForm from '../components/CreateForm';

import "../styles/base.css"
import "../styles/item.css"
import "../styles/creating.css"


class DiaryList extends Component {
    constructor(props){
        super(props)
        this.state = {
            diaries:[],
            creating:false
        }

        this.fetchDiaries = this.fetchDiaries.bind(this)
    }
    componentDidMount(){
        this.fetchDiaries()
    }

    fetchDiaries(){
        var fetch_url = api_base_url+"/api/diary_list/"

        fetch(fetch_url)
        .then(data=>data.json())
        .then(data=>this.setState({diaries:data}))        
    }
    render() {
        var {diaries,creating} = this.state;
        var {nav_active} = this.props;
        var full_page_class = nav_active?"":" full-page"
        var create_form = creating ? <CreateForm onClose={()=>this.setState({...this.state, creating:false})}/>:""

        return ( 
            <div className={"page-container item-container"+full_page_class}>
                {create_form}
                <button onClick={()=>this.setState({...this.state, creating:true})} className="button right-float-button creating-button"><BsPencilSquare/></button>
                {diaries.map(item=>{
                    return(
                                    
                        <DiaryItem key={item.id} {...item}/>
                    )
                })}
            </div>
            
         );
    }
}
 
export default connect(mapState2Props, {})(DiaryList);