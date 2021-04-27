import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VolunteerCard extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.volunteer.firstName} {this.props.volunteer.lastName}</Card.Header>
          <Card.Description>
            {this.props.volunteer.reason}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.volunteer.phoneNumber} / {this.props.volunteer.email}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
VolunteerCard.propTypes = {
  volunteer: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VolunteerCard);
