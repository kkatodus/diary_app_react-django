import React, { Component } from 'react';
import { connect } from 'react-redux';

import {BsPencilSquare} from "react-icons/bs"


import { mapState2Props } from '../other/Resource';
import DiaryItem from '../components/DiaryItem';
import {api_base_url} from "../pages/Resource";
import CreateForm from '../components/CreateForm';
import EditForm from '../components/EditForm';

import "../styles/base.css"
import "../styles/item.css"
import "../styles/creating.css"


class DiaryList extends Component {
    constructor(props){
        super(props)
        this.state = {
            diaries:[],
            creating:false,
            editing:false,
        }

        this.fetchDiaries = this.fetchDiaries.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleDiaryEdit = this.handleDiaryEdit.bind(this)
    }
    componentDidMount(){
        this.fetchDiaries()
    }

    async fetchDiaries(){
        var fetch_url = api_base_url+"/api/diary_list/"

        var data = await fetch(fetch_url)
        var data_json = await data.json()
        this.setState({
            ...this.state,
            diaries:data_json
        })
          
    }

    handleModalClose(need_update){
        if (need_update){
            this.fetchDiaries()
            this.setState({...this.state, creating:false, editing:false})
        }else{
            this.setState({...this.state, creating:false, editing:false})
        }
        
    }

    handleDiaryEdit(id, images,content){
        this.setState({
            ...this.state,
            editing:{id:id, photos:images, content:content}
        })
    }

    render() {
        var {diaries,creating,editing} = this.state;
        var {nav_active} = this.props;
        var full_page_class = nav_active?"":" full-page"
        var create_form = creating ? <CreateForm onClose={(need_update)=>this.handleModalClose(need_update)}/>:""
        var edit_form = editing ? <EditForm {...editing} onClose={(need_update)=>this.handleModalClose(need_update)}/>:""

        return ( 
            <div className={"page-container item-container"+full_page_class}>
                {create_form}
                {edit_form}
                <button onClick={()=>this.setState({...this.state, creating:true})} className="button right-float-button creating-button"><BsPencilSquare/></button>
                {diaries.map(item=>{
                    var {id, photos, content} = item;
                    return(          
                        <DiaryItem key={item.id} {...item} onEdit={()=>this.handleDiaryEdit(id,photos,content)} onDelete={()=>this.fetchDiaries()}/>
                    )
                })}
            </div>
            
         );
    }
}
 
export default connect(mapState2Props, {})(DiaryList);