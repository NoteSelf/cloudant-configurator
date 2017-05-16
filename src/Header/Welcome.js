import React from 'react';

const Welcome = props => {
    return (
        <div className='App-welcome'>
            <p>
                This is a small simple and scoped tool for the Cloudant + NoteSelf tuple. It's only task is to help you configure your Cloudant account in a multi-user manner.
                You have to login into your Cloudant account in order to use this tool. We DO NOT store your credentials in any way, they are sent directly and transparently to cloudant.
                If you don't want to trust us it's fine. Just go to https://cloudant.com/sign-in/, sign in there and come back here. We will pick the cookie automatically.
            </p>
            <p>
                If you don't know what NoteSelf is, please
                <a href='https://noteself.github.io'> take a look here</a>
            </p>
            <p>
                If you don't have a Cloudant account configured, please take a look
                <a href='https://www.youtube.com/watch?v=Oc5lNND8dZE&t=2s'> to this video</a>
            </p>
        </div>
    );
};

export default Welcome;