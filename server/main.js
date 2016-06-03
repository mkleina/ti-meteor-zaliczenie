import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
    // Database initialization when empty
    if (Seasons.find().count() == 0) {
        Seasons.insert({_id: new Mongo.ObjectID(), name: "Wiosna"});
        Seasons.insert({_id: new Mongo.ObjectID(), name: "Lato"});
        Seasons.insert({_id: new Mongo.ObjectID(), name: "Jesień"});
        Seasons.insert({_id: new Mongo.ObjectID(), name: "Zima"});
    }

    // code to run on server at startup
    Meteor.publish('clothes', function clothesPublication() {
        return Clothes.find();
    });
    Meteor.publish('seasons', function seasonsPublication() {
        return Seasons.find();
    });
    Meteor.publish('images', function seasonsPublication() {
        return Images.find();
    });

    Meteor.methods({
        addCloth: function(cloth_id, cloth_name, cloth_description, cloth_temp_min, cloth_temp_max, cloth_seasons, buffer) {
            imageId = new Mongo.ObjectID();

            Images.insert({_id: imageId, data:buffer});
            Clothes.insert({
            _id: cloth_id,
            image_id: imageId,
            name: cloth_name,
            description: cloth_description,
            temp_min: parseFloat(cloth_temp_min),
            temp_max: parseFloat(cloth_temp_max),
            season_ids: cloth_seasons,
            });
            return imageId;
        },
        deleteCloth: function(cloth_id) {
            cloth = Clothes.findOne({_id: new Mongo.ObjectID(cloth_id)})
            if (cloth) {
                Images.remove({_id: cloth.image_id})
                Clothes.remove({_id: cloth._id})
            }
        }  
    });

    Router.map(function() {
    return this.route('/images/:id', {
        method: 'GET',
        where: 'server',
        action: function() {
        imageData = Images.findOne({_id: new Mongo.ObjectID(this.params.id)}).data;
        this.response.setHeader('Content-Type', 'image');
        this.response.write(new Buffer(imageData));
        this.response.end();
        }
    });
    });
});
