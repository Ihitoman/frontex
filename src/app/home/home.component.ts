import { Component, OnInit, Input } from '@angular/core';
import { Actividad } from './actividad';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  actividades = [{title: 'test'}];
  cosas = [{title: 'test'}];
  buttonModificar: boolean = false;
  token: string;

  constructor(private _router: Router, private api: ApiService){
    this.getActividad();
    //this.getLocalStorage();
  }


  cosa: string;
  name: string;
  date: string;
  hour: string;
  actividad_id: number;
  
  
  selectedActividad: Actividad = new Actividad();

  /*getLocalStorage(){
    let Token = localStorage.getItem("Token");
    if(Token == "0"){
      this._router.navigate(['../login']);
    }
  }*/

  AddActividad(){
    let actividadadd:any;
    actividadadd = {'name' : this.name,
                    'date': this.date,
                    'hour': this.hour };
    this.api.createActividad(actividadadd).subscribe(
      data => {
        this.actividades.push(data);
      },
      error => {
        console.log(error);
      }
    );
    this.Cancelar();
  }

  AddThings(){
    let cosaadd:any;
    cosaadd = {'name' : this.name,
                'actividad_id': this.actividad_id };
    this.api.createCosa(cosaadd).subscribe(
      data => {
        this.cosas.push(data);
      },
      error => {
        console.log(error);
      }
    );
    this.Cancelar();
  }

  openEdit(actividad){   
    this.api.getOneActividad(actividad.id).subscribe(
      data => {
        this.cosas = data;
        this.name = actividad.name;
        this.date = actividad.date;
        this.hour = actividad.hour;
      },
      error => {
        console.log(error);
      }
    );    
  }


  Cancelar(){
    this.cosa = '';
  }

  ngOnInit() {  
  }

  getActividad = () => {
    this.api.getAllActividades().subscribe(
      data => {
        this.actividades = data;
      },
      error => {
        console.log(error)
      }
    );
  }
}
