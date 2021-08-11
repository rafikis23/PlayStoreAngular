import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from './services/categoria.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playstore-frontend';
  faPlus = faPlus;
  faPaperPlane = faPaperPlane;
  detalleApp: any = [];
  iconos:any = [];
  usuarios:any = ['Pedro', 'Messi', 'Cristiano', 'Maria', 'Juana', 'Lesli', 'Alaska'];
  iconoSeleccionado: string = '';
  usuarioSeleccionado: string = '';
  rutaIcono: string = '';
  categorias:any =[];
  aplicaciones:any = [];
  categoriaSeleccionada:any;
  nombreApp: string = '';
  descripcionApp: string = '';
  desarrolladorApp: string = '';
  precioApp: Number = 0;
  descargasApp: Number = 0;
  calificacionApp: Number = 0;
  nuevoComentario:  String = '';
  fecha: String = '';
  calificacion: Number = 0;
  aplicacionSeleccionada: any;

  constructor( 
    private categoriaService:CategoriaService,
    private modalService: NgbModal
    ){}
    ngOnInit(): void{
      this.categoriaService.obtenerCategorias().subscribe(
        res=>{
          this.categorias = res;
          console.log('Categoria:', this.categorias);
        },
        error=>{
          console.log(error);
        }
      )
      
      
    }
    seleccionarCategoria(){
      console.log(this.categoriaSeleccionada)
      this.categoriaService.obtenerAplicaciones(this.categoriaSeleccionada).subscribe(
        res=>{
          this.aplicaciones = res.aplicaciones;
          console.log('Aplicaciones', this.aplicaciones);
        },
        error=>{
          console.log(error);
        }

      )
    }
    visualizarImagen(){
      
    }
    visualizarUsuario(){

    }
    guardarApp(){
      this.rutaIcono = `img/app-icons/${this.iconoSeleccionado}.webp`
      const data = {
        nombre : this.nombreApp,
        descripcion: this.descripcionApp,
        icono: this.rutaIcono,
        calificacion: this.calificacionApp,
        descargas: this.descargasApp,
        precio: this.precioApp,
        desarrollador: this.desarrolladorApp
      }
      console.log(data);
      this.categoriaService.guardarAplicacion(this.categoriaSeleccionada, data).subscribe(
        res=>{
          console.log(res);
          if(res.ok === 1){
            this.modalService.dismissAll();
          }
        },
        error=> console.log(error)
      );

    }
    guardarComentario(){
      /* console.log(this.calificacion);
      console.log(this.categoriaSeleccionada);
      console.log(this.aplicacionSeleccionada);
      console.log(this.nuevoComentario);
      console.log(this.usuarioSeleccionado);
      console.log(this.fecha); */
      const data = {
        comentario: this.nuevoComentario,
        calificacion: this.calificacion,
        fecha: this.fecha,
        usuario: this.usuarioSeleccionado
      }
      this.categoriaService.guardarComentario(this.categoriaSeleccionada, this.aplicacionSeleccionada, data).subscribe(
        res=>{
          console.log(res);
          if(res.ok === 1){
            this.modalService.dismissAll();
          }
        },
        error=> console.log(error)
      );
    }
    nuevaApp(modal){
      this.iconos = [];
      for(let i=1; i<=50; i++){
        this.iconos.push(i);
       
      }
      console.log(this.iconos);
      this.modalService.open(
        modal,
        {
          size:'md'
        }
      )

    }
    detalleAplicacion(modal, idAplicacion){
      this.aplicacionSeleccionada = idAplicacion;
      console.log('La id aplicacion es',idAplicacion);
      console.log('La id Categoria es', this.categoriaSeleccionada);
      this.categoriaService.obtenerDetalleApp(this.categoriaSeleccionada, idAplicacion).subscribe(
        res=>{
          this.detalleApp = res.aplicaciones;
          console.log('El detalle de la app es', this.detalleApp);
          this.modalService.open(
            modal,
            {
              size:'md'
            }
          );
        },
        error=>{
          console.log(error);
        }
      )
      
    }
}
