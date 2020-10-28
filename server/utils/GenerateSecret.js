const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'a secret'); //insert a random string you can think of

hmac.update('some data to hash'); //enter another random string
console.log(hmac.digest('hex')); //copy this output and use it as your secret