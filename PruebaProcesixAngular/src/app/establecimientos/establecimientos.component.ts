import { Component, OnInit,ViewChild  } from '@angular/core';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { RestService } from '../_services/rest.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.css']
})
export class EstablecimientosComponent implements OnInit {
  
  listEstablecimientos = [''];
  displayedColumns: string[] = ['id','responsable','establecimiento','telefono','movil','email','nit', 'tipoestablecimiento'];
  dataSource = new MatTableDataSource<Establecimientos>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restservice:RestService) { }

  getEstablecimientosList(){
    const establecimientos: Establecimientos[]=[];
    this.restservice.getEstablecimientos().subscribe(
      result=>{
        if(result.code != 200){
          this.listEstablecimientos=result;
          console.log(this.listEstablecimientos);
          for (let key in this.listEstablecimientos) {
                    
                            establecimientos.push({ id: this.listEstablecimientos[key]['id'],
                              responsable:this.listEstablecimientos[key]['responsable'],
                              establecimiento:this.listEstablecimientos[key]['establecimiento'],
                              telefono:this.listEstablecimientos[key]['telefono'],
                              movil:this.listEstablecimientos[key]['movil'],
                              email:this.listEstablecimientos[key]['email'],
                              nit:this.listEstablecimientos[key]['nit'],
                              tipoestablecimiento:this.listEstablecimientos[key]['tipoestablecimiento']
    });


          }
          this.dataSource = new MatTableDataSource(establecimientos);
          
        }else{
         
        }
      }
    );



  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    const establecimientos: Establecimientos[]=[];
    this.getEstablecimientosList();

    for (let key in this.listEstablecimientos) {

      console.log(this.listEstablecimientos[key]); 

      establecimientos.push({ id: this.listEstablecimientos[key]['id'],
                              responsable:this.listEstablecimientos[key]['responsable'],
                              establecimiento:this.listEstablecimientos[key]['establecimiento'],
                              telefono:this.listEstablecimientos[key]['telefono'],
                              movil:this.listEstablecimientos[key]['movil'],
                              email:this.listEstablecimientos[key]['email'],
                              nit:this.listEstablecimientos[key]['nit'],
                              tipoestablecimiento:this.listEstablecimientos[key]['tipoestablecimiento']
    });
     
    }
    
    this.dataSource.paginator = this.paginator;
    
  }

}


export interface Establecimientos {
  id: number;
  responsable:string;
  establecimiento:string;
  telefono:string;
  movil:string; 
  email:string;
  nit:string;
  tipoestablecimiento:string;
}



