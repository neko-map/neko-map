import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Cat extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.cat.image}/>
        <Card.Content>
          <Card.Header>{this.props.cat.name}</Card.Header>
          <Card.Meta>
            Added by: {this.props.cat.owner}
          </Card.Meta>
          <Card.Description>
            <p>Likes: {this.props.cat.likes}</p>
            <p>Dislikes: {this.props.cat.dislikes}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Location: {this.props.cat.location}
        </Card.Content>
        <Card.Content extra>
          Last fed on: {this.props.cat.lastFed}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Cat.propTypes = {
  cat: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    likes: PropTypes.string,
    dislikes: PropTypes.string,
    location: PropTypes.string,
    lastFed: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Cat);
