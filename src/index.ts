/*var http = require('http');

http.createServer(function (req, res){
    res.write('Hello World!');
    res.end();
}).listen(3000,function(){
    console.log('server start at port 3000');
});*/

import express, {Request, Response } from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/user.routes';


var app = express();

// Middleware to parse JSON
app.use(express.json());

AppDataSource.initialize().then(()=>{
    console.log('connected to PostgreSQL with TYPEORM');
}).catch((error)=>{
    console.log('Error Occurred!!',error);
});

app.use('/users', userRoutes);

app.get('/',(req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('app is  listening to the port 3000 http://localhost:3000/');
});