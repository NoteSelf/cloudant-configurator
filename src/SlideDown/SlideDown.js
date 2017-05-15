import React from 'react';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react'

/**
 * High order component that wraps any passed in content and slides it up and down,
 * depending on the presence of a expanded property
 * @param {React.Component} Content 
 */
const SlideDown = Content => props =>{

    const {expanded, noFade, duration = 500, ...passDown} = props;
    const Slider = (
        <VelocityTransitionGroup component="div"
                enter={{ animation: 'slideDown', duration }}
                leave={{ animation: 'slideUp', duration }}>
                { expanded && <Content {...passDown}></Content>}
            </VelocityTransitionGroup>
    );

    return (
     noFade ? 
                <div> {Slider}</div>
            : 
                <VelocityComponent animation={{ opacity: expanded ? 1 : 0 }} duration={500}>
                    {Slider}
                </VelocityComponent>
    )
}



export default SlideDown;