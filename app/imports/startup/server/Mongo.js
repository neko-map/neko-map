import { Meteor } from 'meteor/meteor';
import { Cats } from '../../api/cat/Cat';
import { User } from '../../api/user/User';

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

// Initialize the database with a default data document.
function addName(name) {
  console.log(`  Adding: ${name.firstName} ${name.lastName} (${name.owner})`);
  User.collection.insert(name);
}

// Initialize the UserNamesCollection if empty.
if (User.collection.find().count() === 0) {
  if (Meteor.settings.defaultNames) {
    console.log('Creating default names.');
    Meteor.settings.defaultNames.map(data => addName(data));
  }
}
