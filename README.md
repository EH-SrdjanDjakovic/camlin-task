# Frontend Tech Lead / Software Architect Take-Home Technical Test

## Running application locally with npm

### Development mode

After cloning the repository install all dependencies with `npm i`

In order to run the application locally there are two scripts that needs to be executed:

1. `npm run data-server` - will provide necessary json structure for transformers
2. `npm run dev` - to start the application

Application will be available at: `http://localhost:5173`

### Production

To build the applicaiton for production run script: `npm run build`.
<br/><br/>
In order to test built version without deployment one of the options is Live Server extension in VSCode.
<br/>Instructions:

1. Open `dist` folder (which should be created after running the script for build) in new VSCode window
2. install extension Live Server
3. Click on Go Live button
   ![Live Server extension](https://techstacker.com/static/b67ab1adeadeacd5164ee69e6cc07048/5e6b6/vscode-live-server-extension.png)

   > **_NOTE:_** json-server needs to run from repository code base using: `npm run data-server` like in development mode

## Containerized version

This application is hosted as docker image on Docker Hub. It can be pulled running this command:

`docker pull eh0srdjandj/test-app:latest`

After downloading image successfully run the container by executing following command:

`docker run -p 5001:80 -p 3000:3000 camlin-test-app`

After running docker container open browser with `http://localhost:5001`
