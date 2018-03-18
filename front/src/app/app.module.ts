import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basket', component: BasketComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent,
    SortPipe,
    HomeComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    ProductService,
    CustomerService,
    UpperCasePipe,
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'},
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
