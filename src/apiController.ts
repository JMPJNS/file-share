import { ServerRequest } from "https://deno.land/std@0.57.0/http/server.ts";

export class ApiController {

    private _cache: Array<CacheItem>

    private _apiKeys: Array<string>

    constructor() {
        this._cache = []
        this._apiKeys = ["1", "2"]
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
        const type = req.headers.get("x-api-key")
        const data = await Deno.readAll(req.body)

        await Deno.writeFile("newimage.png", data)
        console.log(data.length)

        req.respond({status: 200, body: "no"})
    }

    public async HandleDownload(req: ServerRequest) {

    }

}

type CacheItem = {id: number, file: Uint8Array}
