import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'

function Register(props) {

    const [errors, setErrors] = useState({})
  
    // Normally, addUSer won't be recognized, hence line 34
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const [ addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result){
            // Redirect to homepage after registration
            console.log(result)
            props.history.push('/')
        }, 
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    // In JS, all the functions with the keyword 'function" are hoisted IN THE BEGINNING of the exec.
    // therefore : 
    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            {/* noValidate, because by default HTML5 does email validation, we already done that in the backend */}
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}> 
                <h1> Register </h1>
                <Form.Input label="Username" placeholder="Username.." name="username" type="text" value={values.username} error={errors.username? true : false} onChange={onChange}/>
                <Form.Input label="Email" placeholder="Email.." name="email" type="email" error={errors.email? true : false} value={values.email} onChange={onChange}/>
                <Form.Input label="Password" placeholder="Password.." name="password" type="password" error={errors.password? true : false} value={values.password} onChange={onChange}/>
                <Form.Input label="Confirm Password" placeholder="Confirm Password.." type="password" error={errors.confirmPassword? true : false} name="confirmPassword" value={values.confirmPassword} onChange={onChange}/>
                <Button type='submit' primary>
                    Register
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
const REGISTER_USER = gql `
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ){
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;
