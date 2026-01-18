//#region 
import { EventEmitter } from 'events'
//#endregion


const contractEvents = new EventEmitter()
contractEvents.setMaxListeners(100)


export default contractEvents