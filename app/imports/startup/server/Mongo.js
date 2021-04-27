import { Meteor } from 'meteor/meteor';
import { Cats } from '../../api/cat/Cats';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Cats.collection.insert(data);
}

// Initialize the CatsCollection if empty.
if (Cats.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
