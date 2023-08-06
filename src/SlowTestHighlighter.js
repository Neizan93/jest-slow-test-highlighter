class SlowTestHighlighter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this._slowTests = [];
  }

  onRunComplete() {
    console.info();
    this._slowTests.sort((a, b) => b.duration - a.duration);
    let slowestTests = this._slowTests.slice(0, this._options.maxTests || 10);
    let slowSeconds = this._options.slowSeconds || 5;
    slowestTests = slowestTests.filter(test => (test.duration / 1000) > slowSeconds);
    let slowTestTime = this._slowTestTime(slowestTests);
    let allTestTime = this._allTestTime();
    let percentTime = (slowTestTime / allTestTime) * 100;

    if (!slowestTests.length) return;

    console.info(
      `Top ${slowestTests.length} slowest examples exceding ${slowSeconds} seconds. (${slowTestTime / 1000} seconds,` +
        ` ${percentTime.toFixed(2)}% of total time):`
    );

    for (const element of slowestTests) {
      let duration = element.duration;
      let fullName = element.fullName;

      console.info();
      console.info(`  ${fullName}`);
      console.info(`    ${duration / 1000} seconds`);
    }
    console.info();
  }

  onTestResult(_test, testResult) {
    for (const element of testResult.testResults) {
      this._slowTests.push({
        duration: element.duration,
        fullName: element.fullName,
        filePath: testResult.testFilePath,
      });
    }
  }

  _slowTestTime(slowestTests) {
    let slowTestTime = 0;
    for (const element of slowestTests) {
      slowTestTime += element.duration;
    }
    return slowTestTime;
  }

  _allTestTime() {
    let allTestTime = 0;
    for (const element of this._slowTests) {
      allTestTime += element.duration;
    }
    return allTestTime;
  }
}

module.exports = SlowTestHighlighter;
