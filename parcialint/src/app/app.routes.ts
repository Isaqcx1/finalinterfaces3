import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { RmascotaComponente } from './componentes/registrar-mascota/Rmascota-componente';
import { AgendarCitaComponente } from './componentes/agendar-cita/agendar-cita-componente';
import { HistorialComponente } from './componentes/historial/historial-componente';
import { ListadoCitasComponente } from './componentes/listado-citas/listado-citas.componente';

import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  { path: 'registrar', component: RmascotaComponente, canActivate: [authGuard] },
  { path: 'agendar', component: AgendarCitaComponente, canActivate: [authGuard] },

  
  { path: 'historial', component: HistorialComponente, canActivate: [authGuard, adminGuard] },
  { path: 'listado', component: ListadoCitasComponente, canActivate: [authGuard, adminGuard] },
];
