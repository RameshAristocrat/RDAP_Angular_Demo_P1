import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../core/home/home.component';
import { RdapBlanketPinRequestComponent } from './rdap-blanketpin-request.component';
const routes: Routes = [
    {
        path: "blanketpin",
        component: RdapBlanketPinRequestComponent,
    }];

    export const BlanketPinRequestRoutes = RouterModule.forChild(routes);