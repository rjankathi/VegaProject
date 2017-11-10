import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vechicle, KeyValuePair } from './../../models/vehicle';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
private readonly PAGE_SIZE = 3;
  //vehicles: Vechicle[];
  queryResult:any ={};
  makes:KeyValuePair[];
  query:any = {
    pageSize:this.PAGE_SIZE
  };
  //allVehicles:Vechicle[];
  columns = [
    { title:'Id',key:'id',isSortable:false},
    { title:'Contact Name',key:'contactName',isSortable:true},
    { title:'Make',key:'make',isSortable:true},
    { title:'Model',key:'model',isSortable:true},
    {}
  ];


  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {

    this.vehicleService.getMakes().subscribe(makes=> this.makes = makes);

    this.populateVehicles();
  }

  populateVehicles(){
    this.vehicleService.getVehicles(this.query)
    // .subscribe((vehicles:any) => this.vehicles = this.allVehicles = vehicles)
    .subscribe((result:any) => this.queryResult = result)
  }

  onFilterChange(){
    //Client side filtering
    //var vehicles = this.allVehicles;
    // if(this.filter.makeId)
    //  vehicles= vehicles.filter(v =>v.make.id == this.filter.makeId);
    // if(this.filter.modelId)
    //  vehicles= vehicles.filter(v =>v.model.id == this.filter.modelId);
    //  this.vehicles = vehicles;

    //Server side filtering
    this.query.page = 1;
    this.populateVehicles();
     
  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName:any){
    if(this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    }else{
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page:number){
    this.query.page = page;
    this.populateVehicles();
  }

}
