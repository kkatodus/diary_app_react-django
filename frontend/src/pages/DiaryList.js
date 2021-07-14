import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapState2Props } from '../other/Resource';
import DiaryItem from '../components/DiaryItem';
import {api_base_url} from "../pages/Resource"

import "../styles/base.css"
import "../styles/item.css"


class DiaryList extends Component {
    constructor(props){
        super(props)
        this.state = {diaries:[]}

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
        var {diaries} = this.state;
        var {nav_active} = this.props;
        var full_page_class = nav_active?"":" full-page"

        return ( 
            <div className={"page-container item-container"+full_page_class}>
                
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