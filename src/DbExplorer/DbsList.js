import React, { Component } from 'react';

import Slider from '../simpleComponents/Slider'
import DbItem from '../DbItem'
import DbItemDisabled from '../DbItemDisabled' 

class DbsList extends Component {

    render() {
        const { url, api, user, users } = this.props;
        const passDownProps = { url, api, user, users }
        const enabledDbs = [];
        const nonEnabledDbs = [];

        this.props.databases.forEach((db) => {

            db.couchAuth 
            ? enabledDbs.push(<DbItem key={db.name} {...db} {...passDownProps} />) 
            : nonEnabledDbs.push(<DbItemDisabled key={db.name} {...db} {...passDownProps} />)
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