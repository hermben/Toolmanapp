
<!-- About this Project -->
## About the Project


### What problem does your project solve? 

  

Initially Quincy datacenter uses handwritten paper sheet for signing out equipment and tools that are meant to be shared. for example, expensive network devices, special tools, USB drive, specific access keys.  

Hand paper sheet are difficult to maintain manage and store especially overtime 

Constant typos make it hard to audit such documents 

Any error or typo requires the auditor to refill all the information on the sheet and reach out to FTEs on the sheet for validation which increases drastically audit resolution time. 

  

### How does it solve the problem? 

  
Creating an application to replace handwritten paper sheet will solve the following issue 

No need to maintain, manage and store handwritten paper sheet. Everything is securely stored in the cloud 

No more typos that make it difficult to audit. Implementing required fields on the form eliminates the possibility of errors. 

Facilitate audits by allowing a more streamlined process with predefined selectable texted and images. 

Faster filling, since check-in, checkout dates and equipment names are prefilled. 

Facilitate access to documents by management for compliance requirements.  

Facilitate archiving and retrieving old documents. 

### Built with

-	Back-End
	-	ASP.NET Core 3.1
	-	MS Sql Server
-	Front-End
	-	React.js
	-	Bootstrap
	-	Azure AD login

<!-- Installation -->
## Installation

### Database Installation
1.	Run MSSql server service 
2.	Please download the database file [datatoolDB](https://github.com/hermben/ToolManagementApp/raw/master/datatoolDB) provided in the backend file project and use the restore Database function of Microsoft SQL Server Managment Studio to install the database.
3.	Use windows authentication service for database.
4.	Get the connection string to the database.
	-	once your are done intalling the database, from visual studio open Server explorer
	-	select icon Sql server object explorer then select add SQL server.
	-	Browse your local directory, open the one with you computer name and connect using windows Authentication.
	-	under SQL server Object Explorer , you can now open a drop down with your laptop name and see all database
	-	select datatoolDB and right click on properties where you can copy the connection string for the database 
	-	copy the connection string. In the next step, you will put it in your backend application file name appsettings.json under connection strings

### Backend Installation
1. Clone the repo
   ```sh
   git clone https://github.com/hermben/ToolManagementApp
   ```
   Preferably using visual studio 2019

2. Add connection string copied from previews step in appsettings.json under **ConnectionStrings.dataToolDB**
3. Run your backend application from Visual Studio with the green play button **IIS Express**



### React front end installation
1. Clone the front-end project from repo
   ```sh
   git clone https://github.com/hermben/Toolmanapp
   ```
   Preferably using Visual Studio Code.

    
2.	Install NPM Packages
Run
    ```sh
    npm install 
    ```
    

3.	Start the front-end application by running 
	```sh
	npm start
	```
 

### Author
-	Herman Benao Microsoft Software developer Leap program .
### License 
Distributed under the MIT License.
