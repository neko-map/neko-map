import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Volunteers } from '../../api/volunteer/Volunteer';
import { Cats } from '../../api/cat/Cats';
import { User } from '../../api/user/User';
import { Notes } from '../../api/note/Notes';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Volunteers.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Volunteers.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Cats.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Cats.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(User.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return User.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(User.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return User.collection.find();
  }
  return this.ready();
});

Meteor.publish(Volunteers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Volunteers.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
