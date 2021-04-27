import React from 'react';
import { Grid, Loader, Label, Header, Input, Form, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField,  } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { User } from '../../api/user/User';

const bridge = new SimpleSchema2Bridge(User.schema);
/** Renders the Page for editing a single document. */
class EditUserProfile extends React.Component {
  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, _id } = data;
    User.collection.update(_id, { $set: { firstName, lastName } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'User Profile Updated', 'success')));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">User Profile Settings</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditUserProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = Meteor.userId();
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(User.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Meteor.users.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditUserProfile);
