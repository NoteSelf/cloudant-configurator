import React from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lighten, fade } from 'material-ui/utils/colorManipulator';
import {
  cyan500,
  grey100, grey300, grey400, grey500,grey50,grey800,
  white, darkBlack
} from 'material-ui/styles/colors'

const NsColor = '#76BB7A';
const NsLightColor = lighten(NsColor, 0.3);//'#98cc9b';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: NsColor,
        primary2Color: NsLightColor,
        primary3Color: grey400,
        accent1Color: white,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        color: white,
        secondaryTextColor: fade(grey50, 0.54),
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: grey800,
    }
});

const Theme = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>
)

export default Theme;