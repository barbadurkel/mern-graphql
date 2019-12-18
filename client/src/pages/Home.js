import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    // the data is stored inside an object 'getPosts', deconstruct the data and use alias 'post'
    // useQuery returns a promise, which means the deconstruction will not work because data is undefined
    // a workaround is initializing the data with an empty object (the value will change once the useQuery is completeds)
    // https://github.com/apollographql/react-apollo/issues/3323     Aug 2019
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} >
        <Grid.Row className="page-title">
            <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
           { loading ? (
               <h1> Loading posts ...</h1>
           ) : ( 
               // 'posts &&&' === 'I the data object is populated then..'""
               posts && posts.map( post => ( 
                   <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                       <PostCard post={post}/>
                   </Grid.Column>
               ))
           )}
        </Grid.Row>
    
      </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
     getPosts{
         id body createdAt username likeCount 
         likes {
             username
         }
         commentCount
         comments {
            id
            username
         }
     }   
    }
`

export default Home;
