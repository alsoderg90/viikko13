require('dotenv').config()

let pgUrl = process.env.POSTGRESQL_URI
let PORT = process.env.PORT || 3001
let SECRET = process.env.SECRET


module.exports = {
    pgUrl, PORT, SECRET
}