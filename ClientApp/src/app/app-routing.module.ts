import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { HomeComponent } from './home/home.component'; // Import components
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
// Define routes for the application
const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'admin', component: AdminComponent },
  { path: 'details', component: ViewdetailsComponent }, // Admin route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'counter', component: CounterComponent }, // Counter route
  { path: 'fetch-data', component: FetchDataComponent }, // Fetch Data route
  { path: '**', redirectTo: '' } // Redirect any unknown routes to home
];

@NgModule({
  declarations: [], // Declarations go in the AppModule, not here
  imports: [
    RouterModule.forRoot(routes) // Import RouterModule and define the routes
  ],
  exports: [RouterModule] // Export RouterModule to use in AppModule
})
export class AppRoutingModule { }
