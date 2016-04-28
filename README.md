# Reciffy

## Deployment

Deployed to Heroku at: https://reciffy.herokuapp.com/

## Contributors
* Andrew Baik
* Kelsey James
* Deepa Kackar
* Joshua Masland-Sarani

Welcome to Reciffy!
====================

What is it?
-----------

Reciffy is a platform for creating, sharing, and saving recipes for those who have a passion for food and cooking. It is a full-stack recipe web app consisting of a ruby on rails API endpoint on the back-end with an AngularJS Single Page App (SPA) on the front-end.

Built within 2 weeks as our final project for [Viking Code School](http://www.vikingcodeschool.com/) hackathon.

Team:
* Andrew Baik
* Joshua David Masland-Sarani
* Kelsey James
* Deepa Kackar

The app implements the following basic features:

* User authentication/authorization using Devise
* Active record and SQL queries into the database for features such as displaying "Top Rated Recipes" or "Recommended Recipes" for the user.
* Using the Paperclip gem alongside with Amazon S3 buckets for image upload handling.
* Basic search for recipes and users by Tags.
* Self-reflective associations (Users can follow each other)
* Polymorphic associations (Users and Recipes can be tagged)
* Nested forms for user profiles
*

Getting started
---------------
[Heroku-Deployed Link](http://reciffy.herokuapp.com/)

To get started, sign-up.

One you are logged in, you will be directed to a leaderboard which shows a variety of statics around active users, their Pokemon knowledge and performance.

Click the "Quiz Me" button in the upper left of the navigation bar to test your Pokemon knowledge.

To follow fellow Pokefans, use the search feature in the middle of the navigation bar to find others by their email. Click on the the link to the user page, select "follow user" button. Pokefans you follow will have their activities displayed in a feed on your leaderboard page.

To edit your profile, click on the "signed-in as" link to go to your profile page. You are able to make any changes from there.

Enjoy!
