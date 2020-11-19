import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule, NzDatePickerModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzPageHeaderModule, NzPaginationModule, NzSelectModule, NzTableModule } from 'ng-zorro-antd';
import { ChartComponent } from "./chart.component";
import { PersonsChartComponent } from './persons-chart/persons-chart.component';
import { SymptomChartComponent } from './symptom-chart/symptom-chart.component';
import { ContactChartComponent } from './contact-chart/contact-chart.component';
import { TablePersonChartComponent } from '../table/table-person-chart/table-person-chart.component';

const routes: Routes = [
    {
        path: '',
        component: ChartComponent,
        children: [
            {
                path: 'persons-chart',
                component: PersonsChartComponent,
                pathMatch: 'full'
            },
            {
                path: 'symptom-chart',
                component: SymptomChartComponent
            },
            {
                path: 'contact-chart',
                component: ContactChartComponent
            }

        ]
    }
]

@NgModule({
    declarations: [ChartComponent, SymptomChartComponent, ContactChartComponent, PersonsChartComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NzInputModule,
        NzButtonModule,
        NzPageHeaderModule,
        NzDatePickerModule,
        NzFormModule,
        NzLayoutModule,
        NzIconModule,
        NzSelectModule,
        NzTableModule,
        NzGridModule,

        NzPaginationModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ChartModule { }