const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY } = require('../config');

module.exports = context => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        // Bearer ....
        // This splits the header into 2 strings, we get the 2nd string (= token value)
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, SECRET_KEY);
                // USER IS RETURNED HERE
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid / Expired token');
            }
        }
        // else
        throw new Error ('Authentication token must be \' Bearer [token]');
    }
    // else
    throw new Error ('Authorization header must be provided');
}