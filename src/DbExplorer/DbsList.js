import React, { Component } from 'react';

import DbItem from '../DbItem'

class DbsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            databases: []
        };
    }
    
    componentDidMount() {
        this.props.api
        .get('_all_dbs')
        .then(({data}) => this.setState({
            databases: data.filter( db => db !== '_users')
        }));
    }
    
    render() {
        const {url,api,user,users} = this.props;
        const passDownProps = {url,api,user,users}

        const wrapStyles = { style: { display:'inline-block', textAlign: 'left'}}

        return (
            <div {...wrapStyles}>
                { this.state.databases.map((name)=>
                    <DbItem key={name} name={name} {...passDownProps}/>
                    )
                }
            </div>
        );
    }
}

export default DbsList;