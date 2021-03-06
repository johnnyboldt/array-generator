This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development Environment

This was developed on Windows with the backend API service developed in Visual Studio 2017 and the frontend website was developed in Visual Studio Code on Windows 10 and tested with Chrome.

## Approach

I created the app this way to showcase my ability to do C#, REST, Javascript, Typescript, React and Git.<br>

The .net Core WebApi backend utilizes dependency injection, command/command handlers, and has Moq unit tests. The backend also has a static memory 10000 array which is (slightly) faster than generating a dynamic memory array before shuffling when obtaining a 10000 item shuffled array. I used the Fisher Yates shuffler algorithm.<br>

I thought it would be neat to add the ability to both shuffle and sort the array, allow a range of minimum and maximum numbers, and obtain the output in a few different mediums and formats, so I added this additional functionality.

## Running the app

### Run Backend

Download the https://github.com/johnnyboldt/ArrayGenerator.<br>

Open in Visual Studio (I use Visual Studio 2017) and run the app.<br>

**Note the xxxxx port number in the https://localhost:xxxxx/api/ShuffledArray/?minimumNumber=1&maximumNumber=10000.**<br>
**Ensure the PORT variable in this project's globals.tsx is the same xxxxx port number!!!**

### Download node and front end app

Install npm from https://nodejs.org/en/ <br>
Download https://github.com/johnnyboldt/array-generator <br>

### Install the package dependencies
Open command prompt, cd to array-generator directory, and run `npm install` to install the node package dependencies.<br>

### Run the Frontend
In command prompt, cd to array-generator directory, and run `npm start` to run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. App is only supported in Chrome. Firefox has a CORS issue (due to no domain for SSL cert?) and Edge has a bug in Copy Text to Clipboard.

When the app loads you should see something like this:<br>
![alt text](https://github.com/johnnyboldt/array-generator/blob/master/public/screenshot.jpg)
The app provides the ability to:
- specify a different minimum and maximum number
- sort the array in different ways (including shuffle)
- specify different combinations of delimiters
- copy the array to your clipboard
- download the array in two different filetypes

## Additional potential work

If I was to continue building this app, I would:
- [ ] Refactor out the front end code and pass the default values to props so I could add some more front end unit tests using props.
- [ ] Make the backend async to support multiple browser sessions.
- [ ] Add some entity framework/SQL Server usage.
- [ ] Add support for larger range than -15000 to 15000.
- [ ] Add full support for Edge and Firefox.

## Issues?

Please do not hestitate to contact me at johnny.boldt@gmail.com
