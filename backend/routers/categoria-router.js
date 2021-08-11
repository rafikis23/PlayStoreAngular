var express = require('express');
var router = express.Router();
var categoria = require('../models/categoria');
var mongoose = require('mongoose');
//Obtener todas las categorias
router.get('/', function(req, res){
    categoria.find({}, {_id:true, nombreCategoria:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    })
});

//Obtener aplicaciones segun la categoria seleccionada
router.get('/:idCategoria/aplicaciones', function(req, res){
    categoria.find({_id: req.params.idCategoria}, {"aplicaciones":true})
    .then(data=>{
        res.send(data[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//Obtener el detalle de una aplicacion seleccionada
router.get('/:idCategoria/aplicaciones/:idAplicacion/detalle', function(req, res){
    categoria.find(
        {
            _id:req.params.idCategoria,
            "aplicaciones._id": mongoose.Types.ObjectId(req.params.idAplicacion)
        },
        {
            "aplicaciones.$":true
        }
    )
    .then(data=>{
        res.send(data[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
})
//Agregar un comentario a una aplicacion
router.post('/:idCategoria/aplicaciones/:idAplicacion/comentario', function(req, res){
    categoria.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria),
            "aplicaciones._id": mongoose.Types.ObjectId(req.params.idAplicacion)
        },
        {
            $push:{
                "aplicaciones.$.comentarios":{
                    _id: mongoose.Types.ObjectId(),
                    comentario: req.body.comentario,
                    calificacion: req.body.calificacion,
                    fecha: req.body.fecha,
                    usuario: req.body.usuario

                }
            }
        }
    )
    .then(data=>{
        res.send(data);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
})

//Agregar una nueva aplicacion
router.post('/categoria', function(req, res){
    let c = new categoria({
        _id: mongoose.Types.ObjectId(),
        nombreCategoria: req.body.nombreCategoria,
        descripcion: req.body.descripcion,
        aplicaciones:[]
    });
    c.save()
        .then(data=>{
            res.send(data);
            res.end();
        })
        .catch(error=>{
            res.send(error);
            res.end();
        })
});


module.exports = router;