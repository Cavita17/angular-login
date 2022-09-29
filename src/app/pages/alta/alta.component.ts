import { Component, OnInit } from '@angular/core';
import { AltaModel } from '../../models/alta.modelo';
import { NgForm } from '@angular/forms';
import { AltasService } from '../../services/altas.service';

import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
selector: 'app-alta',
templateUrl: './alta.component.html',
styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

alta = new AltaModel();

constructor( private AltasService : AltasService,
              private route : ActivatedRoute  ) { }

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (id!=='nuevo'){
    this.AltasService.getRegistroById(id)
    .subscribe((resp : AltaModel)=>{
      this.alta = resp;
      this.alta.id = id;
    })
  }


}

guardar( form : NgForm ){
  if(form.invalid){
    console.log('Formulario no valido');
    return ;
  }

  Swal.fire({
    title:'Espere',
    text:'Guardando Informaciòn',
    icon: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();

let peticion : Observable<any>;

  if (this.alta.id){
    peticion =this.AltasService.actualizarRegistro(this.alta);

  } else {
    peticion =this.AltasService.crearAlta(this.alta)

  }

  peticion.subscribe (resp =>{
    Swal.fire({
      title: this.alta.nombre,
      text: 'Se Actualizo Correctamente',
      icon: 'success'

    })
  })

 }

}
