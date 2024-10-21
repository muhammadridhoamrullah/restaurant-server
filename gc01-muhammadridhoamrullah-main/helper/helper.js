const bcrypt = require('bcryptjs');

function hashing (value) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(value, salt)
    return hash
}

module.exports = hashing