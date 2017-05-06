import React, { Component } from 'react';
import { Form, Select } from 'react-form'
import MenuItem from 'material-ui/MenuItem';

import SelectField from '../material-react-form/SelectField';
import {OkButton} from '../simpleComponents/plus'


class GrantUserToDb extends Component {

    makeMenuItem(item) {

        return (
            <MenuItem
                key={item.value}
                value={item.value}
                primaryText={item.name}
            />
        );
    }

    render() {
        const users = Object.keys(this.props.users);
        const roles = [
            { name: 'Member', value: 'members' },
            { name: 'Admin', value: 'admins' },
        ];
        const usersAsOptions = users
            .map(u => ({ name: u, value: u }))
            .map(this.makeMenuItem);
        const rolesAsOptions = roles.map(this.makeMenuItem);

        return (
            <Form
                onSubmit={this.props.onSubmit}
                defaultValues={{role:roles[0].value}}
            >
                {({ submitForm }) => (
                    <form onSubmit={submitForm}>
                        <label htmlFor="name">User</label>
                        <SelectField field='name' floatingLabelText='Name' children={usersAsOptions} />
                        <SelectField field='role' floatingLabelText='Role' children={rolesAsOptions} />
                        <OkButton type="submit" label='Ok'/>
                    </form>
                )}
            </Form>
        );
    }
}

export default GrantUserToDb;