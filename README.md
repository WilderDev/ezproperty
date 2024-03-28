# Angular2024StarterTemplateWithAuthAndTailwindCSS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Starting / Working on App

1. Clone git repo and create a branch to work from base off staging branch

2. Pull any changes from staging to current branch you are working on

3. Start a new terminal and run `npm i` to install all dependencies and dev dependencies

4. Run `ng serve` to build and run app and navigate to localhost:4200 the app is running on

5. Work on feature and test to make sure all changes are working. commit changes to git and push all changes on branch

6. When ready to merge branch make sure to resolve any conflicts with code on staging branch before creating a pull request. Make sure you are merging into staging branch NOT main.

## BackEnd Git Repo

If needed, backend repo for this code can be found here [NodeJS-2024-Starter-Template-With-Auth](https://github.com/WilderDev/NodeJS-2024-Starter-Template-With-Auth)

## Features List

-   auth with login and register
-   landing page
-   navbar
-   crud
-   guards
-   interceptor
-   services

## Naming Convention

TBD

## Hosting Guide

1. To build your application for production, use the `ng build` command. By default, this command uses the production build configuration.This command creates a dist folder in the application root directory with all the files that a hosting service needs for serving your application.
   If the above ng build command throws an error about missing packages, append the missing dependencies in your local project's package.json file to match the one in the downloaded StackBlitz project.

2. Copy the contents of the `dist/my-project-name` folder to your web server. Because these files are static, you can host them on any web server capable of serving files; such as `Node.js`, Java, .NET, or any backend such as [Firebase](https://firebase.google.com/docs/hosting), [Google Cloud](https://cloud.google.com/solutions/web-hosting), or [App Engine](https://cloud.google.com/appengine/docs/standard/hosting-a-static-website). For more information, see [Building & Serving](https://angular.io/guide/build) and [Deployment](https://angular.io/guide/deployment).
