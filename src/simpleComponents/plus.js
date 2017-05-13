import React from 'react';
import Add from 'material-ui/svg-icons/content/add'
import PA from 'material-ui/svg-icons/social/person-add'
import CANCEL from 'material-ui/svg-icons/navigation/cancel'
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline'

import GoDatabase from 'react-icons/lib/go/database';



import RaisedButton from 'material-ui/RaisedButton';



import {green600, deepOrangeA400, red100, red400, grey600} from 'material-ui/styles/colors'

export const Plus = () => <Add color={green600}/>
export const PersonAdd = () => <PA color={green600}/>
export const Cancel = () => <CANCEL color={deepOrangeA400}/>
export const OkButton = ({ onClick, ...props}) => <RaisedButton primary onTouchTap={onClick} {...props}/>
export const Exclamation = () => <ErrorOutline color={deepOrangeA400}/>
export const ActiveDb = () => <GoDatabase color={green600}/>
export const NonActiveDb = () => <GoDatabase color={grey600}/>

export const ErrorText = (props) => 
<div 
    style={{
        color: red400 , 
        border: '1px solid' + red400,
        borderRadius: '10px' ,
        padding: '1em',
        backgroundColor: red100
}}>
    {props.text}
</div>