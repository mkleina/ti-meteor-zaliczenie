Template.clothes_manager_layout.helpers({
    get_seasons() {
        return Seasons.find();
    },
    season_name() {
        return Seasons.findOne({_id: this._id}).name;
    },
    season_id() {
        return this._id._str;
    }
});

Template.clothes_manager_layout.events({
    'submit #cloth_add_form'(event, template) {
        console.log(event);
        event.preventDefault();

        function resetErrors() {
            template.$('#cloth_name_error').slideUp();
            template.$('#cloth_temp_min_error').slideUp();
            template.$('#cloth_temp_max_error').slideUp();
            template.$('#cloth_season_error').slideUp();
            template.$('#cloth_image_error').slideUp();
        }

        resetErrors();
        
        // Get cloth data
        var cloth_name = event.target.cloth_name.value;
        var cloth_description = event.target.cloth_description.value;
        var cloth_temp_min = event.target.cloth_temp_min.value;
        var cloth_temp_max = event.target.cloth_temp_max.value;
        var cloth_seasons = [];
        template.$('input[name=cloth_season]:checked').each(function() {
            cloth_seasons.push(new Mongo.ObjectID(this.value));
        });
        var image = event.target.cloth_image.files[0];

        if (cloth_name == "") {
            template.$('#cloth_name_error').slideDown();
            return;
        }

        if (template.$('[name=cloth_season]:checked').length == 0) {
            template.$('#cloth_season_error').slideDown();
            return;
        }

        if (isNaN(cloth_temp_min) || cloth_temp_min == "") {
            template.$('#cloth_temp_min_error').slideDown();
            return;
        }

        if (isNaN(cloth_temp_max) || cloth_temp_max == "") {
            template.$('#cloth_temp_max_error').slideDown();
            return;
        }

        if (!image) {
            template.$('#cloth_image_error').slideDown();
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event) {          
            var buffer = new Uint8Array(reader.result); // convert to binary
            cloth_id = new Mongo.ObjectID();

            template.$('#cloth_add_loading').fadeIn();
            Meteor.call('addCloth', cloth_id, cloth_name, cloth_description, cloth_temp_min, cloth_temp_max, cloth_seasons, buffer, function(err, data) {
                if (err)
                    console.log(err);

                template.$('#cloth_add_loading').fadeOut();
                newClothID = '#cloth' + cloth_id._str;
            });
        }
        reader.readAsArrayBuffer(image);

        template.$('#cloth_add').slideUp(function() {
            template.$('#cloth_add_form')[0].reset();
        });
    },
    'click #cloth_add_button'(event, template) {
        $("html, body").animate({ scrollTop: 0 }, "slow", function() {
            template.$('#cloth_add').slideDown();
        });
    },
    'click #cloth_add_cancel_button'(event, template) {
        template.$('#cloth_add').slideUp(function() {
            template.$('#cloth_add_form')[0].reset();
        });
    }
});

Template.clothes_manager_layout.rendered = function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}
