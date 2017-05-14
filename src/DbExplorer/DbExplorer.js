import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import urlJoin from 'url-join'
import Map from 'lodash.map'

import DbsList from './DbsList'

import './styles.css'
export default class DbExplorer extends Component {

    constructor(props) {
        super(props);
        this.getDbInfo = this.getDbInfo.bind(this);
        this.updateSecurityDocument = this.updateSecurityDocument.bind(this);
        this.grantUserToDb = this.grantUserToDb.bind(this);
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

    /**
     * Grants an user access to certain database (using couch auth)
     * The database should have couch auth enabled
     * 
     * @param {String} dbname the database where the user should be granted to
     * @param {Object} {name,role} The user's name and role
     * @returns 
     * 
     * @memberof DbExplorer
     */
    grantUserToDb(dbName, {name,role}){
        console.log('About to add ' + name + ' as ' + role + ' to ' + dbName);
        return this.getDbInfo(dbName)
        .then(( data ) =>
        {
            data[role].names.push(name);
            return this.updateSecurityDocument(dbName, data);
        })
        .then(()=> this.getDbInfo(dbName));
    }

    updateSecurityDocument(dbName, doc){
        const url = urlJoin(this.props.url, dbName, '_security')
        return this.props.api.put(url, doc)
    }

    render() {

        const { url, api, user, users } = this.props;
        const passDownProps = { url, api, user, users, grantUserToDb: this.grantUserToDb }
        const databasesAsArray = Map( this.state.databases )

        return (
            <Card>
                <CardTitle
                    title='Databases'
                    subTitle='existing databases'
                />
                <CardText>
                    <DbsList databases={databasesAsArray} {...passDownProps} />
                </CardText>
            </Card>
        );
    }
}