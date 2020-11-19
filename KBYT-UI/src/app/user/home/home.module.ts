import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'
import { HttpClientModule } from '@angular/common/http'
import { NzButtonModule, NzCheckboxModule, NzDatePickerModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzLayoutModule, NzMessageModule, NzModalModule, NzRadioModule, NzSliderModule, NzSpinModule, NzSwitchModule, NzTableModule } from 'ng-zorro-antd'
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmComponent } from './confirm/confirm.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
]

@NgModule({
    declarations: [HomeComponent, ConfirmComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NzIconModule,
        NzTableModule,
        NzDatePickerModule,
        NzFormModule,
        NzModalModule,
        NzButtonModule,
        NzInputModule,
        NzGridModule,
        NzLayoutModule,
        NzMessageModule,
        NzSpinModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class HomeModule { }