import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
//import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarModule } from "@angular/material";

import {MatTableModule} from '@angular/material/table';
import { MatSelectModule,
         MatRippleModule,
         MatProgressSpinnerModule,
         MatInputModule,
         MatFormFieldModule, 
         MatToolbarModule, 
         MatButtonModule, 
         MatSidenavModule, 
         MatIconModule, 
         MatListModule, 
         MatCardModule, 
         MatGridListModule, MatMenuModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RestService } from './_services/rest.service'; 


import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { PrincipalComponent } from './principal/principal.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentasComponent } from './ventas/ventas.component';
import { LoginComponent } from './login/login.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { RegistroComponent } from './registro/registro.component';
import { ModalHomeComponent, ModalHomeComponentDialog } from './modal-home/modal-home.component';
import { EstablecimientosComponent } from './establecimientos/establecimientos.component';
import { UsuariouplevelDashboardComponent } from './usuariouplevel-dashboard/usuariouplevel-dashboard.component';
import { InicialDashboardComponent } from './inicial-dashboard/inicial-dashboard.component';
import { RegistroEstablecimientoComponent } from './registro-establecimiento/registro-establecimiento.component';

import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PersonasComponent } from './personas/personas.component';
import { BodegasComponent,MensajeBodySnackComponent } from './bodegas/bodegas.component';
import { ProductosComponent } from './productos/productos.component';
//import { MensajesSnackComponent, MensajeBodySnackComponent } from './mensajes-snack/mensajes-snack.component';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'principal', component: PrincipalComponent},
  { path: 'establecimientos', component: EstablecimientosComponent},
  { path: 'first-page', component: FirstPageComponent},
  { path: 'second-page', component: SecondPageComponent},
  { path: 'third-page', component: ThirdPageComponent},
  { path: 'escritorio-nivel-up', component: UsuariouplevelDashboardComponent},
  { path: 'registro-establecimiento', component: RegistroEstablecimientoComponent},
  { path: 'evaluacion', component: EvaluacionComponent},
  { path: 'resultados', component: ResultadosComponent},
  { path: 'personas', component: PersonasComponent},
  { path: 'bodegas', component: BodegasComponent},
  { path: 'mensaje-body-snack', component: MensajeBodySnackComponent},
  
  { path: 'productos', component: ProductosComponent},
  //{ path: 'mensajes-snack', component: MensajesSnackComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    PrincipalComponent,
    ConfiguracionComponent,
    UsuariosComponent,
    VentasComponent,
    LoginComponent,
    AgregarUsuarioComponent,
    RegistroComponent,
    ModalHomeComponent,
    ModalHomeComponentDialog,
    EstablecimientosComponent,
    UsuariouplevelDashboardComponent,
    InicialDashboardComponent,
    RegistroEstablecimientoComponent,
    EvaluacionComponent,
    ResultadosComponent,
    PersonasComponent,
    BodegasComponent, MensajeBodySnackComponent,
    ProductosComponent,
    //MensajesSnackComponent,MensajeBodySnackComponent
  ], 
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, 
    AngularFireAuthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRippleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,MatSnackBarModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
