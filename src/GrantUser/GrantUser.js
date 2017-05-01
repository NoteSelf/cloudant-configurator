import React, { Component } from 'react';
import { Form, Select  } from 'react-form'

class GrantUserToDb extends Component {

    render() {

        const usersAsOptions = Object.keys(this.props.users).map( u => ({label:u, value:u}))
        const rolesAsOptions = [
                        {label: 'Admin', value:'admins'},
                        {label: 'Member', value:'members', selected:true},
                    ];
        return (
            <Form
                onSubmit={this.props.onSubmit}>
                {({ submitForm }) => (
                    <form onSubmit={submitForm}>
                        <label htmlFor="name">User</label>
                        <Select field='name' name='name' options={usersAsOptions}>
                        </Select>
                        <label htmlFor='role'>Role to assign</label>
                        <Select field='role' name='role' options={rolesAsOptions}>
                        </Select>
                        <button type="submit">Add</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default GrantUserToDb;