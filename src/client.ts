import net from "net";

const connect = net.createConnection({port: 8000}, () => {
    console.log("connected to server");
    connect.write('world!\r\n');

    connect.on("data", (c) => {
        console.log(c);
    })
});