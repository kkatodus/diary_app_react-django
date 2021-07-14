import React, { Component,Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {BiLogOut} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"

import {navData} from "../other/Resource"
import { mapState2Props } from '../other/Resource';
import { navShowAction,navHideAction } from '../actions';

import "../styles/base.css"
import "../styles/nav.css"

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected:0,
        }
        this.toggeleNav = this.toggeleNav.bind(this)
    }
    toggeleNav(){
        this.setState({
            ...this.state,
            active:!this.state.active
        })
    }

    render() { 
        var {nav_active} = this.props;
        var {selected} = this.state
        
        return (
            <Fragment>
                <button onClick={()=>this.props.navShowAction()} id="nav_show_button" className={nav_active?"":"active"}><GiHamburgerMenu/></button>
                <nav className={nav_active ? "nav-container active":"nav-container"}>
                    <ul className="nav-items">
                        <li className="nav-item" onClick={()=>this.props.navHideAction()}>
                            <AiOutlineClose className="nav-icon"/>
                            
                        </li>
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
            </Fragment>
            
            
         );
    }
}
 
export default connect(mapState2Props,{navHideAction,navShowAction})(Nav);