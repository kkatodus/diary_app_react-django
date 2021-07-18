import React, { Component } from 'react';
import { connect } from 'react-redux';

import {BsPen} from "react-icons/bs"
import {AiOutlineUpload} from "react-icons/ai"
import {GiSaveArrow} from "react-icons/gi"

import { mapState2Props } from '../other/Resource';
import { navHideAction } from '../actions';

import woman_reading from "../static/woman_reading.jpg"

import "../styles/base.css"
import "../styles/landing.css"

class LandingPage extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.navHideAction()
    }
    render() {
        var {nav_active} = this.props; 
        var additional_classes = nav_active? "":" full-page"
        return ( 
        
            <div className={"page-container landing-container"+additional_classes}>
               <section className="title-section section">
                   <div className="section-bubble">
                        <img className="bubble-half half-image"src={woman_reading}/>
                        <h3 className="half-text">
                            This is a simple diary app
                        </h3>
                   </div>
               </section>
               <section className="secondary-section section">
                    <div className="section-bubble">
                        <BsPen className=" 
                        half-icon"/>
                        <div className="half-text">
                            <h2>Step 1</h2>
                            <h3>Write some great story</h3>
                        </div>
                    </div>
                    <div className="section-bubble">
                        <div className="half-text">
                            <h2>Step 2</h2>
                            <h3>Upload some pictures</h3>
                        </div>
                        <AiOutlineUpload className="half-icon"/>
                    </div>
                    <div className="section-bubble">
                        <GiSaveArrow className="half-icon"/>
                        <div className="half-text">
                            <h2>Step 3</h2>
                            <h3>Save your diary</h3>
                        </div>
                    </div>
               </section>

            </div>
        );
    }
}
 
export default connect(mapState2Props,{navHideAction})(LandingPage);