const core = require('@actions/core');
const fs = require('fs');

const inputPrefix = "INPUT_ENV_";
const fileName = core.getInput('file-name') || '.env';

try {
  let envFileContent = '';

  Object.keys(process.env).forEach(function(key) {
    if(key.startsWith(inputPrefix)) {
      // JSON.stringify를 사용하여 안전하게 이스케이프 처리
      const value = JSON.stringify(process.env[key]).slice(1, -1); // 양쪽의 따옴표 제거
      envFileContent += `${key.substring(inputPrefix.length)}="${value}"\n`;
    }
  });

  fs.writeFile(fileName, envFileContent, function (error) {
    if (error) {
      core.setFailed(error.message);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
