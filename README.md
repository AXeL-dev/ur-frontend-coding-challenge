# Front-end Coding Challenge

This repository is my own implementation of the [United Remote front-end coding challenge](https://github.com/hiddenfounders/frontend-coding-challenge).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

[View Demo](https://axel-dev.github.io/ur-frontend-coding-challenge/)

## Implemented features

* [x] As a User I should be able to list the most starred Github repos that were created in the last 30 days.
* [x] As a User I should see the results as a list. One repository per row.
* [x] As a User I should be able to see for each repo/row the following details :
 - Repository name.
 - Repository description.
 - Number of stars for the repo.
 - Number of issues for the repo.
 - Username and avatar of the owner.
* [x] As a User I should be able to keep scrolling and new results should appear (pagination).

## Used technologies

- **Angular**.
- **Materialize-css** for styling.
- **ngx-infinite-scroll** to load more results on page scroll.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
