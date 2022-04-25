import express from 'express';
import cors from 'cors';


const app = express(); // Cria um servidor
app.use(cors()); // Permite acesso de qualquer origem
app.use(express.json()); // Permite que o express entenda json

let users = []; // Array de usuários
let tweets = []; // Array de tweets na tela

// Requisição de sign-up
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (username === undefined || avatar === undefined || username === "" || avatar === "" || typeof(req.body) !== "object") {
        res.status(400).send("Todos os campos devem ser preenchidos!");
    } else {
        users.push({ username:username, avatar: avatar });
        res.status(201).send("OK! Usuário cadastrado com sucesso");
    }
});

// Requisição de tweets
app.post("/tweets", (req, res) => {    
    const { tweet } = req.body;
    const user = req.body.username;
    
    const actualUser = users.find(usuario => {
        if (usuario.username === user) {
            return usuario;
        }
    })
    if (user === "" || tweet === "" || user === undefined || tweet === undefined || typeof(req.body) !== 'object') {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        tweets.push({ username: actualUser.username, avatar: actualUser.avatar, tweet });
        console.log("OK")
        console.log(tweets)
        res.status(201).send("OK! Tweet cadastrado com sucesso");
    }
});

app.get('/tweets', (req, res) => {
	let newTweets = tweets.slice(-10);
	res.send(newTweets.reverse());
});

// Configura o servidor para rodar na porta 5000
app.listen(5000, console.log("Server ligado na porta 5000"));