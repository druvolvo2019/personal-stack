const fs = require('fs')

class MyCustomReporter {
  constructor(globalConfig, options) {
    this._output = []
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunStart(contexts, results) {
    this._output.push({
      event: 'onRunStart',
      results
    })
  }

  onTestStart(contexts, results) {
    this._output.push({
      event: 'onTestStart',
      results
    })
  }

  onTestResult(contexts, results) {
    this._output.push({
      event: 'onTestResult',
      results
    })
  }

  onRunComplete(contexts, results) {
    // console.log('Custom reporter output:');
    // console.log('GlobalConfig: ', this._globalConfig);
    // console.log('Options: ', this._options);

    function removeFormatting(line) {
      return line.replace(/(\u001b\[\d+m)/g, '')
    }

    function cleanUpTestResults(testResults) {
      return testResults.map(result => {
        return {
          numFailingTests: result.numFailingTests,
          numPassingTests: result.numPassingTests,
          numPendingTests: result.numPendingTests,
          numTodoTests: result.numTodoTests,
          perfStats: result.perfStats,
          testFilePath: result.testFilePath,
          testResults: result.testResults.map(line => {
            return {
              ...line,
              failureMessages: line.failureMessages.map(l => removeFormatting(l))
            }
          })
        }
      })
    }

    function cleanUp(source) {
      return {
        numFailedTestSuites: source.numFailedTestSuites,
        numFailedTests: source.numFailedTests,
        numPassedTestSuites: source.numPassedTestSuites,
        numPassedTests: source.numPassedTests9,
        numPendingTestSuites: source.numPendingTestSuites,
        numPendingTests: source.numPendingTests,
        numRuntimeErrorTestSuites: source.numRuntimeErrorTestSuites,
        numTodoTests: source.numTodoTests,
        numTotalTestSuites: source.numTotalTestSuites,
        numTotalTests: source.numTotalTests,
        success: source.success,
        testResults: cleanUpTestResults(source.testResults)
      }
    }

    this._output.push({
      event: 'onRunComplete',
      contexts: contexts,
      results: results
    })
    fs.writeFile('test/jest/test-results.json', JSON.stringify(cleanUp(results)))
  }
}

module.exports = MyCustomReporter;
