const http = require('http')
const fs = require('fs')
const path = require('path')


const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><head><title>Hello Node!</title></head>');
    res.write('<body>');
    res.write('<h1>Hello Node!</h1>');
    res.write('<a href="/read-message">Read Message</a>');
    res.write('<a href="/write-message">Write Message</a>');
    res.write('</body></html>');
    res.end();
  }
  if (req.url === '/read-message' && req.method === 'GET') {
   const messagePath = path.join(__dirname,'message.txt')
   fs.readFile(messagePath, (err, content) => {
    if (err) {
        if (err.code === 'ENOENT') {
            //404 - page not found
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html') //MIME
            res.write(`
                <html>
                    <body>
                        <h1>Opps! Page not found!</h1>
                    </body>
                </html>
            `)
            res.end()
        } else {
            //500
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/html') //MIME
            res.write(`
                <html>
                    <body>
                        <h1>Opps! A Server Error has occurred</h1>
                    </body>
                </html>
            `)
            res.end()
        }
    }else{
        //Success
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(content, 'utf8')
    }
})
  }
  if (req.url === '/write-message' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Write Message</title></head>');
        res.write('<body>');
        res.write('<form method="post" action="/write-message">');
        res.write('<input type="text" name="message">');
        res.write('<input type="submit" value="Submit">');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
      }
      if (req.url === '/write-message' && req.method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
          body.push(chunk);
        });
        req.on('end', () => {
          const parseBody = Buffer.concat(body).toString()
          const message = parseBody.split("=")[1].split("+").join("")

          fs.writeFile('message.txt', message, (err) => {
            if (err) {
              if(err) throw err
              res.statusCode = 302
              res.setHeader('Location', '/')
              return res.end()
            }
          });
        });
      }
  } );





  
server.listen(8000, () => {
  console.log('Server started on port 8000');
});
