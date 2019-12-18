import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import moment from 'moment';

// Receiving the post object passed as props form Home
function PostCard(props) {
    // This can be deconstructed in the parameters directly
    const { body, createdAt, id, username, likeCount, commentCount, likes, comments } = props.post;

    const likePost = () =>  {
        console.log('Liked post')
    }

    const commentPost = () =>  {
        console.log('commented post')
    }
    
    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header> { username } </Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}> { moment(createdAt).fromNow(true) } </Card.Meta>
          <Card.Description> { body } </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentPost}>
            <Button color='blue' basic>
                <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
                {commentCount}
            </Label>
        </Button>
        </Card.Content>
      </Card>
    )
}

export default PostCard;
