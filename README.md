Reciffy
=======

![Reciffy Landing](https://github.com/strychemi/reciffy/raw/master/screenshots/home.png)

What is it?
-----------

Reciffy is a platform for creating, sharing, and saving recipes for those who have a passion for food and cooking. It is a full-stack web app consisting of a ruby on rails API endpoint on the back-end with an AngularJS single page app on the front-end.

Built within 2 weeks as our final project for [Viking Code School](http://www.vikingcodeschool.com/) hackathon.

Team:
* Andrew Baik
* Kelsey James
* Deepa Kackar
* Joshua Masland-Sarani

The app implements the following features:

* User authentication/authorization using Devise.
* Active record and SQL queries into the database for features such as displaying "Top Rated Recipes" or "Recommended Recipes" for the user.
* Using the Paperclip gem alongside with Amazon S3 buckets for image upload handling.
* Basic search for recipes and users by Tags.
* Self-reflective associations (Users can follow each other).
* Polymorphic associations (Users and Recipes can be tagged).
* Nested forms for user profiles.
* A RESTful Ruby on Rails API endpoint on the backend communicating with a front-end AngularJS single page app.
* Infinite vertical scrolling implemented with ngInfiniteScroll for infinite smoother UX for browsing recipes.
* ng-file-upload for image uploads on the front-end.
* angucomplete-alt for autocompletion on recipe ingredients.

Getting started
---------------
[Heroku-Deployed Link](http://reciffy.herokuapp.com/)

To get started, sign-up.



One you are logged in, you will be directed to a recipes index page which shows a variety of recipes under various categories, feel free to scroll down and more rows of recipes should pop up!


Enjoy!
