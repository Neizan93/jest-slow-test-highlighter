# jest-slow-test-highlighter

A custom Jest reporter that identifies and reports on the slowest running tests in your test suite.

## Installation

Install the package using npm:

```bash
npm install jest-slow-test-highlighter --save-dev
```

## Usage

In your Jest configuration file (e.g., `jest.config.js`), add `jest-slow-test-highlighter` to your list of reporters:

```javascript
module.exports = {
  // ... other Jest configuration options
  reporters: ["default", "jest-slow-test-highlighter"]
};
```

## Configuration Options

You can customize the behavior of the reporter by providing configuration options:

```javascript
module.exports = {
  // ... other Jest configuration options
  reporters: [
    "default",
    ["jest-slow-test-highlighter", {
      maxTests: 10, // Maximum number of slow tests to display. Default is 10.
      slowSeconds: 5 // Threshold in seconds to consider a test as "slow". Default is 5 seconds.
    }]
  ]
};
```

### Options

* **maxTests**: Determines the maximum number of slow tests to display in the report. Default value is 10.
    
* **slowSeconds**: The threshold in seconds to classify a test as "slow". Any test that runs longer than this threshold will be considered slow and will be reported. Default value is 5 seconds.
    

## License

[MIT](./LICENSE)

