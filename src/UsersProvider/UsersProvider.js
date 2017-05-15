import React, { Component , Children, cloneElement} from 'react';

import PouchDB  from 'pouchdb'
import pouchdbAuthentication from 'pouchdb-authentication'
PouchDB.plugin(pouchdbAuthentication);

import EnableUsersDb from '../EnableUsersDb'


class UsersProvider extends Component {

    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.state = {
            usersDbExists: false,
            users: {}
        };
       this.db = new PouchDB(props.url + '_users', {skipSetup: true});
       window.axios = this.props.api;
    }

    createUser({name,password, ...opts}){
        console.info(opts);
        // const _id = `org.couchdb.user:${user.name}`;

        // const newUser = {
        //     roles: [],
        //     _id,
        //     type: 'user',
        //     ...user,
        // }


        // return this.props.api
        // .put('_users/'+ _id, newUser)
        // .then(({data}) =>
        // {
        //     this.setState({
        //         users: {
        //             ...this.state.users, 
        //             [user.name]: newUser }
        //         })
        // })
        // .catch((err) =>{
        //     console.error('Error adding an user',err)
        // })

        this.db
        .signup(name,password,opts)
        .then(status =>{
            this.setState({
                users: {
                    ...this.state.users, 
                    [name]: { name, id: status.id, ...opts } }
                })
        })
    }

    getUsers(){
        return this.props.api
        .get('_users/_all_docs')
        .then(({data})=>{
            console.log(data);
            const users = data.rows
                .filter(usr => usr.id.startsWith('org.couchdb.user'))
                .reduce( (usrs,usr) =>{ 
                    const name = usr.id.replace(/^.*:/,'');
                    return { ...usrs, [name]: {name} }
                }, this.state.users)
            this.setState({users});
        })
    }

    checkUsersDb() {
        return this.props.api
            .get('_users')
            .then(({ data }) => {
                this.setState({ usersDbExists: true });
            })
            .catch((err) => {
                if (err.error === 'not_found') {
                    return this.setState({ usersDbExists: false });
                }
                this.setState({ usersDbExists: false, error: true });
                throw err;
            })
    }

    componentDidMount() {
        this.checkUsersDb()
        .then(this.getUsers)
    }
    
    
    render() {

        const passdownProps = { 
            ...this.props,
            users: this.state.users,
            createUser: this.createUser
        }

        return (
            <div>
            { !this.state.usersDbExists
                ? 
                    <EnableUsersDb {...passdownProps} onSuccess={() => this.setState({ usersDbExists: true })} />
                : 
                    Children.map( this.props.children, 
                        child => cloneElement(child, passdownProps)
                    )
            }
            </div>
        );
    }
}

export default UsersProvider;