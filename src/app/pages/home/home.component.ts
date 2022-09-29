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

  constructor(private auth: AuthService,
              private router: Router,
              private altaService : AltasService) { }

  ngOnInit() {
    this.altaService.getRegistros()
    .subscribe(resp=> this.registros = resp);
  }
  salir() {
      this.auth.logout();
      this.router.navigateByUrl('/login');
  }

}
