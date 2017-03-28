Application allows you to create, modify, share forms of questionnaires, and<br>
provides results in the form of graphs.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Dependencies

 * Node.js v6.10.1;
 * MongoDB v3.4;

## Getting Started

### configuring server

In the `server` folder create file `config.js`:

```js
  // ---
  exports.dbUri  = URI_DATABASE;
  exports.secret = SECRET_WORD;
```

Where:
 * `URI_DATABASE` is a uri link to MongoDB database in which all application data will be stored;
 * `SECRET_WORD` is a codeword used for creation and validation token;

### install all dependences

In root folder install client debendences and `react-scripts`:

```sh
npm install
``` 

Then go to server folder and install server dependences:

```sh
cd server
npm install
```

## Usage

### dev mode

To run project in dev mode you should run dev server:

```sh
npm start
```

Then open new terminal and run server that provides API:

```sh
cd server
npm start
```
After all this, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Production mode

At first, in root folder you should type next command:

```sh
npm run build
``` 

This command builds app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

Then you should run server that serves bundles in `build` folder and provides API:

```sh
cd server
npm start
```

## License

MIT