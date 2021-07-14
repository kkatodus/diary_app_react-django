import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapState2Props } from '../other/Resource';
import DiaryItem from '../components/DiaryItem';
import {api_base_url} from "../pages/Resource"


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

        return ( 
            <div className={nav_active?"page-container":"page-container full-page"}>
                
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