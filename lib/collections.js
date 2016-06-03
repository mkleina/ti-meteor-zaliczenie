Clothes = new Mongo.Collection('clothes');
Seasons = new Mongo.Collection('seasons');
Images = new Mongo.Collection('images');

if (Meteor.isClient) {
	clothesHandle = Meteor.subscribe('clothes');
	seasonsHandle = Meteor.subscribe('seasons');
	imagesHandle = Meteor.subscribe('images');
}