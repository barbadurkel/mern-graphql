import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'

function Login(props) {

    const context = useContext(AuthContext)
    
    const [ errors, setErrors ] = useState({})
  
    const [ onChange, onSubmit, values ] = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
        // userData is an alias
        update(_, { data : { login: userData }}){
           // console.log(result.data.login) === console.log(userData)
            context.login(userData)
            props.history.push('/')
        }, 
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    // In JS, all the functions with the keyword 'function" are hoisted IN THE BEGINNING of the exec.
    // therefore : 
    function loginUserCallback(){
        loginUser();
    }

    return (
        <div className="form-container">
            {/* noValidate, because by default HTML5 does email validation, we already done that in the backend */}
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}> 
                <h1> Log In </h1>
                <Form.Input label="Username" placeholder="Username.." name="username" type="text" value={values.username} error={errors.username? true : false} onChange={onChange}/>
                <Form.Input label="Password" placeholder="Password.." name="password" type="password" error={errors.password? true : false} value={values.password} onChange={onChange}/>
                <Button type='submit' primary>
                    Log In
                </Button>
            </Form>
            { Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}> {value} </li>
                        ))}
                    </ul>
                </div>
                                                )
            }
        </div>
    )
}
// DECALRE the mutation and USE it
const LOGIN_USER = gql `
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;
