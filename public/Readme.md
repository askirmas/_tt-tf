#TRAVELFACTORY - CONTACT APPLICATION#
The goal of this test is to create an application to manage our contact.

Below you have a .zip with all the assets anf the screen

You are FREE to use your librairies choice (bootstrap, jqery, vue.js, react, etc...) if you decide it.


### HTML / CSS Integration ###
* You have to integrate this two screen in responsive design
* Pay attention to browser compatibility for Chrome (latst version), Firefox (latest version), IE11 and Edge

### JAVASCRIPT - DOM MODIFICATION
In this step, we have to add interactivity to our page

* Delete (trash icon) : delete the contact and modify the DOM
* Edit (pencil icon) :  You can edit all the contact details (without of the contact picture - to save time)
* With the "plus" bouton, you can add a new contact. For simplify, it's not necessary to create an image uploader, you can use the same image for all the new contacts
* Before to post the modification (add or edit), tou have to verify the phone field : it can contain only : number, (), +

### JAVASCRIPT - CALL AJAX
For each contact we want to add the Gps coordinates relative to the adress filled

* Call the API Google : https://maps.googleapis.com/maps/api/geocode/json?address=paris&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8
* Take the object RESULTS > GEOMETRY > LOCATION and display the "lat" and "long" on the contact.

### BITBUCKET - GIT PUSH 
When you finish, you have to : 

* Creat a ne branch with your name
* Push your code in this branch