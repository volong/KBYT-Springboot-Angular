import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { NzButtonModule, NzDescriptionsModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzPageHeaderModule } from 'ng-zorro-antd';
import { PersonComponent } from './person.component';

const routes: Routes = [
    {
        path: '',
        component: PersonComponent,
    }
]

@NgModule({
    declarations: [PersonComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        NzIconModule,
        NzLayoutModule,
        NzInputModule,
        NzButtonModule,
        NzPageHeaderModule,
        NzLayoutModule,
        NzDescriptionsModule,
        FormsModule,
        NzGridModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class PersonModule { }