import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzIconModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { TableContactChartComponent } from '../table/table-contact-chart/table-contact-chart.component';
import { TablePersonChartComponent } from '../table/table-person-chart/table-person-chart.component';
import { TableSymptomChartComponent } from '../table/table-symptom-chart/table-symptom-chart.component';
import { SidebarComponent } from "./sidebar.component";

const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            {
                path: 'table',
                loadChildren: () => import('../table/table.module').then(m => m.TableModule)
            },
            {
                path: 'table-person-chart/:datePerson',
                component: TablePersonChartComponent,
                pathMatch: 'full'
            },
            {
                path: 'table-symptom-chart/:startDate/:endDate/:id_symptom',
                component: TableSymptomChartComponent,
                pathMatch: 'full'
            },
            {
                path: 'table-contact-chart/:startDate/:endDate/:id_contact',
                component: TableContactChartComponent,
                pathMatch: 'full'
            },
            {
                path: 'person/:id',
                loadChildren: () => import('../table/person/person.module').then(m => m.PersonModule)
            },
            {
                path: 'chart',
                loadChildren: () => import('../chart/chart.module').then(m => m.ChartModule)
            },

        ]
    }
]

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class SidebarModule { }