const http = require("http");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const server = http.createServer((req,res)=>{
	console.log(req.method);
	res.setHeader('COntent-Type','text/html');	
	if(req.url=='/'){
		res.write(`<html>
	<head>
		<title>
		FETCH API PAGE
		</title>
	</head>
	<body>
		<form action="/fetch" method="GET">
			<button>FETCH NAMES AND EMAIL ID'S</button>
		</form>
	</body>
	
</html>
`);
		return res.end();
	}

	if(req.url.toLowerCase() =='/fetch' && req.method == 'GET'){
		
		async function getData(){
			try{
				const datum = await fetch('https://jsonplaceholder.typicode.com/users');
				const data = await datum.json();
				console.log(data);
			}catch(error){
				console.log('ERROR ',e);
			}
		}

		getData();
	}
});

const PORT = 3000;
server.listen(PORT, ()=>{
	console.log(`server is running at http://localhost:${PORT}`);
});

