Template.home_layout.onCreated(function home_layoutOnCreated() {
    this.ShowMode = new ReactiveVar('today');
});

Template.home_layout.helpers({
    show_mode() {
        return {show: Template.instance().ShowMode.get()};
    },
    showing_all() {
        return (Template.instance().ShowMode.get() == 'all');
    },
    showing_today() {
        return (Template.instance().ShowMode.get() == 'today');
    },
    showing_now() {
        return (Template.instance().ShowMode.get() == 'now');
    }
});

Template.home_layout.events({
    'click #show_today'(event) {
        Template.instance().ShowMode.set('today');
    },
    'click #show_all'(event) {
        Template.instance().ShowMode.set('all');
    },
    'click #show_now'(event) {
        Template.instance().ShowMode.set('now');
    }
});

Template.home_layout.rendered = function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}