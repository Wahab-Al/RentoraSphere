//#region 
import dotenv from 'dotenv'
//#endregion


//#region 
dotenv.config();
const _config = {
  port: process.env.PORT || 9001,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV
}
//#endregion

//#region 
export default _config;
//#endregion


//#region 
//TODO: USE: npm install eslint --save-dev then npx eslint --init
//#endregion