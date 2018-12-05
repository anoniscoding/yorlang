# Yorlang Programming Language
**Yorlang** was created so we can have fun writing code in one of the native languages (i.e Yoruba) in Nigeria .

## Feature List
- Variable Declaration
- Conditionals & Loops
- Functions & Arrays

For the full documentation showcasing examples and language use, visit the [Website](https://anoniscoding.github.io/yorlang/).

This project assumes you have [Git](https://git-scm.com/downloads) installed. 

# Setup 
For developers to get started with this project, you'll need to create a local copy of the project.

Run the following in your terminal:
```
 git clone https://github.com/anoniscoding/yorlang.git
```

Then change into the local directory, run the following in your terminal:
```
cd yorlang
```


## Docker Setup
If you have [Docker](https://www.docker.com/get-started) installed, you can proceed with the following:

To start a docker container for Yorlang, run this command in the terminal:

```
./start_container.sh
```

``N/B``: You might have permission problems on a Unix, please visit the following [link](https://askubuntu.com/questions/409025/permission-denied-when-running-sh-scripts) to resolve potential file permission issues.

You can then proceed to the **Hello World** Section or the **Unit and Integration Tests** Section to run sample code.

## Non-Docker Setup
If you don't have Docker installed or **you prefer to pollute your PC's environment** :), you'll need to install [Node.js](https://nodejs.org).

This project uses ES6+ features and requires a Node version that supports ES6+ features. 

``N/B``: Yorlang was built with Nodejs ``v8.9.4``

To confirm that you have Node.js installed, run the following in your terminal:
```
node -v
```

You should get something like ``v8.9.4``


#### Install Node.js Modules
To install all dependencies, run the following in your terminal: 
```
npm install
```

#### Link Yorl Command to Terminal
In order to run a file using the ``yorl`` command, run the following: 
```
npm link
```

## Hello World
You can run sample code by running the following in your terminal: 
```
yorl test.yl
```

You should get something like: ``báwo ni ayé``


## Unit and Integration Tests
To run tests in the project, run the following in your terminal: 
```
npm test
```

## Author
- Karounwi Anuoluwapo - @anoniscoding

## License
- [MIT](https://github.com/anoniscoding/yorlang/blob/master/LICENSE)