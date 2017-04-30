import React, { Component } from 'react';
import MdPerson from 'react-icons/lib/md/person'
import MdVerifiedUser from 'react-icons/lib/md/verified-user'

class User extends Component {
    render() {
        const {name, admin} = this.props;

        return (
            <div>
                <MdPerson/>{ admin && <MdVerifiedUser/>} {name}
            </div>
        );
    }
}

export default User;