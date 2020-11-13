import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { FormsModule } from '@angular/forms';
import { PensionComponent } from './pension/pension.component';
import { TrimestreComponent } from './trimestre/trimestre.component';
import { ShowPensionComponent } from './show-pension/show-pension.component';
import { FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { SamComponent } from './sam/sam.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    PensionComponent,
    TrimestreComponent,
    ShowPensionComponent,
    SamComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'info', component: InfoComponent },
      { path: 'pension', component: PensionComponent },
      { path: 'trimestre', component: TrimestreComponent },
      { path: 'sam', component:SamComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 

}
