import { Component, OnInit,ViewChild  } from '@angular/core';
//import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import { RestService } from '../_services/rest.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormControl, FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  activeFormCrear: boolean;
  activeFormEditar: boolean;
 
 private formSubmitAttempt: boolean;

 regForm: FormGroup;
 editForm: FormGroup;
 eliminarForm: FormGroup;
 
 public nombreBodega : FormControl;
 public localizacionBodega : FormControl;

 public codigoBodegaEdit : FormControl;
 public nombreBodegaEdit : FormControl;
 public localizacionBodegaEdit : FormControl;

 public codigoBodegaElimina: FormControl;
 public nombreBodegaElimina: FormControl;
 public localizacionBodegaElimina: FormControl;
 
 listPersonas = [''];
 /*displayedColumns: string[] = ['codigoBodega',
                               'nombreBodega',
                               'localizacionBodega','star'];*/
         
displayedColumns: string[] = ['codigoProducto',
                              'nombreProducto',
                              'codigoBodega',
                              'precioProducto',
                              'unidadesDisponibles',
                              'tipoProducto',
                              'star'];

 //dataSource = new MatTableDataSource<Bodegas>();
 dataSource = new MatTableDataSource<Productos>();

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 //players: Player[];
   question: any;
   errorMessage: string;
   isLoading: boolean = true;

   constructor(private restservice:RestService,private fb: FormBuilder) { 
     
     this.nombreBodega=new FormControl();
     this.localizacionBodega=new FormControl();
     this.nombreBodega = new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));

     this.codigoBodegaEdit=new FormControl();
     this.nombreBodegaEdit=new FormControl();
     this.localizacionBodegaEdit=new FormControl();
     this.nombreBodegaEdit = new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));

     this.codigoBodegaElimina=new FormControl();
     this.nombreBodegaElimina=new FormControl();
     this.localizacionBodegaElimina=new FormControl();
     this.nombreBodegaElimina= new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));

     this.activeFormCrear=false;
     this.activeFormEditar=false;



     this.regForm = new FormGroup({
       nombreBodega:this.nombreBodega,
       localizacionBodega:this.localizacionBodega,
     });


     this.editForm= new FormGroup({
       codigoBodegaEdit:this.codigoBodegaEdit,
       nombreBodegaEdit:this.nombreBodegaEdit,
       localizacionBodegaEdit:this.localizacionBodegaEdit,
     });


     this.eliminarForm= new FormGroup({
       codigoBodegaElimina:this.codigoBodegaElimina,
       nombreBodegaElimina:this.nombreBodegaElimina,
       localizacionBodegaElimina:this.localizacionBodegaElimina
     });

   }

   async ngOnInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     this.activeFormCrear=false;
     this.activeFormEditar=false;
     //const bodegas: Bodegas[]=[];
     const productos: Productos[]=[];
     this.getPersonasList();
   
         console.log(this.listPersonas);
         for (let key in this.listPersonas) {
            productos.push({codigoProducto:this.listPersonas[key]['codigoProducto'], 
                            nombreProducto:this.listPersonas[key]['nombreProducto'], 
                            codigoBodega:this.listPersonas[key]['codigoBodega'], 
                            precioProducto:this.listPersonas[key]['precioProducto'], 
                            unidadesDisponibles:this.listPersonas[key]['unidadesDisponibles'], 
                            tipoProducto:this.listPersonas[key]['tipoProducto']
            });


         }
   this.dataSource.paginator = this.paginator;
 
   }
 
 prepararCrear (validador: boolean){
   this.activeFormCrear=validador;    
 } 

 prepararEditar (validador: boolean, bodega: Bodegas ){
   this.activeFormEditar=validador;    
   //this.tempIdBodegaEditar=id;

   this.codigoBodegaEdit.setValue(bodega.codigoBodega);
   this.nombreBodegaEdit.setValue(bodega.nombreBodega);
   this.localizacionBodegaEdit.setValue(bodega.localizacionBodega);
   console.log(bodega.codigoBodega+" "+JSON.stringify(bodega) );
 } 

 prepararEliminar(bodega: Bodegas){
   this.codigoBodegaElimina.setValue(bodega.codigoBodega);
   this.nombreBodegaElimina.setValue(bodega.nombreBodega);
   this.localizacionBodegaElimina.setValue(bodega.localizacionBodega);
   this.onEliminarBodega();
 }
 
 isFieldInvalid(field: string) {
   return (
     (!this.regForm.get(field).valid && this.regForm.get(field).touched) ||
     (this.regForm.get(field).untouched && this.formSubmitAttempt)
   );
 }

 isFieldInvalidEdit(field: string) {
   return (
     (!this.editForm.get(field).valid && this.editForm.get(field).touched) ||
     (this.editForm.get(field).untouched && this.formSubmitAttempt)
   );
 }

 isFieldInvalidEliminar(field: string) {
   return (
     (!this.eliminarForm.get(field).valid && this.eliminarForm.get(field).touched) ||
     (this.eliminarForm.get(field).untouched && this.formSubmitAttempt)
   );
 }

 getPersonasList(){
   
 //const personas: Bodegas[]=[];
  const productos: Productos[]=[];
   this.restservice.getProductos().subscribe(
     result=>{
       if(result.code != 200){
         this.listPersonas=result ;
         console.log( JSON.stringify(this.listPersonas));

         for (let key in this.listPersonas) {
          productos.push({codigoProducto:this.listPersonas[key]['codigoProducto'], 
          nombreProducto:this.listPersonas[key]['nombreProducto'], 
          codigoBodega:this.listPersonas[key]['codigoBodega'], 
          precioProducto:this.listPersonas[key]['precioProducto'], 
          unidadesDisponibles:this.listPersonas[key]['unidadesDisponibles'], 
          tipoProducto:this.listPersonas[key]['tipoProducto']
});


         }
         this.dataSource = new MatTableDataSource(productos);
         this.dataSource.paginator = this.paginator;
       }else{
        
       }
     }
   );
   
   
 }
 
 onSubmitCrearBodega() {
   if (this.regForm.valid) {
         this.restservice.doCrearBodega(this.regForm.value).subscribe(
           result=>{
             if(result.code != 200){
               console.log(JSON.stringify(result));
               this.prepararCrear(true);
               
             }else{
               console.log(JSON.stringify(result));
             }
             console.log(result);
           }
         );

   }
   this.formSubmitAttempt = true;
 }

 onSubmitEditarBodega() {
   if (this.editForm.valid) {
         this.restservice.doEditarBodega(this.editForm.value).subscribe(
           result=>{
             if(result.code != 200){
               console.log(JSON.stringify(result));
               this.prepararCrear(true);
               
             }else{
               console.log(JSON.stringify(result));
             }
             console.log(result);
           }
         );

   }
   this.formSubmitAttempt = true;
 }

 onEliminarBodega(){
   if (this.eliminarForm.valid) {
     this.restservice.doEliminarBodega(this.eliminarForm.value).subscribe(
       result=>{
         if(result.code != 200){
           console.log(JSON.stringify(result));
           this.prepararCrear(true);
           
         }else{
           console.log(JSON.stringify(result));
         }
         console.log(result);
       }
     );

}
this.formSubmitAttempt = true;
 }

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
   
   applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }

   
}

export interface Bodegas {
 codigoBodega: number;
 nombreBodega:string;
 localizacionBodega:string;
}

export interface Productos {
  codigoProducto: number,
  nombreProducto: string,
  codigoBodega: Bodegas,
  precioProducto: number,
  unidadesDisponibles: number,
  tipoProducto:string
}