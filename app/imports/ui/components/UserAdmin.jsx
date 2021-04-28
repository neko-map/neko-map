import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserAdmin extends React.Component {
  render() {
    return (
      <Card centered>
        <Image src={this.props.user.image}/>
        <Card.Content>
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          { this.props.user.owner }
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserAdmin.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserAdmin);
