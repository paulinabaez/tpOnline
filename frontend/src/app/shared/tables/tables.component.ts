import { Component, OnDestroy, Input, IterableDiffers, DoCheck, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { language } from '../../config/config';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnDestroy, DoCheck {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  differ: any;
  first: Boolean = true;
  empty: Boolean = true;

  @Input('labels') labels_inp: string[];
  @Input('rows') rows_inp: string[][];
  @Input('cblabels') cblabels_inp: string[];
  @Input('botones') botones_inp: string[];
  @Input('pageLength') pageLength: number;
  @Input('ordering') ordering: boolean;
  @Input() edit: Boolean = false;
  // agregar input y output
  @Input() delete: Boolean = false;
  @Input() buttons: Boolean = false;
  @Input() customButtons: Boolean = false;

  labels: string[];
  rows: string[][];
  cblabels: string[];
  botones: string[];

  dtOptions:any = {};
  dtTrigger: Subject<any> = new Subject();

  @Output() editClick: EventEmitter<number> = new EventEmitter();
  @Output() deleteClick: EventEmitter<number> = new EventEmitter();
  @Output() customEventClick: EventEmitter<any> = new EventEmitter();

  constructor(private _iterableDiffers: IterableDiffers ) {
    this.differ = this._iterableDiffers.find([]).create(null);
    this.dtOptions = {
      pageLength: 20,
      order: [],
      columnDefs: [
        { ordering: false, targets: 'no-sort' }
      ],
      language: language,
    };
  }

  ngDoCheck() {
    
    const change = this.differ.diff(this.rows_inp);
    this.labels = this.labels_inp;
    if (change) {
      this.dtOptions.pageLength = this.pageLength;
      this.dtOptions.ordering = this.ordering;
      if (this.rows_inp.length > 0) {
        this.empty = false;
        if (this.buttons) {
          this.dtOptions.dom = 'Bfrtip';
          this.dtOptions.buttons = [
            'copy',
            'print',
            'excel',
            'csv'
          ];
        }
        // if(this.rows_inp.indexOf(, 0))
        if (this.customButtons) {
          this.cblabels = this.cblabels_inp;
          this.botones = this.botones_inp;
        }
        this.rerender();
        this.first = false;
      } else {
        this.rerender();
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if ( !this.first ) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.rows = [];
      });
    }
      setTimeout(() => {
        this.rows = this.rows_inp;
        this.dtTrigger.next();
      }, 50);
  }

  onEdit( index: number ) {
    this.editClick.emit(index);
  }

  onDelete( index: number ) {
    this.deleteClick.emit(index);
  }

  customEvt(evento: string, index: number ) {
    this.customEventClick.emit({ event: evento, index: index });
  }

}

// Este componente fue sacado de:
// https://l-lin.github.io/angular-datatables/
// Este componente manda a llamar Datatables para angular consta de auto render cada que se cambian los datos y arregla
// problemas de rerenderizado

// Uso:
//   <app-tables
//       [labels]="labels"                   Los titulos de las columnas en un arreglo
//       [rows]="rows"                       Los datos de la tabla en un arreglo de arreglos cada uno equivale a una fila
//       (editClick)="onEdit($event)"        Se regresa el index del arreglo que se quiere editar
//       (deleteClick)="onDelete($event)"    Se regresa el index del arreglo que se quiere eliminar
//       [buttons]="true"                    Se activan los botones de copiar, imprimir, excel y csv
//       [edit]="true"                       Activa la icono de editar
//       [delete]="true">                    Activa icono de eliminar
//   </app-tables>

// npm install angular-datatables@6.0.0 --save
// npm install datatables.net --save
// npm install datatables.net-dt --save
// npm install @types/jquery --save-dev
// npm install @types/datatables.net --save-dev

// npm install jszip--save
// npm install datatables.net-buttons --save
// npm install datatables.net-buttons-dt --save
// npm install @types/datatables.net-buttons --save-dev

// Importaciones a Angular.json
// "styles": [
//   "node_modules/datatables.net-dt/css/jquery.dataTables.css",
//   "node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css"
// ],
//   "scripts": [
//     "node_modules/jquery/dist/jquery.js",
//     "node_modules/datatables.net/js/jquery.dataTables.js"
//     "node_modules/jszip/dist/jszip.js",
//     "node_modules/datatables.net-buttons/js/dataTables.buttons.js",
//     "node_modules/datatables.net-buttons/js/buttons.colVis.js",
//     "node_modules/datatables.net-buttons/js/buttons.flash.js",
//     "node_modules/datatables.net-buttons/js/buttons.html5.js",
//     "node_modules/datatables.net-buttons/js/buttons.print.js"
//   ]
