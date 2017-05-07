import React, { Component } from 'react';

import Slider from '../simpleComponents/Slider'
import DbItem from '../DbItem'

class DbsList extends Component {
    
    render() {
        const {url,api,user,users} = this.props;
        const passDownProps = {url,api,user,users}

        return (
            <Slider className='DbsList'>
                { this.props.databases.map((db)=>
                    <DbItem key={db.name} {...db} {...passDownProps}/>
                    )
                }
            </Slider>
        );
    }
}

export default DbsList;