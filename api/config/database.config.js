 
import mysql from "promise-mysql";
import settings from '../setting';
import logger from '../config/logger.config';

let config = require('./' + settings.environment + '.config');
let host = config.default.mysql.host;
let port = config.default.mysql.port;
let username = config.default.mysql.username;
let password = config.default.mysql.password;
let database_name = config.default.mysql.database_name;

const connectToMysqlDb = function () {
    mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database_name
    }).then(function () {
        logger.info(`MysqlDB Connected to ${database_name}`);
    }).catch(function (error) {
        console.log(error);
        
        logger.error(`Error Connecting to MysqlDB ${database_name}`);
    });
};

const pool = mysql.createPool({
    host: host,
    user: username,
    password: password,
    database: database_name,
    connectionLimit: 10,
    typeCast: function castField( field, useDefaultTypeCasting ) {
            
        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
            var bytes = field.buffer();

            // A Buffer in Node represents a collection of 8-bit unsigned integers.
            // Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            return( bytes && bytes[ 0 ] === 1 );

        }

        return( useDefaultTypeCasting() );

    }
});

const exportData = {
    connectToMysqlDb: connectToMysqlDb,
    pool: pool
};

export default exportData;