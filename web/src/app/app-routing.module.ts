import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
    },
    // {
    //     path: 'scribe-seeker',
    //     loadChildren: () => import('./auth/registration/scribe-seeker/scribe-seeker.module').then(m => m.ScribeSeekerPageModule)
    // },
    // {
    //     path: 'scribe-volunteer',
    //     loadChildren: () => import('./auth/registration/scribe-volunteer/scribe-volunteer.module').then(m => m.ScribeVolunteerPageModule)
    // },
    {
        path: 'forgotpassword',
        loadChildren: () => import('./auth/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
    },
    {

        path: 'registration/scribe-seeker',
        loadChildren: () => import('./auth/registration/scribe-seeker/scribe-seeker.module').then(m => m.ScribeSeekerPageModule)
    },
    {
        path: 'registration/scribe-volunteer',
        loadChildren: () => import('./auth/registration/scribe-volunteer/scribe-volunteer.module').then(m => m.ScribeVolunteerPageModule)
    },
    {
        path: 'scribe-volunteer',
        loadChildren: () => import('./scribe-volunteer/scribe-volunteer.module').then(m => m.ScribeVolunteerPageModule)
    },
    {
        path: 'scribe-seeker',
        loadChildren: () => import('./scribe-seeker/scribe-seeker.module').then(m => m.ScribeSeekerPageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
