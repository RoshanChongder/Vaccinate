import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SlotServiceService } from './slot-service.service';
@Component({
  selector: 'app-find-slot',
  templateUrl: './find-slot.component.html',
  styleUrls: ['./find-slot.component.css']
})
export class FindSlotComponent implements OnInit {

  states: any = [];
  districts: any = [];
  date: any;
  centers: any[] = [];
  copyenters: any[] = [];
  pincode: any;
  feesType: String = 'Both';
  vacineType: String = 'All';

  selectedState: any;
  selectedDistrict: any;

  showdist: boolean = false;
  showstate: boolean = false;
  showdate: boolean = false;
  searchByDist: boolean = true;
  searchByPincode: boolean = false;
  showTable: boolean = false;
  invalidPin: boolean = false;


  // to search uisng district 
  searchByDistrict() {
    this.searchByDist = true;
    this.searchByPincode = false;
    this.date = undefined;
  }

  // to search using pin code 
  searchByPinCode() {
    this.searchByDist = false;
    this.searchByPincode = true;
    this.date = undefined;
  }

  constructor(private slotService: SlotServiceService) {
    this.slotService.getState().subscribe(
      (response) => {
        this.states = response.states;
        this.showstate = true;
      }, (error) => {
        // add a banner notification
        this.states = [];
      }
    );
  }

  findByPincode() {
    this.slotService.getSlotDetailWithPinCode(this.pincode.toString(), this.date).subscribe(
      (response) => {
        this.centers = response.sessions; this.copyenters = this.centers;
        this.showTable = true;
        this.searchByPincode = false;
      },
      (error) => {
        // add a banner notification
      }
    );
  }

  ngOnInit(): void { }


  getDistrict(state: any) {
    this.selectedState = state;
    this.slotService.getDistrict(state).subscribe(
      (response) => {
        this.districts = response.districts;
        this.showdist = true;
      },
      (err) => {
        // add a banner notification
        this.districts = [];
      }
    );
  }

  find() {
    this.slotService.getSlotDetailWithDistrict(this.selectedDistrict, this.date)
      .subscribe(
        (response) => {
          this.centers = response.sessions; this.copyenters = this.centers;
          this.showTable = true;
          this.showdate = this.showdist = this.showstate = false;
        },
        (err) => {
          // add a banner notification 
        }
      );
  }

  validatePincode() {
    if (this.pincode.toString().length == 6) {
      this.invalidPin = false;
    }
    else {
      this.invalidPin = true;
    }
  }

  filterFees(type: String) {

    this.feesType = type;
    if (type == 'Both') {
      if (this.vacineType == 'All') {
        this.centers = this.copyenters;
      } else {
        this.centers = [];
        for (let i = 0; i < this.copyenters.length; i++) {
          if (this.copyenters[i].vaccine == this.vacineType) {
            this.centers.push(this.copyenters[i]);
          }
        }
      }
    }
    else {
      this.centers = [];
      for (let i = 0; i < this.copyenters.length; i++) {
        if (this.vacineType == 'All') {
          if (this.copyenters[i].fee_type == type)
            this.centers.push(this.copyenters[i]);
        } else {
          if (this.copyenters[i].fee_type == type && this.copyenters[i].vaccine == this.vacineType)
            this.centers.push(this.copyenters[i]);
        }
      }
    }
  }

  filterVaccine(type: String) {
    this.vacineType = type;
    if (type == 'All') {
      if (this.feesType == 'Both') {
        this.centers = this.copyenters;
      } else {
        this.centers = [];
        for (let i = 0; i < this.copyenters.length; i++) {
          if (this.copyenters[i].fee_type == this.feesType) {
            this.centers.push(this.copyenters[i]);
          }
        }
      }
    }
    else {
      this.centers = [];
      if (this.feesType == 'Both') {
        for (let i = 0; i < this.copyenters.length; i++) {
          if (this.copyenters[i].vaccine == type)
            this.centers.push(this.copyenters[i]);
        }
      } else {
        for (let i = 0; i < this.copyenters.length; i++) {
          if (this.copyenters[i].vaccine == type && this.copyenters[i].fee_type == this.feesType)
            this.centers.push(this.copyenters[i]);
        }
      }
    }
  }

  back() {
    this.showTable = false;
    this.showstate = true;
    this.searchByDist = true;
    this.vacineType = 'All';
    this.feesType = 'Both';
  }
}
