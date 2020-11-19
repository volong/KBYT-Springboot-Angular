import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NzButtonModule, NzCheckboxModule, NzDatePickerModule, NzFormModule, NzIconModule, NzInputModule, NzMessageModule, NzModalModule, NzRadioModule, NzSliderModule, NzSpinModule, NzSwitchModule, NzTableModule } from 'ng-zorro-antd'
import { BrowserModule } from '@angular/platform-browser'
import { UpdateComponent } from './update.component'

const routes: Routes = [
    {
        path: '',
        component: UpdateComponent,
    }
]

@NgModule({
    declarations: [UpdateComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NzIconModule,
        NzTableModule,
        NzDatePickerModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMessageModule,
        NzSpinModule,
        NzModalModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class UpdateModule { }