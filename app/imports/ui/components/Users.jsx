import React from 'react';
import { Image, Header, Grid, Segment, Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import '../../../client/style.css';

/** Renders a card for a user profile. See pages/EditUserProfile.jsx. */
class Users extends React.Component {

  render() {
    const pageStyle = { marginTop: '30px' };
    return (
      <Grid style={pageStyle} container centered={true} columns={2}>
        <Segment compact>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={this.props.user.image} size='medium' circular centered={true}/>
              <Header as='h2' textAlign='center'>{this.props.user.username}</Header>
              <Button basic fluid>
                <Link to={`/edituserprofile/${this.props.user._id}`}>Edit Profile</Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Segment>
        <Grid.Column>
          <Table basic>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2}>
                  <Header as="h5">First Name</Header>
                </Table.Cell>
                <Table.Cell width={2}>{this.props.user.firstName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={2}>
                  <Header as="h5">Last Name</Header>
                </Table.Cell>
                <Table.Cell width={2}>{this.props.user.lastName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={2}>
                  <Header as="h5">Email</Header>
                </Table.Cell>
                <Table.Cell width={2}>{this.props.user.owner}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}

Users.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Users);
