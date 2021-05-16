require('./config/conexion');

const express = require('express');
const port = (process.env.port || 3000);

const app = express();

app.set('port',port);
app.use(express.json())
app.use('/api',require('./rutas'))

app.listen(app.get('port'),(error)=>{
	if(error){
		console.log(' erro al inicio servidor'+ error)

	}else{
		console.log('servidor iniciado en el puerto'+port)
	}
})
