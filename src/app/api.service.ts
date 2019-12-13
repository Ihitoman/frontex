import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Actividad } from './home/actividad';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseurl = "http://ec2-54-198-45-95.compute-1.amazonaws.com"
  //baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  baseurl;
  constructor(private http: HttpClient) {
    this.baseurl = "https://extrasoa.herokuapp.com/extra/admin/";
  }

  token: string;

  getAllActividades(): Observable<any>{
    //let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + 'lista_actividades/', 
    {headers: this.httpHeaders});
  }

  getOneActividad(id): Observable<any>{
    //let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + 'lista_cosa/' +id, 
    {headers: this.httpHeaders});
  }

  createActividad(actividad): Observable<any>{
    //let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    const body = {
      name: actividad.name, 
      date: actividad.date,
      hour: actividad.hour
    };
    return this.http.post(this.baseurl + 'lista_actividades/', body,
    {headers: this.httpHeaders});
  }

  createCosa(cosa): Observable<any>{
    //let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    const body = {
      name: cosa.name, 
      actividad_id: cosa.actividad_id
    };
    console.log(body);
    console.log("///////////////////////////////////////////////")
    return this.http.post(this.baseurl + 'add_actividades/', body,
    {headers: this.httpHeaders});
  }

  /*updateAlumno(id, alumno): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    const body = {
      id: id,
      nombre: alumno.nombre, 
      apellidos: alumno.apellidos,
      edad: Number(alumno.edad), 
      sexo: alumno.sexo,
      direccion: alumno.direccion,
      carrera_id: Number(alumno.carrera)
    };
    return this.http.put(this.baseurl + '/sistemasoperativos/admin/alumnos_detail/' + id, JSON.stringify(body), 
    {headers: header});
  }*/


}
