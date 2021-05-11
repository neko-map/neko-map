import React from 'react';
import { Card, Feed, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

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
        <Card.Content extra>
          <Feed>
            {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/editcats/${this.props.cat._id}`}>Edit</Link>
        </Card.Content>
        <Card.Content>
          <AddNote owner={this.props.cat.owner} catId={this.props.cat._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Cat.propTypes = {
  cat: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    likes: PropTypes.string,
    dislikes: PropTypes.string,
    location: PropTypes.string,
    lastFed: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  notes: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Cat);
