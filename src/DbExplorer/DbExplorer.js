import React, { Component } from 'react';
import urlJoin from 'url-join'
import Map from 'lodash.map'

import DbsList from './DbsList'
import generateAuthDoc from './couchAuthDoc'
import CardSlider from '../CardSlider'

import './styles.css'
export default class DbExplorer extends Component {

    constructor(props) {
        super(props);
        this.getDbInfo = this.getDbInfo.bind(this);
        this.updateSecurityDocument = this.updateSecurityDocument.bind(this);
        this.grantUserToDb = this.grantUserToDb.bind(this);
        this.enableCouchAuth = this.enableCouchAuth.bind(this);
        this.state = {
            error: false,
            databases: {},
        };
    }

    componentDidMount() {
        this
        .getAllDbs()
        .then( databases => 
            databases.map(this.getDbInfo)
        )
    }

    getAllDbs() {
        return this.props.api
            .get('_all_dbs')
            .then(({ data }) => data
                .filter(db => db !== '_users')
            );
    }

    /**
     * Fetches the _security document of a couchdb database.
     * It then updates the list of available databases with that information
     * marking it as enabled if it meets the requirements to use CouchDb auth.
     * @param {String} dbName the name of the database you want
     * @returns {Promise}
     */
    getDbInfo(dbName) {

        const url = urlJoin(this.props.url, dbName, '_security')

        return this.props.api
            .get(url)
            .then(({ data }) => {
                const isEnabled = data.couchdb_auth_only;
                data
                && 
                this.setState((prevState, props) => (
                        {
                            databases:
                            {
                                ...prevState.databases,
                                [dbName]:
                                {
                                    name: dbName,
                                    couchAuth: isEnabled, 
                                    members: data.members, admins: data.admins,
                                }
                            }
                        }
                    ))
                return data;
            })
    }

    updateSecurityDocument(dbName, doc){
        const url = urlJoin(this.props.url, dbName, '_security')
        return this.props.api
            .put(url, doc)
            .then(()=> dbName) // We return the dbName that has been updated so it be used down the chain
    }
    
    /**
     * Grants an user access to certain database (using couch auth)
     * The database should have couch auth enabled
     * 
     * @param {String} dbname the database where the user should be granted to
     * @param {Object} {name,role} The user's name and role
     * @returns {Promise}
     * 
     */
    grantUserToDb(dbName, {name,role}){
        console.log('About to add ' + name + ' as ' + role + ' to ' + dbName);
        return this.getDbInfo(dbName)
        .then(( data ) =>
        {
            data[role].names.push(name);
            return this.updateSecurityDocument(dbName, data);
        })
        .then(this.getDbInfo);
    }

    /**
     * Enables Couchdb auth on an specific database.
     * What it does is create a new _security document that meets the requirements of Couchdb authentication.
     * @param {String} dbName the dbName you want to activate
     * @returns {Promise}
     * 
     */
    enableCouchAuth(dbName){
        const authDoc = generateAuthDoc({admins: [this.props.user.name]});
        return this.updateSecurityDocument(dbName,authDoc)
                .then(this.getDbInfo)
    }


    render() {

        const { url, api, user, users } = this.props;
        const passDownProps = 
        { 
            url, api, user, users, 
            grantUserToDb: this.grantUserToDb,
            enableCouchAuth: this.enableCouchAuth
        };
        const databasesAsArray = Map( this.state.databases )

        return (
            <CardSlider
                    title='Databases'
                    subTitle='existing databases'
            >
                        <DbsList databases={databasesAsArray} {...passDownProps} />
            </CardSlider>
        );
    }
}