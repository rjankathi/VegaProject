import { Vechicle, SaveVechicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
 private readonly vehiclesEndpoint:string = '/api/vehicles';

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
    return this.http.post(this.vehiclesEndpoint + '/',vehicle)
    .map(res => res.json());
  }

  getVehicle(id:number){
    return this.http.get(this.vehiclesEndpoint + '/' + id)
    .map(res =>res.json());
  }

  getVehicles(filter:any){
    return this.http.get(this.vehiclesEndpoint + '?'+ this.toqueryString(filter))
    .map(res =>res.json());
  }

  toqueryString(obj:any){
    var parts = [];
    for(var prop in obj){
      var value = obj[prop];
      if(value != null && value != undefined)
        parts.push(encodeURIComponent(prop) + '=' + encodeURIComponent(value));

    }

    return parts.join('&');
  }

  update(vehicle:SaveVechicle){
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
    .map(res=>res.json());
  }

  delete(id:number){
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
    .map(res=>res.json());
  }
}
