import React from 'react';
import PropTypes from 'prop-types'

import MdPerson from 'react-icons/lib/md/person'
import MdVerifiedUser from 'react-icons/lib/md/verified-user'

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const UsersList = props => {

    const { 
        header ='Existing users',
        tooltip = ''
    } = props;

    return (
        <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
        >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
             >
                <TableRow>
                    <TableHeaderColumn colSpan="2" tooltip={tooltip} style={{ textAlign: 'center' }}>
                        {header}
                    </TableHeaderColumn>
                </TableRow>
               { /*<TableRow>
                    <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                </TableRow>*/}
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
                showRowHover={true}
                stripedRows={true}
            >
                {props.users.map(({name,admin}, index) => (
                    <TableRow key={index}>
                        <TableRowColumn><MdPerson/> { admin && <MdVerifiedUser color='red'/>} </TableRowColumn>
                        <TableRowColumn>{name}</TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            );
};

UsersList.propTypes = {

            };

export default UsersList;