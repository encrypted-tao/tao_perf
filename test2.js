/*  Where contents of data.csv is:
username,password
admin,123
test_user,1234
*/
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./read.csv'), { header: true }).data;
});

export default function () {

  const command = csvData[Math.floor(Math.random() * csvData.length)];

  const payload = {
    "query": command,
  };
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('Command: ', JSON.stringify(params));

  const res = http.post('https://jackie-test.requestcatcher.com/test', payload, params);
  console.log(res);
  check(res, {
    'succeeded': (r) => r.status === 200
  });

  sleep(1);
}
