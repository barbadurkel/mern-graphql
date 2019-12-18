import React from 'react'
import { Card, Icon, Label } from 'semantic-ui-react'
import React from 'react'
import moment from 'moment';

// Receiving the post object passed as props form Home
function PostCard(props) {
    // This can be deconstructed in the parameters directly
    const { body, createdAt, id, username, likeCount, commentCount, likes, comments } = props.post;
    
    return (
        <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header> { username } </Card.Header>
          <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
}

export default PostCard;
