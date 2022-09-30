import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AltasService } from '../../services/altas.service';
import { AltaModel } from '../../models/alta.modelo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registros: AltaModel[] = [];
  isLoading: boolean = false;
  isRegistrosEmpty: boolean = false;

  constructor(private auth: AuthService,
              private router: Router,
              private altaService : AltasService) { }

  ngOnInit() {
    this.isLoading = true;
    this.altaService.getRegistros()
    .subscribe(resp=> {
      this.isLoading = false;
      this.registros = resp
      if(!this.registros.length) {
        this.isRegistrosEmpty = true;
      }
    });
  }
  salir() {
      this.auth.logout();
      this.router.navigateByUrl('/login');
  }

}
