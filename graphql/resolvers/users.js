
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config'); 


module.exports = {
    Mutation:{
                                        // destructering args received
        async register(_, { registerInput: { username, email, password, confirmedPassword } }){
            // TODO: Validate user data
            // TODO: Make sure user doesn't already exist

            const user = await User.findOne( { username });
            if(user) {
                // This errors object will be used later by the front (the goal here is handle each error differently)
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                }) 
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User( {
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            // creation of token with a payload equals to the user infos
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}