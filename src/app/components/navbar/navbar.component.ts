import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar'
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    MenuModule,
    RouterLink
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit() {

    
  }
  


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  login(){
    this.router.navigate(['/login'])
  }

}
