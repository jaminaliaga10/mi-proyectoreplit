import express from 'express';
import fs from 'fs';

const app = express();
const readline = await import('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('cajahuancayo.txt'),
  crlfDelay: Infinity
});

let users = [];

rl.on('line', (line) => {
  if (line.startsWith("D11") && users.length < 10) {
    const dni = line.substring(62, 73);
    const fechaPago = `${line.substring(542, 544)}${line.substring(544, 546)}/${line.substring(546, 548)}`;
    const montoPago = parseInt(line.substring(525, 537));
    const nombre = line.substring(224, 374).trim();

    users.push({ dni, fechaPago, montoPago, nombre });
  }

  if (users.length === 10) {
    rl.close();
  }
});

app.get('/', (req, res) => {
  res.json(users);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
