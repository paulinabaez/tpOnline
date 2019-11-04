import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { NgxNotificationService } from 'ngx-notification';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
  providers: [CrudService]
})
export class ProyectosComponent implements OnInit {

  forma: FormGroup;
  proyectoId: string = null;
  labels: string[] = ['Nombre del proyecto', 'Descripcion del proyecto', 'Encargado del proyecto'];
  rows = new Array;
  rowId = new Array;

  @ViewChild('openAddProyectoModal') openAddProyectoModal: ElementRef;
  @ViewChild('closeAddProyectoModal') closeAddProyectoModal: ElementRef;

  constructor(
    private _proyectoService: CrudService,
    private ngxNotificationService: NgxNotificationService
  ) {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required]),
      'encargado': new FormControl('', [Validators.required])
    });

    this._proyectoService.route = 'project';
  }

  ngOnInit() {
    this.getProyectos();
  }

  onNew() {
    this.proyectoId = null;
    this.forma.reset();
    this.openAddProyectoModal.nativeElement.click();
  }

  getProyectos(id?: string) {
    if (id) {
      this._proyectoService.getData(id).subscribe((res: any) => {
        if (!res.proyecto) {
          return this.sendNotification('Algo salió mal, intente de nuevo.', 'danger');
        } else {
          this.forma.reset({
            'nombre': res.proyecto.nombre,
            'descripcion': res.proyecto.descripcion,
            'encargado': res.proyecto.encargado,
          });
        }
      });
    } else {
      this.rowId = new Array;
      const rows_temp = new Array;

      this._proyectoService.getData().subscribe((res: any) => {
        console.log('proyectos', res);
        if (!res.proyectos) {
          return this.sendNotification('Algo salió mal, intente de nuevo.', 'danger');
        }
        res.proyectos.forEach((proyecto, index) => {
          rows_temp.push([proyecto.nombre, proyecto.descripcion, proyecto.encargado]);
          return this.rowId.push(proyecto._id);
        });
        this.rows = rows_temp;
      });
    }
  }

  saveProyecto(id?: string) {
    if (id) {
      this._proyectoService.updateData(id, this.forma.value).subscribe((res: any) => {
        if (!res.proyecto) {
          return this.sendNotification('Algo salió mal al editar el proyecto, intente de nuevo.', 'danger');
        } else {
          this.getProyectos();
          Swal.fire({
            title: '¡Editado!',
            text: 'El proyecto se ha editado correctamente',
            type: 'success',
            confirmButtonText: 'Continuar'
          });
          return this.sendNotification('Proyecto editado correctamente', 'success');
        }
      });
    } else {
      this._proyectoService.saveData(this.forma.value).subscribe((res: any) => {
        if (!res.proyecto) {
          return this.sendNotification('Algo salió mal al guardar el proyecto, intente de nuevo.', 'danger');
        } else {
          this.getProyectos();
          Swal.fire({
            title: '¡Guardado!',
            text: 'El proyecto se ha guardado correctamente',
            type: 'success',
            confirmButtonText: 'Continuar'
          });
          return this.sendNotification('Proyecto guardado correctamente', 'success');
        }
      });
    }
  }

  deleteProyecto(id) {
    this._proyectoService.deleteData(id).subscribe((res:any) => {
      if(!res.proyecto) {
        return this.sendNotification('Ha ocurrido un error al eliminar, intente de nuevo más tarde.', 'danger');
      } else {
        this.getProyectos();
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El proyecto se ha eliminado correctamente',
          type: 'success',
          confirmButtonText: 'Continuar'
        });
        return this.sendNotification('Proyecto eliminado correctamente', 'success');
      }
    });
  }

  sendNotification(message: string, theme: string) {
    this.ngxNotificationService.sendMessage(message, theme, 'bottom-center');
  }

  onSave(id?: string) {
    this.saveProyecto(id);
    this.closeAddProyectoModal.nativeElement.click();
  }

  onEdit(index) {
    this.proyectoId = this.rowId[index];
    this.getProyectos(this.proyectoId);
    this.openAddProyectoModal.nativeElement.click();
  }

  onDelete(index) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras recuperar a este proyecto.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.value) {
        this.deleteProyecto(this.rowId[index]);
        Swal.fire({
          title: 'Eliminado',
          text: 'El proyecto ha sido eliminado',
          type: 'success'
        });
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'El proyecto no se eliminó',
          type: 'error'
        });
      }
    });
  }

}
