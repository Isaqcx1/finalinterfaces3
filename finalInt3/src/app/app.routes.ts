import { Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

import { UsuarioDashboardComponent } from './componentes/usuario-dashboard/usuario-dashboard';
import { UsuarioCursosComponent } from './componentes/usuario-cursos/usuario-cursos';
import { UsuarioPerfilComponent } from './componentes/usuario-perfil/usuario-perfil';


import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard';
import { AdminCursosComponent } from './componentes/admin-cursos/admin-cursos';
import { AdminUsuariosComponent } from './componentes/admin-usuarios/admin-usuarios';
import { AdminReportesComponent } from './componentes/admin-reportes/admin-reportes';

export const routes: Routes = [

  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

 
  {
  path: 'usuario/dashboard',
  component: UsuarioDashboardComponent,
  canActivate: [authGuard]
},
{
  path: 'usuario/cursos',
  component: UsuarioCursosComponent,
  canActivate: [authGuard]
},
{
  path: 'usuario/perfil',
  component: UsuarioPerfilComponent,
  canActivate: [authGuard]
},
{
  path: 'admin/dashboard',
  component: AdminDashboardComponent,
  canActivate: [authGuard, adminGuard]
},
{
  path: 'admin/cursos',
  component: AdminCursosComponent,
  canActivate: [authGuard, adminGuard]
},
{
  path: 'admin/usuarios',
  component: AdminUsuariosComponent,
  canActivate: [authGuard, adminGuard]
},
{
  path: 'admin/reportes',
  component: AdminReportesComponent,
  canActivate: [authGuard, adminGuard]
},

  { path: '**', redirectTo: 'login' }
];
