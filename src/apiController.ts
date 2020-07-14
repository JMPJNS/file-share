import { ServerRequest } from "https://deno.land/std@0.57.0/http/server.ts";
import {getExtension} from "./contentExtension.ts"
import {configFile} from "./types.ts"
export class ApiController {

    private _cache: Array<CacheItem>

    private _apiKeys: Array<string>

    private _basePath: string

    private _baseURL: string

    constructor(config: configFile) {
        this._cache = []
        this._apiKeys = ["1", "2"]

        this._basePath = config.path
        this._baseURL = config.baseurl
    }

    public async HandleUpload(req: ServerRequest) {
        const apiKey = req.headers.get("x-api-key")

        if (!apiKey) {
            req.respond({status: 401, body: "No x-api-key provided"})
            return
        }


        if (!this._apiKeys.includes(apiKey)) {
            req.respond({status: 401, body: "Invalid API Key"})
            return
        }

        const type = req.headers.get("Content-Type")
        
        if (!type) {
            req.respond({status: 400, body: "No Content-Type provided"})
            return
        }
        debugger
        const extension = getExtension(type)

        if (extension == null) {
            req.respond({status: 400, body: "Invalid Content-Type"})
            return
        }

        const data = await Deno.readAll(req.body)
        const timestamp = Date.now()
        const filename = `${timestamp.toString()}.${extension}`

        await Deno.writeFile(`${this._basePath}/${filename}`, data)

        req.respond({status: 200, body: `${this._baseURL}/${filename}`})
    }

    public async HandleDownload(req: ServerRequest) {

    }

}

type CacheItem = {id: number, file: Uint8Array}
