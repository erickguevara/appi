const router = require('express').Router()
const conexion = require('./config/conexion')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')

const multiPartMiddleware = multipart({

    uploadDir:'./uploads'
})
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extends:true
}));
router.get('/',(req , res)=>{
	let sql = 'select * from persona as p inner join grado as g on p.nid_grado=g.nid_grado'
	conexion.query(sql,(err, rows, fields)=>{
		if (err) throw err;
		else{
			res.json(rows)
		}
	})

})

router.get('/grado',(req , res)=>{
    let sql = 'select * from grado'
    conexion.query(sql,(err, rows, fields)=>{
        if (err) throw err;
        else{
            res.json(rows)
        }
    })

})
// get un persona

//upload
router.post('/upload',multiPartMiddleware,(req, res)=>{ 
    var prueba= req.files.uploads[0].path.slice(8,req.files.uploads[0].path.length);
    
    res.json(
       prueba
     );
});
//agregar persona
router.post('/',( req, res)=>{

    const{nom_persona, ape_pare_pers,ape_mate_pers,nid_grado,fecha_naci,foto_ruta} = req.body

    let sql = `CALL ProcedimientoInsertar('${nom_persona}','${ape_pare_pers}','${ape_mate_pers}','${nid_grado}','${fecha_naci}','${foto_ruta}')`

    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{

            res.json(rows[0])
        }
    })
})
router.post('/detalle_cronograma',( req, res)=>{
    console.log(req.body);
    const{id, id_grado} = req.body
    let meses = ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    
     for (var i = 2; i < meses.length; i++) {
        const ultimoDia = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        
        fecha = new Date(2021, meses.indexOf(meses[i]) + 1, 0);
        fecha=fecha.toLocaleDateString();
        let sql = `insert into detalle_cronograma(id_cronograma, desc_pension,monto,fecha_venci,id_grado) values('1','${meses[i]}',450,'${fecha}','${id_grado}')`;
     

    }
    

    //
    //conexion.query(sql, (err, rows, fields)=>{
        //if(err) throw err
        //else{

        //    res.json(rows[0])
      //  }
    //})
})

//up

//eliminar 
router.delete('/:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from persona where nid_persona = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'persona eliminado'})
        }
    })
});

router.get('/image/:img', function(req, res){
  const{img} = req.params
    res.sendFile( __dirname + `/uploads/${img}` );
}); 
//modificar


module.exports= router;
