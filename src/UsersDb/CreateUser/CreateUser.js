import React, { Component } from 'react';
import './styles.css'
import { Form, Text, Checkbox } from 'react-form'
import { VelocityTransitionGroup } from 'velocity-react'

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ name, password, roles, metadata }) {
        // We need to first convert the data from the form format to the user format
        roles = Object.keys(roles).filter(k => roles[k]) // because roles props are booleans it is enough to just return the value
        metadata = metadata
            .reduce((full, meta) => (
                {
                    ...full,
                    [meta.name]: meta.value
                })
            , {});
        const user = { name, password, roles, metadata };
        // And then submit the user to our onSubmit function
        this.props.onSubmit(user);
    }

    makeInput(name, type = "text") {

        return (
            <div>
                <label htmlFor={name}>{name}</label>
                <Text field={name} placeholder={name} type={type} />
            </div>
        )
    }

    makeCheckbox(field) {
        return (
            <div key={field.value} className='CreateUser-roles'>
                <label>{field.label}</label><Checkbox field={`roles.${field.value}`} />
            </div>)
    }

    makeMeta(f, i) {
        return (
            <div className='CreateUser-form-group' key={i}>
                <Text field={['metadata', i, 'name']} placeholder='Field name' />
                <Text field={['metadata', i, 'value']} placeholder='Field value' />
            </div>
        )
    }

    render() {
        const roles = [
            { label: 'Reader', value: 'reader' },
            { label: 'Writer', value: 'writer' }
        ]



        return (
            <div className='CreateUser-wrapper'>
                <Form
                    defaultValues={{ metadata: [] }}
                    onSubmit={this.handleSubmit}>
                    {({ submitForm, addValue, values }) => {
                        return (
                            <form onSubmit={submitForm}>
                                {this.makeInput('name')}
                                {this.makeInput('password', 'password')}
                                <h5>Roles</h5>
                                {roles.map(r => this.makeCheckbox(r))}
                                <div className='CreateUser-header-group'>
                                    <h5>Metadata</h5>
                                    <button type='button' onClick={() => addValue('metadata', {})}>+</button>
                                </div>
                                <VelocityTransitionGroup component="div"
                                    enter={{ animation: 'slideDown', duration: 500 }}
                                    leave={{ animation: 'slideUp', duration: 500 }}>
                                    {values.metadata.map(this.makeMeta)}
                                </VelocityTransitionGroup>
                                <button type='submit'>add</button>
                            </form>
                        )
                    }}
                </Form>
            </div>
        );
    }
}

export default CreateUser;