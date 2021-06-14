import net from "net";
import { httpRequestParser, httpResponseGenerator } from "./parser"

const server = net.createServer((c) => {
    c.on("data", (data) => {
        console.log(data.toString());
        const request = httpRequestParser(data.toString());
        if (request.path == "/hoge") {
            c.write(httpResponseGenerator({status: 200, body: "hoge"}));
        } else if (request.path == "hogehoge") {
            c.write(httpResponseGenerator({status: 200, body: "hogehoge"}));
        } else {
            c.write(httpResponseGenerator({status: 200, body: "no path"}));
        }
        c.end();
    });
});

server.on("listening", () => {
    console.log("------ listen -------")
})

server.on("connection", (s) => {
    console.log("----- connect -----");
    console.log(s);
})

server.on("error", (e) => {
    console.error(e);
})

server.listen(8000);