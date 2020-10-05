//Introduce utils.js encapsulated above
let utils = require('./utils.js')
let name = 'gnite'
let password = 'admin123'
let user_ticket = utils.md5(utils.md5(name + utils.md5(password)))
console.log(user_ticket)