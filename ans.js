const http = require("http");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 

const server = http.createServer((req, res) => {
  console.log(req.method); // Fixed: 'req.headers' not 'req.header'
  res.setHeader('Content-Type', 'text/html');

  if (req.url == '/') {
    res.write(`
      <html>
        <head>
          <title>FETCH API PAGE</title>
        </head>
        <body>
          <form action="/fetch" method="POST">
            <button>FETCH NAMES AND EMAIL ID'S</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }

  if (req.url == '/fetch' && req.method == 'POST') {

    // Async function to fetch data from the API
    async function getData() {
      try {
        const datum = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await datum.json();

        // Log fetched data to the console
        console.log(data);

        // Send a simple HTML response with the data (just for example)
        let responseHTML = '<h1>Fetched User Data</h1><ul>';
        data.forEach(user => {
          responseHTML += `<li>Name: ${user.name}, Email: ${user.email}</li>`;
        });
        responseHTML += '</ul>';

        res.write(responseHTML);  // Send data back to the client
        return res.end();

      } catch (error) {
        console.log('ERROR', error);  // Fixed: use 'error' instead of 'e'
        res.write("<h1>Something went wrong while fetching data</h1>");
        return res.end();
      }
    }

    getData();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

