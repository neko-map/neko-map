import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a card for a user profile. See pages/EditUserProfile.jsx. */
class Users extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edituserprofile/${Meteor.userId()}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

Users.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Users);
