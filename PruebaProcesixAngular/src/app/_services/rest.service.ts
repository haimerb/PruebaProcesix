import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  //API_URL  =  'http://localhost/cali24/core/app';
  API_URL='http://localhost:8000/api/';
  API_URL_REST='http://localhost:8080/PruebaTSGroup/resources/wsPruebaProcesix/';
  
  configUrl = 'assets/config.json';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private basePath = '/usuarios';
  public items: any;
  public item: any;

  constructor(private router: Router, public http: HttpClient) {

  }
  
  //constructor(private db: AngularFireDatabase) { }

  addUsuario(data) {
  //const obj = this.db.database.ref(this.basePath);
  //obj.push(data);
  console.log('Success');
  }

  login(data){
    console.log('Success');
    console.log('Login');
    console.log(data);
    console.log(data.userName);
    console.log(`${this.API_URL}/${data.userName}/${data.password}`);
    return  this.http.get(`${this.API_URL}${data.userName}/${data.password}`);
  }

  /**
   *
   */
  getTipoUsuario():Observable<any>{
    const params = new HttpParams({fromString:  ``});
    return this.http.request("GET",`${this.API_URL}/tipoUsuario.php`,{responseType:"json",params});
  }
  
  getPersonas():Observable<any>{
	const params = new HttpParams({fromString:  ``});
    return this.http.request("GET",`${this.API_URL}persona`,{responseType:"json",params});
  }

  getBodegas():Observable<any>{
    const params = new HttpParams({fromString:  ``});
      return this.http.request("GET",`${this.API_URL_REST}bodegas`,{responseType:"json",params});
  }

  getProductos():Observable<any>{
    const params = new HttpParams({fromString:  ``});
      return this.http.request("GET",`${this.API_URL_REST}productos`,{responseType:"json",params});
  }
  
  /**
   *
   */
  getTipoEstablecimiento():Observable<any>{
    const params = new HttpParams({fromString:  ``});
    return this.http.request("GET",`${this.API_URL}/tipoEstablecimiento.php`,{responseType:"json",params});
  }

  getEstablecimientos():Observable<any>{
    const params = new HttpParams({fromString:  ``});
    return this.http.request("GET",`${this.API_URL}/establecimiento.php`,{responseType:"json",params});
  }

  redirec(){
    this.router.navigate(['/principal']);
  }

  redirecHome(){
    this.router.navigate(['/']);
  }

  isloguet(){
     if(localStorage.getItem("currentUser")){
        return true;
     }else{
       return false;
     }
  }

  doLogin(data): Observable<any>{
    const params = new HttpParams({fromString:  `userName=${data.userName}&password=${data.password}`});
    return this.http.request("GET",`${this.API_URL}/login.php`,{responseType:"json",params});
  }

  doCrearBodega(data):Observable<any>{
    console.log(JSON.stringify(data));
    const params = new HttpParams({fromString:  
         `nombreBodega=${data.nombreBodega}&localizacionBodega=${data.localizacionBodega}`
       });
       return this.http.post(`${this.API_URL_REST}crearBodega`,params,{responseType: 'text'});
    
  }

  doEditarBodega(data):Observable<any>{
    
    const params = new HttpParams({fromString:  
      `codigoBodega=${data.codigoBodegaEdit}&nombreBodega=${data.nombreBodegaEdit}&localizacionBodega=${data.localizacionBodegaEdit}`
       });
       return this.http.post(`${this.API_URL_REST}editarBodega`,params,{responseType: 'text'});
  }

  doEliminarBodega(data):Observable<any>{
    const params = new HttpParams({fromString:  
      `codigoBodega=${data.codigoBodegaElimina}&nombreBodega=${data.nombreBodegaElimina}&localizacionBodega=${data.localizacionBodegaElimina}`
       });
       return this.http.post(`${this.API_URL_REST}eliminarBodega`,params,{responseType: 'text'});
  }

  doRegistrar(data):Observable<any>{
    //console.log("HIIIII!"+JSON.stringify(data));
    /*var strparams=`nombres=${data.nombres}&apellidos=${data.apellidos}&
                   tipoUsuario=${data.tipoUsuario.value}&nomEstablecimiento=${data.nombreEstablecimiento}&
                   telefono=${data.telefono}&movil=${data.movil}&email=${data.email}&
                   nit=${data.nit}&tipoEstablecimiento=${data.tipoEstablecimiento}&
                   usuario=${data.usuario}`;*/
    
                   //console.log(strparams);
    //console.log(JSON.stringify(data.tipoEstablecimiento));
    const params = new HttpParams({fromString:  
                  `nombres=${data.nombres}&
                   apellidos=${data.apellidos}&
                   tipoUsuario=${data.tipoUsuario.nomtipousuario}&
                   nomEstablecimiento=${data.nombreEstablecimiento}&
                   telefono=${data.telefono}&
                   movil=${data.movil}&
                   email=${data.email}&
                   nit=${data.nit}&
                   tipoEstablecimiento=${data.tipoEstablecimiento}&
                   usuario=${data.usuario}`
                   });
    
    //return this.http.post(`${this.API_URL}registro.php`,{responseType:"json",params});
    return this.http.post(`${this.API_URL}/registro.php`,
    { 
       "nombres":`${data.nombres}`,
       "apellidos":`${data.apellidos}`,
       "tipoUsuario":`${data.tipoUsuario.nomtipousuario}`,
       "nomEstablecimiento":`${data.nombreEstablecimiento}`,
       "telefono":`${data.telefono}`,
       "movil":`${data.movil}`,
       "email":`${data.email}`,
       "nit":`${data.nit}`,
       "tipoEstablecimiento":`${data.tipoEstablecimiento}`,
       "usuario":`${data.usuario}`
       },{responseType: 'text'});




       
  }





}

  


