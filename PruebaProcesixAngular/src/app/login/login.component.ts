import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import { FireService } from '../_services/fire.service';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public flagShowLogin: boolean;
  angForm: FormGroup;
  public userName : FormControl;
  password : FormControl;
  private formSubmitAttempt: boolean;
  

  constructor(public restservice:RestService,  private fb: FormBuilder){
    this.userName = new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));
    this.password = new FormControl();
    this.angForm = new FormGroup({userName:this.userName, password:this.password});


    this.flagShowLogin=true;
    //this.angForm=new FormGroup(["userName":this.userName]);
  }

  showLogin(validador: boolean){
    this.flagShowLogin=validador;    
  }

  createForm() {

    this.angForm = this.fb.group({
      /*userName: ['', Validators.required ],
      password: ['', Validators.required ]*/
      userName: this.userName,
      password: this.password
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
      (!this.angForm.get(field).valid && this.angForm.get(field).touched) ||
      (this.angForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onLogout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
  }

  onSubmit() {
    
   if (this.angForm.valid) {

          this.restservice.doLogin(this.angForm.value).subscribe(
            result=>{
              if(result.code != 200){
                
                console.log(JSON.stringify(result));
                //console.log(result.code);
                console.log(result.status);
                //console.log(JSON.stringify(result.usuario.nomUsuario));
                //localStorage.setItem('currentUser', JSON.stringify(result.usuario.nomUsuario));

                if(this.restservice.isloguet()){
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('currentUser', JSON.stringify(result.usuario.nomUsuario));
                  localStorage.setItem('currentUserId', JSON.stringify(result.usuario.id));
                  this.restservice.redirec();
                }else{
                  localStorage.setItem('currentUser', JSON.stringify(result.usuario.nomUsuario));
                  localStorage.setItem('currentUserId', JSON.stringify(result.usuario.id));
                  this.restservice.redirec();
                }

              }else{

                this.login=result.data;
                this.restservice.redirecHome();
                //this.productos = result.data;
              }
            }
          );

    }
    this.formSubmitAttempt = true;
  }

  registro(){
    localStorage.setItem('enabledRegistro','true' );
  }

  validaEnable(){
    if(localStorage.getItem('enabledRegistro')=='true'){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
  }
}
