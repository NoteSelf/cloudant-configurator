import React from 'react';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react'

/**
 * High order component that wraps any passed in content and slides it up and down,
 * depending on the presence of a expanded property
 * @param {React.Component} Content 
 */
const SlideDown = Content => props =>{

    const {expanded, ...passDown} = props;
    return (
        <VelocityComponent animation={{ opacity: expanded ? 1 : 0 }} duration={500}>
            <VelocityTransitionGroup component="div"
                enter={{ animation: 'slideDown', duration: 500 }}
                leave={{ animation: 'slideUp', duration: 500 }}>
                { expanded && <Content {...passDown}></Content>}
            </VelocityTransitionGroup>
        </VelocityComponent>
    )}



export default SlideDown;