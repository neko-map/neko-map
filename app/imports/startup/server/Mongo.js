import { Meteor } from 'meteor/meteor';
import { Cats } from '../../api/cat/Cat';
import { Volunteers } from '../../api/volunteer/Volunteer';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addVolunteer(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Volunteers.collection.insert(data);
}

// Initialize the VolunteerCollection if empty.
if (Volunteers.collection.find().count() === 0) {
  if (Meteor.settings.defaultVolunteers) {
    console.log('Creating default volunteer data.');
    Meteor.settings.defaultData.map(data => addVolunteer(data));
  }
}
