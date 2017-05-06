import React from 'react';
import Add from 'material-ui/svg-icons/content/add'
import PA from 'material-ui/svg-icons/social/person-add'
import CANCEL from 'material-ui/svg-icons/navigation/cancel'

import RaisedButton from 'material-ui/RaisedButton';



import {green600, deepOrangeA400} from 'material-ui/styles/colors'

const Plus = () => <Add color={green600}/>
const PersonAdd = () => <PA color={green600}/>
const Cancel = () => <CANCEL color={deepOrangeA400}/>
const OkButton = (props) => <RaisedButton primary {...props}/>

export {Plus, PersonAdd, Cancel, OkButton};