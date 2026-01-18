//#region 
import dotenv from 'dotenv'
//#endregion


//#region 
dotenv.config();
const _config = {
  port: process.env.PORT || 9001,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  jwt_secret_key:  process.env.JWT_SECRET_KEY,
  sysManager_email: process.env.SYS_MANAGER_EMAIL,
  sysManager_pass: process.env.SYS_MANAGER_PASS,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  rentora_email: process.env.RENTORA_EMAIL
}
//#endregion

//#region 
export default _config;
//#endregion


//#region 
  //TODO: USE: npm install eslint --save-dev then npx eslint --init
//#endregion