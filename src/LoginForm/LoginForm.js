import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Form } from 'react-form'
import TextField from '../material-react-form/TextField'
import {OkButton} from '../simpleComponents/plus'

class LoginForm extends PureComponent {
    
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    render() {

        const inputStyles = {
            display: 'block',
            margin: '0 auto'
        }

        return (
            <Card>
                <CardTitle title="Login" subtitle="Cloudant credentials" />
                <CardText>
                <Form onSubmit={this.props.onSubmit} defaults={{name:'',password:''}}>
                {({ submitForm }) => (
                    <form onSubmit={submitForm}>
                        <TextField field='name' style={inputStyles} floatingLabelText='Username' hintText='the same as on cloudant.com'/>
                        <TextField field='password' style={inputStyles} type='password' floatingLabelText='Password' hintText='the same as on cloudant.com'/>
                        <OkButton type="submit" label='Login'/>
                    </form>
                )}
            </Form>
                
                </CardText>
            </Card>
        );
    }
}

export default LoginForm;