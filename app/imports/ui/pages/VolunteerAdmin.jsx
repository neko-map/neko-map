import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Volunteers } from '../../api/volunteer/Volunteer';
import VolunteerCard from '../components/VolunteerCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class VolunteerAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div>
        <Container>
          <Header as="h2" textAlign="center">List Volunteers (Admin)</Header>
          <Card.Group centered>
            {this.props.volunteers.map((volunteer, index) => <VolunteerCard key={index} volunteer={volunteer}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
VolunteerAdmin.propTypes = {
  volunteers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Volunteers.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const volunteers = Volunteers.collection.find({}).fetch();
  return {
    volunteers,
    ready,
  };
})(VolunteerAdmin);
