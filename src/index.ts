import { serve } from "https://deno.land/std@0.57.0/http/server.ts"
import {ApiController} from "./apiController.ts"

const ac = new ApiController()

const s = serve({ port: 3000 })
console.log("http://localhost:3000/")

for await (const req of s) {

    switch (req.url) {
        case "/api":
            if(req.method == "GET") {
                await ac.HandleDownload(req)
            }
            else if(req.method == "POST") {
                await ac.HandleUpload(req)
            } else {
                await req.respond({status: 405})
            }
            break;
            
        default:
            await req.respond({status: 404})
            break;
    }
    
}