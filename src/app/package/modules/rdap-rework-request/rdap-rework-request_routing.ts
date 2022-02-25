import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../core/home/home.component';
import { RdapReworkRequestComponent } from './rdap-rework-request.component';
const routes: Routes = [
    {
        path: "reworkrequest",
        component: RdapReworkRequestComponent,
    }];

    export const ReworkRequestRoutes = RouterModule.forChild(routes);