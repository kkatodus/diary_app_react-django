import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapState2Props } from '../other/Resource';

class LandingPage extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var {nav_active} = this.props; 
        return ( 
        
            <div className={nav_active?"page-container":"page-container full-page"}>
                <h1>Landing Page</h1>

            </div>
        );
    }
}
 
export default connect(mapState2Props,{})(LandingPage);