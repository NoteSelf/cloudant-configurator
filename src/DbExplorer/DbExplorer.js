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

    render() {

        const { url, api, user, users } = this.props;
        const commonProps = { url, api, user, users }
        const databasesAsArray = Map( this.state.databases )

        return (
            <Card>
                <CardTitle
                    title='Databases'
                    subTitle='existing databases'
                />
                <CardText>
                    <DbsList databases={databasesAsArray} {...commonProps} />
                </CardText>
            </Card>
        );
    }
}