import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NzButtonModule, NzFormModule, NzIconModule, NzInputModule, NzMessageModule } from 'ng-zorro-antd';
import { LoginComponent } from "./login.component";


const routes: Routes = [
    {

        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        NzFormModule,
        NzIconModule,
        NzButtonModule,
        NzInputModule,
        ReactiveFormsModule,
        NzMessageModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class LoginModule { }