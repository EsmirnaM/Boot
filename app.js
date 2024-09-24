import express from 'express';
import venom from 'venom-bot';

const app = express();
app.use(express.json());

let client;

// Caminho do executável do Opera
const browserPath = 'C:\\Program Files\\Opera\\launcher.exe'; // Altere se necessário

venom.create({
    session: 'apizap',
    multidevice: true,
    headless: false, // Para visualizar o navegador
    executablePath: browserPath // Caminho do Opera
}).then((c) => {
    client = c;
    console.log('Cliente criado com sucesso');

    // Escutando mensagens
    client.onMessage((message) => {
        console.log('Mensagem recebida:', message);
    });

}).catch((erro) => {
    console.error('Erro ao criar cliente:', erro);
});

app.post('/send', (req, res) => {
    const { to, message } = req.body;
    if (client) {
        client.sendText(to, message)
            .then(() => {
                res.status(200).send('Mensagem enviada com sucesso');
            })
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
                res.status(500).send('Erro ao enviar mensagem: ' + error);
            });
    } else {
        res.status(500).send('Cliente não está disponível');
    }
});

const PORT = 3000; // ou outra porta que você escolher
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
