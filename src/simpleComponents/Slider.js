import React from 'react';
// import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react'


const Slider = ({ children, ...props }) => {
    return (
//        <VelocityComponent runOnMount style={{opacity:0}} animation={{ opacity: children.length ? 1 : 0 }} duration={400}>
            <VelocityTransitionGroup component="div"
                enter={{ animation: 'slideDown', duration: 500 }}
                leave={{ animation: 'slideUp', duration: 500 }}
                {...props}
            >
                {children}
            </VelocityTransitionGroup>
//        </VelocityComponent>
    );
};

export default Slider;

