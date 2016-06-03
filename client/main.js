import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import './main.html';

Router.configure({
    layoutTemplate: 'app_layout'
});
Router.route('/', 'home_layout');
Router.route('/manage', 'clothes_manager_layout');
