import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { RestService } from '../_services/rest.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  listTiposUsuario = ['USA', 'Canada', 'Uk'];
  listTiposEstablecimientos=['USA', 'Canada', 'Uk'];

  tiposUsuario = ['USA', 'Canada', 'Uk'];
  tiposEstablecimientos= ['USA', 'Canada', 'Uk'];
  
  valueFromDB = new Option('Option2');
  options = [new Option('Option1'), new Option('Option2'), new Option('Option3')];

  public tipoUsuarioval: String;
  
  regForm: FormGroup;
  public userName : FormControl;

  public nombres : FormControl;
  public apellidos : FormControl;
  public tipoUsuario : FormControl;
  public nombreEstablecimiento : FormControl; 
  public telefono : FormControl;
  public movil : FormControl;
  public email : FormControl;
  public nit : FormControl;
  public tipoEstablecimiento : FormControl;
  public usuario: FormControl;

  //password : FormControl;
  private formSubmitAttempt: boolean;
  
  constructor(private restservice:RestService, 
              /*private fireservice: FireService, */
              private fb: FormBuilder){
    
    this.nombres=new FormControl();
    this.apellidos=new FormControl();
    this.tipoUsuario=new FormControl();
    this.nombreEstablecimiento=new FormControl();
    this.telefono=new FormControl();
    this.movil=new FormControl();
    this.email=new FormControl();
    this.nit=new FormControl();
    this.tipoEstablecimiento=new FormControl();
    this.usuario=new FormControl();
    this.usuario.setValue(localStorage.getItem("currenUserId"));
    
    
    
    this.userName = new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));
    //this.password = new FormControl();
    
    this.regForm = new FormGroup({
                                  nombres:this.nombres,
                                  apellidos:this.apellidos,
                                  tipoUsuario: this.tipoUsuario,
                                  nombreEstablecimiento:this.nombreEstablecimiento,
                                  telefono:this.telefono,
                                  movil:this.movil,
                                  email:this.email,
                                  nit:this.nit,
                                  tipoEstablecimiento:this.tipoEstablecimiento,
                                  usuario:this.usuario,
                                  userName:this.userName//, 
                                  //password:this.password       
   });


  }

  createForm() {
    this.regForm = this.fb.group({
      userName: this.userName,
      //password: this.password
   });
  }

   login(userName, password){
    const dataObj = {
      userName: userName,
      password: password
    };
    this.restservice.login(dataObj);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.regForm.get(field).valid && this.regForm.get(field).touched) ||
      (this.regForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmitReg() {
    console.log("HIIIII!");

    if (this.regForm.valid) {
          this.restservice.doRegistrar(this.regForm.value).subscribe(
            result=>{
              if(result.code != 200){
                console.log(JSON.stringify(result));
              }else{
                console.log(JSON.stringify(result));
              }
              console.log(result);
            }
          );

    }
    this.formSubmitAttempt = true;
  }

  setTipoUsusario(str: string){
    this.tipoUsuarioval=str;
  }

  getTipoUsuario(){
    return this.tipoUsuarioval;
  }

  getTiposUsuarioList(){
    this.restservice.getTipoUsuario().subscribe(
      result=>{
        if(result.code != 200){
          //console.log("Log: "+result);
          this.tiposUsuario=result;
          //console.log(this.tiposUsuario);
          this.listTiposUsuario=this.tiposUsuario;
        }else{
          this.login=result.data;
        }
      }
    );
  }

  getTipoEstablecimientoList(){
    this.restservice.getTipoUsuario().subscribe(
      result=>{
        if(result.code != 200){
          this.tiposEstablecimientos=result;
          //console.log(this.tiposEstablecimientos);
          this.listTiposEstablecimientos=this.tiposEstablecimientos;
        }else{
          this.login=result.data;
        }
      }
    );
  }

  /**
   * Al iniciar los componentes 
   */
  ngOnInit() {
    this.getTiposUsuarioList();
    //console.log(this.tiposUsuario);
  }

}
