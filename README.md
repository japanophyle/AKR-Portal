
![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# American Kyudo Renmei Portal

## Description

#### Duration: Two Week Sprint

The American Kyudo Renmei (AKR) Portal is a react based web application created by [Hannan Mir](https://github.com/hannanmir), [Karl Beck](https://github.com/karljohnbeck), [Alex Severson](https://github.com/AseSever), and [Emerson Aagaard](https://github.com/emersona-glitch). The AKR portal was created for the [American Kyudo Renmei](kyudousa.com). The AKR portal allows the AKR to manage all of their students in various dojos across America and internationally. This app was created to serve the needs of both the students of Kyudo and the teachers/ administrators. Kyudo is life long martial art, and thus is practiced by students of all ages. As a result easy of use and readiblity were both key themes for us when designing the AKR Portal.

The functionality available to students includes the ability to manage their basic contact information, kyudo information (ranks, membership IDs), and view payment details/ dues dates. Students can also see all other students in their dojo and view their ranks in a virtual bulletin board (My Dojo View).

There are two levels of administration included in the AKR Portal. Dojo admins can manage all the students only in their dojo. This level makes up the bulk of the functionality of the application. When dojo admins are viewing their dojo (Member List View) they see all the students in their dojo and can execute the following actions: change the authorization level of an account, set dues amount and date, navigate to information page for a student, view and edit notes for a student, view and edit equipment checkout/ rental for a student, and deactivate or delete a student's account. Sitewide or national admins can view and manage any dojo in the application. This admin level is the most powerful and can create or delete new dojos, and assign dojo admins to them.

The AKR Portal is an extensive application that will make the lives of teachers/ and administrators at the AKR much easier. Compared to the older system of administrators having to manually manage the data of all their students on an excel document and communicating and sharing these changes by emailing the document around, the AKR portal will have a significant impact on decreasing the headache and strain of managing the information and data on students of kyudo nationwide.

## Screenshots

#### Member List (Dojo Admin +)
![Member List (Dojo Admin +)](https://github.com/American-Kyudo-Renmei-Portal/AKR-Portal/blob/wip/public/images/memberlist.png)
#### National Dojo List (National Admin Only)
![National Dojo List (National Admin Only)](https://github.com/American-Kyudo-Renmei-Portal/AKR-Portal/blob/wip/public/images/national-dojo-list.png)
#### My Dojo
![My Dojo](https://github.com/American-Kyudo-Renmei-Portal/AKR-Portal/blob/wip/public/images/my-dojo.png)
#### User Information
![User Information](https://github.com/American-Kyudo-Renmei-Portal/AKR-Portal/blob/wip/public/images/user-information.png)
#### New User Registration
![New User Registraton](https://github.com/American-Kyudo-Renmei-Portal/AKR-Portal/blob/wip/public/images/new-user-registration.png)


## Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Redux.js](https://redux.js.org/)
- [Sweetalert](https://sweetalert.js.org/)
- [Material-UI](https://material-ui.com/)
- [PostgreSQL](https://www.postgresql.org/download/)


## Installation

1. Create a database named `akr_portal`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

### New User Registration 
1. Choose a username and password then hit `REGISTER` to navigate to the input forms.
2. Input all the forms on the screen.
3. Any fields marked with an `*` are required.
4. Select the dojo you are requesting to be added to.
5. If you are a current practitioner of Kyudo select the current member checkbox and fill the information where relevant.
6. Once all the pertinent fields have been filled hit `SUBMIT` to finish.
7. Your account will be inactive until it is activated by an Administrator.

### Current Student +
1. Upon login current students are brough to the My Dojo view
2. The My Dojo view shows all the students in your dojo including their names in english and japanese and their relevant Kyodu ranks.
3. Clicking the `Info Page` in the Navbar will redirect you to your profile page.
4. The profile page contains all the information you submitted seperated into categories.
5. Hitting the pencil (Edit) icon will allow you to edit any information in that category.
6. When you are done updating/ editing hit the `SUBMIT` button to save the edits.
7. If you would like to cancel any edits hit the `CANCEL` button to revert the changes.

### Dojo Administrator +
1. Upon login dojo admins are brought to the My Dojo view.
2. Clicking the `Member List` in the Navbar will redirect you to information for your specific dojo.
3. In the Memeber List view you can see all the members in your dojo as well inactive accounts requesting to join the dojo in the non-acitve members table below.
4. Clicking the `SET DUES` button will open a dialog that will let you set a dues amount as well as due date.
5. After providing the information and hitting `SAVE` it will be updated for all users in your dojo.
6. Clicking the `MEMBER DETAILS` button under the More column will allow you to navigate to a users profile page where you can manage any of the user's data including payment information.
7. Clicking the `ADD NOTES` button in the notes column will open a dialog that will allow you to enter both notes and equipment checkout information for a user.
8. Clicking the `SAVE` button will save these notes, and the `CANCEL` button will cancel the action and close the dialog.
9. Under the status column for a user's account hitting `DEACTIVATE` will demote that user back to inactive status similar to when they had initially registered.
10. All user information is still preserved but their account will be moved from the upper active users table to the lower inactive users table.
11. If you wish to reactivate a user then simply hit the `ACTIVATE` button in the non-active table.
12. For activating any users requesting to join your dojo you must also hit the `ACTIVATE` button in the non-active table.

### National Administrator
1. Upon logging in national admins are brought to the National Dojo List view.
2. This view shows all dojos that are a part of the AKR Portal.
3. Clicking the `CREATE DOJO` button at the top will open a dialog that allows for the creation of a dojo.
4. Dojo name, region, and admin account must be provided for dojo creation. 
5. The admnin account selector will be populated with all eligible accounts that are at least dojo admin level.
6. Clicking the `CREATE DOJO` plus sign button with all the information provided will create the dojo and assign the specified admin to it.
7. Clicking the `DELETE` icon in the National Dojo table will prompt you to delete a dojo.
8. Deleting a dojo will not delete the users inside the dojo, but instead will set their dojo_id as null and will need to be reassigned to another dojo.
7. Clicking the `MANAGE` launch icon for a dojo in the National Dojo table will navigate you to that dojo's Member List.
8. National admins have all the actions that a dojo admin has for their specific dojo, but they can manage ANY dojo.
9. National admins can also hit the `DELETE USER` trash icon under the remove column to delete a user account and information permanently.

## Built With

- React
- Redux
- Node.js
- PostgreSQL
- Axios
- Sweetalert
- Material-UI

## Acknowledgement

Thanks to the American Kyudo Renmei and their Vice President, Carly Born, for approaching us to build this application for them. This was a fantastic and fulfilling experience and we are grateful to have had the oppurunity to learn, and showcase our programming abilities. We hope that this app will serve the AKR well and that we as developers can continue to grow and strenghten our own knowledge. 

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality. Special thanks to our instrucors [Dane Smith](https://github.com/DoctorHowser) and [Kris Szafranski](https://github.com/kdszafranski).

## Support

If you have suggestions or issues, please email us at [hannanmir2@gmail.com](mailto:hannanmir2@gmail.com), [karljohnbeck@gmail.com](mailto:karljohnbeck@gmail.com), [alexsvrsn@gmail.com](mailto:alexsvrsn@gmail.com), [emerson.aagaard@gmail.com](mailto:emerson.aagaard@gmail.com)
