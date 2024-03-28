import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {

  msg: String
  routeSubscription: Subscription
  isSuccessful: Boolean

  constructor (
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe(
        (params) => {
          const email = params['email'];
          const token = params['token'];

          this.authService.verify(token, email).subscribe(
            (response) => {
              this.isSuccessful = true
              this.msg = 'Email is verified'
            },
            (error) => {
              this.isSuccessful = false
              this.msg = 'Something went wrong'
            })
        }
      )

  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }

}
