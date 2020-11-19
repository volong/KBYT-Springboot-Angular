import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule, NzButtonModule, NzDescriptionsModule, NzDividerComponent, NzDividerModule, NzDrawerModule, NzDropDownModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzMessageModule, NzPageHeaderModule, NzPaginationModule, NzSelectModule, NzTableModule } from 'ng-zorro-antd';
import { TablePersonChartComponent } from './table-person-chart/table-person-chart.component';
import { TableComponent } from "./table.component";
import { TableSymptomChartComponent } from './table-symptom-chart/table-symptom-chart.component';
import { TableContactChartComponent } from './table-contact-chart/table-contact-chart.component';


const routes: Routes = [
    {
        path: '',
        component: TableComponent,
    }
]

@NgModule({
    declarations: [TableComponent, TablePersonChartComponent, TableSymptomChartComponent, TableContactChartComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NzTableModule,
        NzInputModule,
        NzButtonModule,
        NzLayoutModule,
        NzDescriptionsModule,
        NzPageHeaderModule,
        NzIconModule,
        NzPaginationModule,
        NzDropDownModule,
        NzSelectModule,
        NzDividerModule,
        NzGridModule,
        NzMessageModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class TableModule { }