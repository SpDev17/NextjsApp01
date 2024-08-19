const dotenv = require('dotenv');
dotenv.config();
module.exports = {    
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URI1: process.env.MONGODB_URI1,     
    Secrets_session:process.env.Secrets_session
};