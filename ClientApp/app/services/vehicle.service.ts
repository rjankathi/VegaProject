import { Vechicle, SaveVechicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http:Http) { }
  getMakes(){
    return this.http.get('/api/makes')
    .map(res=>res.json());
  }

  getFeatures(){
    return this.http.get('/api/features')
      .map(res=>res.json());
  }

  create(vehicle:any){
    return this.http.post('/api/vehicles',vehicle)
    .map(res => res.json());
  }

  getVehicle(id:number){
    return this.http.get('/api/vehicles/' + id)
    .map(res =>res.json());
  }

  update(vehicle:SaveVechicle){
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
    .map(res=>res.json());
  }

  delete(id:number){
    return this.http.delete('/api/vehicles/' + id)
    .map(res=>res.json());
  }
}