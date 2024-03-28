import { NgModule } from "@angular/core";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterComponent } from "./features/auth/register/register.component";
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { VerifyComponent } from './features/auth/verify/verify.component';

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent, VerifyComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
	providers: [provideClientHydration(), provideHttpClient(withInterceptorsFromDi(),withFetch())],
	bootstrap: [AppComponent]
})
export class AppModule {}
