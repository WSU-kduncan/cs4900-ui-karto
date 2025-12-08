# KartoUi

This is the UI repository for the Karto Application. This repository contains the frontend and RESTful API connections with the backend.

## Contributors

- Joshua Wise
- Owen Kemp
- Blake Payne
- Joshua Quaintance

## Tools and Dependencies

### Tools

| Tool        | Version                     | Link                                   |
| ----------- | --------------------------- | -------------------------------------- |
| Git         | `2.52.0` (any)              | https://git-scm.com/                   |
| Node.js     | `LTS (v24.11)`              | https://nodejs.org/en                  |
| NPM         | `11.6` (Comes with Node.js) | https://www.npmjs.com/                 |
| Angular CLI | `^21.0.0`                   | https://github.com/angular/angular-cli |

### Dependencies

| Tool    | Version   | Link                 |
| ------- | --------- | -------------------- |
| Angular | `^21.0.0` | https://angular.dev/ |
| PrimeNG | `^21.0.0` | https://primeng.org/ |

The rest of the dependencies list is listed in the [package.json](package.json) file under `dependencies` and `devDependencies`. Most of those packages will be generated from the tools and dependencies above.

In order to make changes to the repository, you would need to install your preferred Text Editor or IDE.

## Running

### Clone Repository

First, clone the repository to your local device using git

```bash
# Using http
git clone https://github.com/WSU-kduncan/cs4900-ui-karto

# or Using ssh
git clone git@github.com:WSU-kduncan/cs4900-ui-karto
```

Then,

```bash
cd cs4900-ui-karto
```

### Branch

Ensure that you are running on the `main` branch, as it would have the latest stable update of the application.

```bash
git branch
# Should output:

  other-branch
  ...
* main
  ...
```

If you're not in the main branch and you have not made any changes to the working directory, then simply switch

```bash
git switch main

# or

git checkout main
```

### Installing Packages

Before we run the application, we need to install all the dependencies using your preferred package manager. In our case, we will use `npm` that is packaged with our `Node.js`

```bash
npm i
```

This will install the dependencies, and the output should look similar to:

```
added 5 packages, and audited 744 packages in 1s

129 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### **\* Running other parts of the Application**

In order for the UI Application to fully run, the API repository and the database needs to be active. Please follow the direction in the repository given below to run the API and Database.

> [!IMPORTANT]  
> API Repository  
> https://github.com/WSU-kduncan/cs4900-api-karto

### Serving Application

Finally, after all the tasks above, and ensuring that the backend is running, now we can run the UI Application.

```
ng serve
```

Once it is built and ran, simply open `http://localhost:4200/` on your preferred web browser.

## Application Highlights

Below are some videos of what our application can currently do that your clone should be able to do as well (assuming all the tasks above are ran properly)

- Creating an Account and Signing In

<video src="highlights/createandlogin.mp4"></video>
