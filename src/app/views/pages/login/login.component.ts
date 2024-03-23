import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = new User();
  err: number = 0;
  myForm!: FormGroup;
  enabled: boolean = true;
  passwordVisibility: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        if (this.authService.isAdmin()) this.router.navigate(['applications']);
        else {
          this.router.navigate(['mes-applications']);
        }
      },
      error: (err: any) => {
        console.log('err' + err);
        this.err = 1;
        if ((this.err = 1)) {
          Swal.fire({
            title: 'Login ou mot de passe erronés..',
            icon: 'error',
            footer: 'Vérifier vos informations!!',
          });
        }
        if (err.error.errorCause == 'disabled') {
          this.err = 1;
          Swal.fire({
            title: 'Utilisateur désactivé',
            icon: 'error',
            footer: 'Veuillez contacter votre Administrateur',
          });
        }
      },
    });
  }
}
