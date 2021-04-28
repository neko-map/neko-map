import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { User } from '../../api/user/User';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing-page'>
        <Grid verticalAlign='middle' textAlign='center'>
          <Grid.Row className="landing-page-header-background">
            <Grid.Column>
              <b className='landing-page-title'>NEKO MAP</b>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <b>@UHMANOA</b>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.props.currentUser === '' ? (
          <Grid verticalAlign='middle' textAlign='center' className='landing-page'>
            <Grid.Row columns='equal' className='landing-page-steps'>
              <Grid.Column>
                <a href='#/userprofile' className='white'>1. Create a Profile</a>
              </Grid.Column>
              <Grid.Column>
                <a href='#/catprofiles' className='white'>2. View/Add any cats found in UH Manoa</a>
              </Grid.Column>
              <Grid.Column>
                <a href='#/volunteer' className='white'>3. Volunteer to feed</a>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='equal'>
              <Grid.Column>
                <Image href='#/userprofiles' src="/images/signin.png" bordered/>
              </Grid.Column>
              <Grid.Column>
                <Image href='#/catprofiles' src="/images/cats.png" bordered/>
              </Grid.Column>
              <Grid.Column>
                <Image href='#/volunteer' src="/images/volunteer.png" bordered/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <Grid verticalAlign='middle' textAlign='center' className='landing-page'>
            <Grid.Row columns='equal' className='landing-page-steps'>
              <Grid.Column>
                <a href='#/userprofile' className='white'>1. View/Edit User Profile</a>
              </Grid.Column>
              <Grid.Column>
                <a href='#/catprofiles' className='white'>2. View/Add any cats found in UH Manoa</a>
              </Grid.Column>
              <Grid.Column>
                <a href='#/volunteer' className='white'>3. Volunteer to feed</a>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='equal'>
              <Grid.Column>
                <Image href='#/userprofiles' src="/images/signin.png" bordered/>
              </Grid.Column>
              <Grid.Column>
                <Image href='#/catprofiles' src="/images/cats.png" bordered/>
              </Grid.Column>
              <Grid.Column>
                <Image href='#/volunteer' src="/images/volunteer.png" bordered/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

// Declare the types of all properties.
Landing.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const landingBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default withRouter(landingBarContainer);
