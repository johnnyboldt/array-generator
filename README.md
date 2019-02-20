This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development Environment

This was developed on Windows with the backend API service developed in Visual Studio 2017
and the frontend website developed in Visual Studio Code

## Approach

I created the app this way to showcase my ability to do C#, REST, Javascript, Typescript, React and Git..<br>

The backend utilizes injection, command/command handlers, and has unit tests. The backend also has a static memory 10000 array which is (slightly) faster than generating a dynamic memory array before shuffling when obtaining a 10000 item shuffled array. I used the Fisher Yates shuffler algorithm..<br>

I thought it would be neat to add the ability to both shuffle and sort the array, and obtain the output in a few different ways and formats, so I added this additional functionality.

## Running the app

### Run Backend

Download the https://github.com/johnnyboldt/ArrayGenerator.<br>

Open in Visual Studio (I use Visual Studio 2017) and run the app.<br>

**Note the xxxxx port number in the https://localhost:xxxxx/api/ShuffledArray/?minimumNumber=1&maximumNumber=10000.**<br>
**Ensure the PORT variable in this project's globals.tsx is the same xxxxx port number!!!**

### download node and npm install this webapp's packages.

Install npm from https://nodejs.org/en/ <br>
Download https://github.com/johnnyboldt/array-generator <br>
Open command prompt, cd to array-generator location, and run 'npm install' <br>

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

When the app loads you should see something like this:<br>
![alt text](https://github.com/johnnyboldt/array-generator/blob/master/public/screenshot.jpg)

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Issues?

Please do not hestitate to contact me at johnny.boldt@gmail.com
