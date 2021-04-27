import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The CatsCollection. It encapsulates state and variable values for stuff.
 */
class CatsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CatsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
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
        defaultValue: 'Everly Hall',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the CatsCollection.
 * @type {CatsCollection}
 */
export const Cats = new CatsCollection();