import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext)
    // the data is stored inside an object 'getPosts', deconstruct the data and use alias 'post'
    // useQuery returns a promise, which means the deconstruction will not work because data is undefined
    // a workaround is initializing the data with an empty object (the value will change once the useQuery is completeds)
    // https://github.com/apollographql/react-apollo/issues/3323     Aug 2019
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    useEffect( () =>  {
        if(data) setPosts(data.getPosts)
    }, [data])

    return (
        <Grid columns={3} >
        <Grid.Row className="page-title">
            <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
            { user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}
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


export default Home;
