module.exports = () => {
  process.exit(0)
}

//this teardown file eliminates the error triggered by using mongoose and jest together.
// for the error to be resolved, this needs to be added to the package.json file as well:
// {
//  //...
//  "jest": {
//     "testEnvironment": "node",
//     "globalTeardown": "./tests/teardown.js"  //ADD THIS LINE
//   }
//  }