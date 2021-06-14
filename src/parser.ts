// TODO: GET | PUT | POSTみたいにする方がいい
type  RequestMethod = string
type HTTPRequest = {
    method: RequestMethod,
    host: string,
    path: string
}

type HTTPResponse = {
    body: string,
    status: number,
}

export const httpResponseGenerator = ({status, body}: HTTPResponse): string => {

return `HTTP/1.1 ${status} OK

${body}`;
    // `HTTP/1.1 200 OK`;
}

export const httpRequestParser = (data: string): HTTPRequest => {
    let index = 0
    const datas = data.split("\n");

    const [method, path, version] = datas[0].split(" ");
    let host = "";
    // TODO: for文で書いた方がいいところ, 無駄に全部のヘッダー見てる
    datas.forEach((header) => {
        if (header.startsWith("HOST: ")) {
            const [key, value] = header.split(" ");
            host = value;
        }
    })
    return {
        method,
        host,
        path,
    }
}


// ブラウザからのリクエストサンプル
// GET / HTTP/1.1
// Host: localhost:8000
// Connection: keep-alive
// Cache-Control: max-age=0
// sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
// sec-ch-ua-mobile: ?0
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// Sec-Fetch-Site: none
// Sec-Fetch-Mode: navigate
// Sec-Fetch-User: ?1
// Sec-Fetch-Dest: document
// Accept-Encoding: gzip, deflate, br
// Accept-Language: ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7

// Response 例
// HTTP/1.1 200 OK
// Accept-Ranges: bytes
// Age: 342706
// Cache-Control: max-age=604800
// Date: Mon, 14 Jun 2021 12:58:23 GMT
// Expires: Mon, 21 Jun 2021 12:58:23 GMT
// Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
// Server: ECS (oxr/831E)
// Vary: Accept-Encoding
// X-Cache: HIT
// Content-Encoding: gzip
// Content-Type: text/html; charset=UTF-8
// Etag: "3147526947"
// Content-Length: 648