import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, LongTextField, SubmitField, DateField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Cats } from '../../api/cat/Cats';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  cname: String,
  image: String,
  likes: String,
  dislikes: String,
  lastFed: String,
  additionalInfo: String,
  location: {
    type: String,
    allowedValues: ['Everly Hall', 'Sinclair Library', 'Hemenway Hall',
      'Administrative Services Building 1', 'Administrative Services Building 2',
      'Bachman Hall', 'Campus Center', 'Andrews Outdoor Theatre', 'Krauss Hall',
      'Kuykendall Hall', 'Art Building', 'Miller Hall', 'Sakamaki Hall', 'Physical Science Building',
      'Bilger Hall', 'POST', 'Marine Sciences Building', 'Holmes Hall', 'Kennedy Theatre', 'Hamilton Library',
      'Edmonson Hall', 'Snyder Hall', 'Webster Hall', 'Spalding Hall',
      'Varney Circle', "Hawai'i Hall", 'Crawford Hall', 'Dean Hall', 'Gartley Hall',
      'Architecture School', 'George Hall', 'Gilmore Hall', 'Agricultural Engineering Institute',
      'Dance Building', 'Sherman Laboratory', 'Pope Laboratory', 'Biomedical Sciences',
      'Campus Services', 'Physical Plant Building', 'Transportation Services', 'Landscaping',
      'Energy House', 'Jefferson Hall', 'Lincoln Hall', 'Center for Korean Studies',
      'Hale Mānoa', 'Hale Hālāwai', 'Burns Hall', 'Music Complex', 'Law School', 'Law Library', 'Johnson Hall', 'Gateway House',
      'Frear Hall', 'Hawaiian Studies', 'Varsity Circle', 'Air Force ROTC Building'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class RegisterCatFrom extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { cname, image, likes, dislikes, lastFed, location, additionalInfo } = data;
    const owner = Meteor.user().username;
    Cats.collection.insert({ cname, image, likes, dislikes, lastFed, location, additionalInfo, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Register a Cat</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='cname'/>
              <TextField name='image'/>
              <SelectField name='location'/>
              <TextField name='likes'/>
              <TextField name='dislikes'/>
              <DateField name='lastFed'/>
              <LongTextField name='additionalInfo'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default RegisterCatFrom;
