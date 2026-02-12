import app from "./app.js";
import { connectDB } from "../config/database.js";
import _config from "../config/env.js";

const PORT =  _config.port


async function runServer() {
  await connectDB();
  
  app.listen(PORT, '0.0.0.0',()=>{
    console.log('====================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log('====================================');
  })
}

runServer()