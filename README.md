# Angular-SPARQL-Tutorial
This tutorial intends to enable you to build an easy Angular app, which can query a triple store (here: GrapDB), perform operations based on the retrieved data and to visualize this data to a user. Hereby, you will learn some basics on how to program a web-App with the Angular framework.

## Things to do before we start:

### Set up your IDE
1.) Go to `https://code.visualstudio.com/` and download the IDE for your operating system. <br>
2.) Download the latest stable version of nodeJS from `https://nodejs.org/en/`. This should include the node package manager (npm). <br>
3.) Open a terminal in Visual Studio Code and install the Angular CLI via:
```
npm install -g @angular/cli
```
Now you can start developing an Angular-App!

### Set up your GraphDB

This tutorial requires a local (or remote) graph database. Currently, only GraphDB (see: `http://graphdb.ontotext.com/`) is supported. <br>
1.) Get yourself a local (or remote) access, by installing GraphDB (e.g. GraphDB Free) on your (or remote) device. <br>
2.) After having installed GraphDB, you will have to enable CORS, as the front end currently sends HTTP requests to the DB. This will be done by the back end usually, but for the sake of simplicity in this tutorial, this is done by the Angular App directly. In order to enable CORS, click on `Settings...` in your GraphDB instance (not the Workbench). By default, GraphDB should run on port `http://localhost:7200`. Set the port to `7200`. Write in the text area the following command in order to enable CORS:
```
-Dgraphdb.workbench.cors.enable=true
```
3.) Open your browser and go to `http://localhost:7200`. Go to `"Setup" -> "Repositories" -> "Create new repository"`. Create a new repository called `testdb`. <br>

4.) Now, you can import the .rdf documents that you receive from your tutorial guides during the session. Go to `"Import" -> "RDF" -> "Upload RDF files"` and select the files that you received.

### Git client

This tutorial is based on 4 steps, starting from basic HTML styling and ending with an analysis of RDF data in your app. In order to have everybody on the same page with the start of every new step, you can download a version (branch) for each step. To ease this process, install the github client on your device.<br>
1.) Install the github desktop client from `https://desktop.github.com/`<br>
2.) After having it installed, add the tutorials´ repository `https://github.com/ConstantinHildebrandt/Angular-SPARQL-Tutorial`<br>
3.) Fetch the last commit of the branch `0-HTML-Styling`, this is the starting point of the tutorial

### Install dependencies

Now you should have all the relevant files of the tutorial on your device. In Visual Studio Code, open a terminal in the folder `myTutorialApp`. Type the following command to build the dependencies:
```
cd myTutorialApp
npm install
```
This will install all relevant node modules that are required by the tutorial app. Afterwards, you can start the app via:
```
cd myTutorialApp
ng serve
```
