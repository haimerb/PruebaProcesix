import { Component, OnInit,ViewChild  } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
//import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import { RestService } from '../_services/rest.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormControl, FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {
   durationInSeconds = 5;
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
	displayedColumns: string[] = ['codigoBodega',
								                'nombreBodega',
	                              'localizacionBodega','star'];
								  
	dataSource = new MatTableDataSource<Bodegas>();

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//players: Player[];
    question: any;
    errorMessage: string;
    isLoading: boolean = true;

    constructor(private restservice:RestService,private fb: FormBuilder,
      private _snackBar: MatSnackBar) { 
      
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
		  const bodegas: Bodegas[]=[];
		  this.getPersonasList();
		
		//this.listPersonas=result;
          console.log(this.listPersonas);
          for (let key in this.listPersonas) {
                    
                              bodegas.push({ codigoBodega: this.listPersonas[key]['codigoBodega'],
                              nombreBodega:this.listPersonas[key]['nombreBodega'],
                              localizacionBodega:this.listPersonas[key]['localizacionBodega']
                              
    });


          }
		this.dataSource.paginator = this.paginator;
	
    }
  
  prepararCrear (validador: boolean){
    this.activeFormCrear=validador;    
  } 

  prepararCrearBack (validador: boolean){
    this.activeFormCrear=validador;    
    this.getPersonasList();
  }
  //getPersonasList

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
		
	const personas: Bodegas[]=[];
    this.restservice.getBodegas().subscribe(
      result=>{
        if(result.code != 200){
          this.listPersonas=result ;
          console.log( JSON.stringify(this.listPersonas));

          for (let key in this.listPersonas) {
							  personas.push({ 
                  codigoBodega: this.listPersonas[key]['codigoBodega'],
                              nombreBodega:this.listPersonas[key]['nombreBodega'],
                              localizacionBodega:this.listPersonas[key]['localizacionBodega']
		});


          }
          this.dataSource = new MatTableDataSource(personas);
          this.dataSource.paginator = this.paginator;
        }else{
         
        }
      }
    );
		
		
	}
  
  onSubmitCrearBodega() {
    console.log(JSON.stringify(this.regForm.value));
    if (this.regForm.valid) {
          this.restservice.doCrearBodega(this.regForm.value).subscribe(
            result=>{
              if(result.code != 200){
                console.log(JSON.stringify(result));
                //this.prepararCrear(true);
                this.openSnackBar();
                this.nombreBodega.setValue("");
                this.localizacionBodega.setValue("");
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
                //this.prepararCrear(true);
                this.getPersonasList();
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
            //this.prepararCrear(true);
            this.getPersonasList();
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

    openSnackBar() {
      this._snackBar.openFromComponent(MensajeBodySnackComponent, {
        duration: this.durationInSeconds * 1000,
        data:{objeto:"Bodega",accion:'creada'}
      });
    }
    openSnackEdita() {
      this._snackBar.openFromComponent(MensajeBodySnackComponent, {
        duration: this.durationInSeconds * 1000,
        data:{objeto:"Bodega",accion:'editada'}
      });
    }
}

export interface Bodegas {
  codigoBodega: number;
  nombreBodega:string;
  localizacionBodega:string;
}

@Component({
  selector: 'mensajes-body-snack',
  //templateUrl: 'mensajes-body-snack.component.html', 
  template:'<span class="example-pizza-party">Bodega creada con exito! 🍕</span>',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class MensajeBodySnackComponent {}