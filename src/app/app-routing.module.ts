import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from 'src/app/components/Input/Input.component';
import { PostConfirmComponent } from 'src/app/components/PostConfirm/PostConfirm.component';


const routes: Routes = [
  { path: '', component: InputComponent },
  { path: 'confirm', component: PostConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
