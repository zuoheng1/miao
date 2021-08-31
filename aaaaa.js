var net = require('net')
var sever = net.createServer()
sever.on('connection', (conn) => {
    conn.on('data', data => {
        console.log(data.toString());
        conn.write('HTTP/1.1 200 OK\r\n')
        conn.write('Content-Type: text/html\r\n')
        conn.write('\r\n')
        conn.write(`<meta charset = 'UTF-8'>`)
        conn.write(`<h1>It Works ! ${new Date()}</h1>`)
        conn.end()
    })
})
var port = 8000
sever.listen(port, () => {
    console.log('listening on port', port);
})