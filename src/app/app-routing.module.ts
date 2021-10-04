import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { QuestionsComponent } from './questions/questions.component';
import { TestsComponent } from './tests/tests.component';

const routes: Routes = [
  {path: '', redirectTo: '/tests', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'tests', component: TestsComponent},
  {path: 'test', component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
