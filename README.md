# RDAP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Start Application

1. Run `npm run build:dev` for a dev server. Navigate to `http://localhost:8080/` for application access. The app will automatically reload if you change any of the source files.

2. Run nginx command on web server to start the web server and access the application. The following ports are reserved for web applications 

Port Number   | Status
------------- | -------------
   9090       | Unused
   8080       | Used
   7070       | Unused
   6060       | Unused
   5050       | Unused
   4040       | Unused
   3030       | Unused
   2020       | Unused
   1010       | Unused

## Build

**Development Environment:**

In **sydc-appdev-01** environment, first make sure that you're logged-in using the DEV service account which is **svc-d-dotnetapp**. Once you're logged-in as svc-d-dotnetapp then please switch to directory D:\Projects. Open "GitHub Deskop" and make sure that directory is having latest code available.

Run the following `npm` command to build the project. The build artifacts will be stored in the `dist/` directory.

1. npm adduser --registry=https://packages.infragistics.com/npm/js-licensed/ --scope=@infragistics --always-auth
This command will ask for the infragistics username and password. Enter the license username and password provided by infragistics team. Only three license are available for RDAP team, please reach-out to Manoj Negi, Ramesh Chinnagoundar or Laltu Dey for any further details on this. 
2. npm i
3. npm run build:dev
4. Stop the nginx server by running the command nginx -s stop
In case, system does not respond to the request then place taskkill /f /im nginx.exe using elevated privilages. 
5. Once the server is stopped then remove the old directory from C:\nginx\RDAP 
6. Place the content inside the <DRIVE-LETTER>\Projects\rdap-presentation\Dist folder to C:\nginx\RDAP folder.
7. Start the nginx server by going into the directory C:\nginx and then running the command as nginx

**Test Environment:**

In **syde-webtst-0**1 environment, first make sure that you're logged-in using the TEST service account which is **svc-t-dotnetapp**. Once you're logged-in as svc-t-dotnetapp then please switch to directory D:\Projects. Open GitHub Deskop and make sure that directory is having latest code available.

Run the following `npm` to build the project. The build artifacts will be stored in the `dist/` directory.

1. npm adduser --registry=https://packages.infragistics.com/npm/js-licensed/ --scope=@infragistics --always-auth
This command will ask for the infragistics username and password. Enter the license username and password provided by infragistics team. Only three license are available for RDAP team, please reach-out to Manoj Negi, Ramesh Chinnagoundar or Laltu Dey for any further details on this. 
2. npm i
3. npm run build:qa
4. Stop the nginx server by running the command nginx -s stop
In case, system does not respond to the request then place taskkill /f /im nginx.exe using elevated privilages. 
5. Once the server is stopped then remove the old directory from C:\nginx\RDAP 
6. Place the content inside the <DRIVE-LETTER>\Projects\rdap-presentation\Dist folder to C:\nginx\RDAP folder.
7. Start the nginx server by going into the directory C:\nginx and then running the command as nginx

**Production Environment:**

In **syde-webprd-0**1 environment, first make sure that you're logged-in using the PROD service account which is **svc-p-dotnetapp**. Once you're logged-in as svc-p-dotnetapp then please switch to directory D:\Projects. Open GitHub Deskop and make sure that directory is having latest code available.

Run the following `npm` to build the project. The build artifacts will be stored in the `dist/` directory.

1. npm adduser --registry=https://packages.infragistics.com/npm/js-licensed/ --scope=@infragistics --always-auth
This command will ask for the infragistics username and password. Enter the license username and password provided by infragistics team. Only three license are available for RDAP team, please reach-out to Manoj Negi, Ramesh Chinnagoundar or Laltu Dey for any further details on this. 
2. npm i
3. npm run build:prd
4. Stop the nginx server by running the command nginx -s stop
In case, system does not respond to the request then place taskkill /f /im nginx.exe using elevated privilages. 
5. Once the server is stopped then remove the old directory from C:\nginx\RDAP 
6. Place the content inside the <DRIVE-LETTER>\Projects\rdap-presentation\Dist folder to C:\nginx\RDAP folder.
7. Start the nginx server by going into the directory C:\nginx and then running the command as nginx
  
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
