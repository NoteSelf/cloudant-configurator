// This documents disables Cloudant auth and enables the couchdb auth using _users database
// ref https://console.ng.bluemix.net/docs/services/Cloudant/api/authorization.html#enabling-the-_users-database-with-cloudant
export default ({admins = [], members = []}) =>

(
    {
        "couchdb_auth_only": true,
        "members": {
            "names": [...members], "roles": []
        },
        "admins": {
            "names": [...admins], "roles": []
        }
    }
)