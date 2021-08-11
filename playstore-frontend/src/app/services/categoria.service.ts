import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient:HttpClient ) { }

  obtenerCategorias():Observable<any>{
    return this.httpClient.get('http://localhost:8888/categorias', {});
    console.log('Obtener el listado de las categorias');
  }
  obtenerAplicaciones(idCategoria):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${idCategoria}/aplicaciones`, {});
    console.log('Obtener el listado de aplicaciones de una categoria');
  }
  obtenerDetalleApp(idCategoria, idAplicacion): Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${idCategoria}/aplicaciones/${idAplicacion}/detalle`, {});
    console.log('Obtener el detalle de la app seleccionada');

  }
  guardarComentario(idCategoria, idAplicacion, data): Observable<any>{
    return this.httpClient.post(
      `http://localhost:8888/categorias/${idCategoria}/aplicaciones/${idAplicacion}/comentario`,
       {
         comentario: data.comentario,
         calificacion: data.calificacion,
         fecha: data.fecha,
         usuario: data.usuario
       });
    
  }
  guardarAplicacion(idCategoria, data):Observable<any> {
    return this.httpClient.post(
      `http://localhost:8888/categorias/${idCategoria}/aplicacion`,
      {
        nombre: data.nombre,
        descripcion: data.descripcion,
        icono: data.icono,
        calificacion: data.calificacion,
        descargas: data.descargas,
        precio: data.precio,
        desarrollador: data.desarrollador
      }
    );
  }
  guardarCategoria(data):Observable <any>{
    return this.httpClient.post(
      'http://localhost:8888/categorias/categoria',
      {
        nombreCategoria: data.nombreCategoria,
        descipcion: data.descripcion,
        aplicaciones: []
      }
    );
  }
}
