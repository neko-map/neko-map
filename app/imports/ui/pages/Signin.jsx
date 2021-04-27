import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Message, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
      <div className="signin-page-background">
        <Container id="signin-page">
          <Grid verticalAlign="middle">
            <Grid.Column floated="right" width={8}>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <br/>
                  <br/>
                  <b className="bigfont">Neko Map</b>
                  <br/>
                  <br/>
                  <br/>
                  <Form.Input
                    label="Email"
                    id="signin-form-email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                    size="massive"
                  />
                  <br/>
                  <br/>
                  <Form.Input
                    label="Password"
                    id="signin-form-password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                    size="massive"
                  />
                  <Grid >
                    <Grid.Row>
                      <Grid.Column floated="right" width='5'>
                        <Form.Button id="signin-form-submit" content="Login" size="massive"/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column floated="right" width='8'>
                        <b>Don&apos;t have an account? Sign up </b>
                        <Link to="/signup">here</Link>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Login was not successful"
                  content={this.state.error}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
