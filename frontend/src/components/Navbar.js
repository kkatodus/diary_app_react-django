import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {BiLogOut} from "react-icons/bi"

import {navData} from "../other/Resource"
import { mapState2Props } from '../other/Resource';

import "../styles/base.css"
import "../styles/nav.css"

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected:0
        }
    }
    render() { 
        return (
            <nav className="nav-container">
                <ul className="nav-items">
                    {navData.map(item=>{
                        var {title, icon, link} = item
                        return(
                            <li key={title}>
                                <Link className="nav-item" to={link}>
                                {icon}
                                <h3 className="nav-item-name">{title}</h3>
                                </Link>
                            </li>
                        )
                    })}
                    <li id="logout_button" className="nav-item">
                        <BiLogOut className="nav-icon"/>
                        <h3 className="nav-item-name">Logout</h3>
                    </li>
                </ul>
            </nav>
            
            
         );
    }
}
 
export default connect(mapState2Props,{})(Nav);