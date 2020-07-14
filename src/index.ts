import { serve } from "https://deno.land/std@0.57.0/http/server.ts"
import {ApiController} from "./apiController.ts"
import {configFile} from "./types.ts"

const config: configFile = JSON.parse(await Deno.readTextFile("../config.json"))

const ac = new ApiController(config)
const s = serve({ port: 3000 })
console.log("http://localhost:3000/")


for await (const req of s) {
  console.log(`${req.method} ${req.url}`)
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
      break
           
    case "/":
      await req.respond({status: 200, body: await Deno.open('./public/index.html')})
      break
    default:
      await req.respond({status: 404})
      break;
  }
}
