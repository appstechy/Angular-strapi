import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'about-us', component: HomeComponent },
  // { path: 'courses', component: CoursesComponent },
  // { path: 'gallery', component: GalleryComponent },
  // { path: 'studyportal', component: StudyportalComponent },
  // { path: 'contactus', component: ContactusComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




