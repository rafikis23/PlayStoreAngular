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
  categorias:any =[];
  aplicaciones:any = [];
  categoriaSeleccionada:any;
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
    detalleAplicacion(modal, idAplicacion){
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
