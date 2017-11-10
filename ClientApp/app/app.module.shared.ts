import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error-handler';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { PaginationComponent } from './components/shared/pagination.component';

// Logging service from sentry.io
Raven
.config('https://f1bff77dfa9c4f27879b6b78f0951f24@sentry.io/241663')
.install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        ToastyModule.forRoot(),
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path:'vehicles/new',component: VehicleFormComponent},
            { path:'vehicles/:id',component: VehicleFormComponent},
            { path:'vehicles',component: VehicleListComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        {provide : ErrorHandler,useClass: AppErrorHandler},
        VehicleService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModuleShared {
}
