import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types'

import SliderHoc from '../SlideDown'

const CardTextSlider = SliderHoc(CardText);

class CardSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    static propTypes = {
        children: PropTypes.any,
        title: PropTypes.string,
        subTitle: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]),
    };
    
    render() {
        const {title, subTitle, children} = this.props;

        return (
            <Card
                onExpandChange={() => this.setState({ expanded: !this.state.expanded })}>
                <CardTitle
                    title={title}
                    subTitle={subTitle}
                    actAsExpander
                    showExpandableButton
                />
                <CardTextSlider noFade expanded={this.state.expanded}>
                    {children}
                </CardTextSlider>
            </Card>
        );
    }
}

export default CardSlider;
