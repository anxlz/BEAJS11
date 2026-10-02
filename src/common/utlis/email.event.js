import { EventEmitter } from "node:events"
import { sendEmail } from "./send.email.js"

export const emailEvent=new EventEmitter()

emailEvent.on("sendEmail",async({recipients,subject,data})=>{
    try{
        await sendEmail({
            to:recipients.to,
            subject,
            html:`<h2>${subject}</h2><p>Your verification code is:</p><h1>${data.code}</h1><p>This code expires shortly, do not share it with anyone.</p>`
        })
    }catch(error){
        console.log("Send Email Error",error)
    }
})
