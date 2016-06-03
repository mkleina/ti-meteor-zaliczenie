function showClothes(showMode) {
    wd = weatherData.get();
    if (wd) {
        if (clothesHandle.ready() && seasonsHandle.ready()) {
            var seasonId = Seasons.findOne({name: getSeason()})._id;
            if (showMode == "all")
                return Clothes.find({}, {sort: {name: 1}});
            else if (showMode == "today")
                return Clothes.find({temp_min: {$lte: wd.main.temp_min}, temp_max: {$gte: wd.main.temp_max}, season_ids: seasonId}, {sort: {name: 1}});
            else if (showMode == "now")
                return Clothes.find({temp_min: {$lte: wd.main.temp}, temp_max: {$gte: wd.main.temp}, season_ids: seasonId}, {sort: {name: 1}});
        }
    }
}

Template.clothes_list.helpers({
    any_clothes() {
        any = showClothes(this.show);
        if (any)
            return (any.count() > 0);
    },
    get_clothes() {
        return showClothes(this.show);
    },
    clothes_loaded() {
        return clothesHandle.ready() && seasonsHandle.ready() && weatherData.get()
    }
});

Template.cloth_item.helpers({
    cloth_id() {
        return this._id._str;
    },
    cloth_image_id() {
        return Clothes.findOne({_id: this._id}).image_id._str;
    },
    cloth_name() {
        return Clothes.findOne({_id: this._id}).name;
    },
    cloth_description() {
        return Clothes.findOne({_id: this._id}).description;
    },
    cloth_season() {
        var seasonIDs = Clothes.findOne({ _id: this._id}).season_ids;
        var seasonList = [];
        _.each(seasonIDs, function(value, index) {
            if (seasonsHandle.ready()) {
                seasonList.push(Seasons.findOne({_id: value}).name);
            }
        })
        return seasonList.join(', ');
    },
    cloth_temp_min() {
        return Clothes.findOne({_id: this._id}).temp_min;
    },
    cloth_temp_max() {
        return Clothes.findOne({_id: this._id}).temp_max;
    },
    is_edit_mode() {
        return (Template.parentData().mode == "edit");
    }
});

Template.cloth_item.events({
    'submit #cloth_delete_form'(event, template) {
        event.preventDefault();
        template.$('.cloth-post').slideUp(function() {
            Meteor.call('deleteCloth', event.target.cloth_id.value);
        });
    }
});

Template.cloth_item.rendered = function() {
    this.$('.cloth-post').hide().fadeIn();
    if (newClothID) {
        $("html, body").animate({
            scrollTop: $(newClothID).offset().top - $(window).height()/2 - $(newClothID).height()/2
        }, "slow", function() {
            for (i = 0; i < 3; i++) {
                $(newClothID).fadeOut(200).fadeIn(200);
            }
            newClothID = null;
        });
    }
};