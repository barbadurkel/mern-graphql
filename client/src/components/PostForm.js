import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'

function PostForm() {

    const  [ values, onChange, onSubmit ] = useForm(createPostCallback, {
        body: ''
    })

    const [ createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(_,result){
            console.log(result)
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post: </h2>
            <Form.Field>
                <Form.Input placeholder="Hi world!" name="body" onChange={onChange} value={values.body}/>
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field> 
        </Form>
     
    )
}

const CREATE_POST = gql `
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username 
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`
export default PostForm;