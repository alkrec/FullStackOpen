# React application

This application is created from create-react-app.

Install dependencies with `npm install`

You can run the application in development mode with `npm start`

You can build static files for production release with `npm run build`

You can run tests with `npm run test`

## Environment variables

Use REACT_APP_BACKEND_URL to set where the backend for this application is.



docker ps
docker images
docker build -t frontend .
docker run -p 3000:3000 frontend
docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" frontend
docker run -it -p 3000:3000 frontend bash
