import React, { Component } from 'react';
import axios from 'axios';

export default class DbExplorer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return <pre><code>
            {JSON.stringify(this.props,null,2)}
        </code>
        </pre>
    }
}