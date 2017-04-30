import React, { Component , Children, cloneElement} from 'react';

import PouchDB  from 'pouchdb'
import pouchdbAuthentication from 'pouchdb-authentication'
PouchDB.plugin(pouchdbAuthentication);

class UsersProvider extends Component {

    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.state = {
            users: {}
        };
       this.db = new PouchDB(props.url + '_users', {skipSetup: true});
    }

    createUser(user){
        console.info(user);
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
        .signup(user.name,user.password,{roles:['reader']})
        .then(status =>{
            this.setState({
                users: {
                    ...this.state.users, 
                    [user.name]: { name: user.name, id: status.id } }
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

    componentDidMount() {
        this.getUsers()
    }
    
    
    render() {
        return (
            <div>
            {
                Children.map( this.props.children, 
                    child => cloneElement(child, { 
                        ...this.props, 
                        users: this.state.users,
                        createUser: this.createUser
                    })
                )
            }
            </div>
        );
    }
}

export default UsersProvider;