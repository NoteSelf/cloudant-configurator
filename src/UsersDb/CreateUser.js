import React, { Component } from 'react';

import { Form, Text, Checkbox, NestedForm  } from 'react-form'


class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        return this.props.onSubmit(this.state.user);
    }

    makeInput(name, type="text"){

        return (
            <div>
                <label htmlFor={name}>{name}</label>
                <Text field={name} placeholder={name} type={type} />
            </div>
        )
    }

    makeCheckbox( field ){
        return (
        <div key={field.value}>
            <label>{field.label}</label><Checkbox  field={`roles.${field.value}`}/>
        </div>)
    }

    makeMeta( f, i ){
        return (
            <div>
                <Text field={['metadata',i,'name']} placeholder='Field name'/>
                <Text field={['metadata',i,'value']} placeholder='Field value'/>
            </div>
        )
    }

    render() {
        const roles = [
            {label:'Reader',value:'_reader'},
            {label:'Writer',value:'_writer'},
            {label:'Admin',value:'_admin'}
            ]
        return (
        <div>
            <Form
                defaultValues={{metadata:[]}} 
                onSubmit={this.props.onSubmit}>
                {({submitForm, addValue, values}) => {
                return (
                    <form onSubmit={submitForm}>
                        { this.makeInput('name')}
                        { this.makeInput('password','password')}
                        { roles.map( r => this.makeCheckbox(r))}
                        <h6>Metadata</h6>
                        <button type='button' onClick={()=>addValue('metadata',{})}>+</button>
                        { values.metadata.map( this.makeMeta )}
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