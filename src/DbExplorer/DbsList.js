import React, { Component } from 'react';

import Slider from '../simpleComponents/Slider'
import DbItem from '../DbItem'
import DbItemDisabled from '../DbItemDisabled' 

class DbsList extends Component {

    render() {
        const enabledDbs = [];
        const nonEnabledDbs = [];

        this.props.databases.forEach((db) => {

            db.couchAuth 
            ? enabledDbs.push(<DbItem key={db.name} {...db} {...this.props} />) 
            : nonEnabledDbs.push(<DbItemDisabled key={db.name} {...db} {...this.props} />)
        })

        // We just render enabled DBs first, and non enabled after
        return (
            <Slider className='DbsList'>
                { enabledDbs.concat(nonEnabledDbs)}
            </Slider>
        );
    }
}

export default DbsList;