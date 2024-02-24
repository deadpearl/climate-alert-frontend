import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../service/modal.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  assigned = false;
  approving = false;
  isRegion = false;
  region: any = null;
  regionIso: any = null;
  regionList: any = null;
  offset: any = 0;
  regionsVisible: any = false;
  description: string | undefined;
  comment: string | undefined;
  admin: string | undefined;
  adminList: any = null;
  actionList: any = ['Согласовать', 'Корректировка'];
  placeSelectList: any = ['Area', 'City'];
  action: any = null;
  placeSelect: any = null;
  place: any = null;
  placeObject: any = null;
  placeList: any = null;
  placeButton: any = false;
  placesVisible: any = false;
  constructor(public activeModal: NgbActiveModal, private modalService: ModalService,
              private userService: UserService) {}

  ngOnInit() {
    this.assigned = this.modalService.isAssigned();
    this.approving = this.modalService.isApproving();
    this.isRegion = this.modalService.isRegionModal();
    if (this.assigned) {
     this.adminList = this.userService.getAdmins();
     console.log(this.adminList);
    } else if (this.isRegion) {
      this.modalService.getAllRegions(this.offset).then(resp => {
        this.regionList = resp;
      });
    }
  }


  saveAndClose(): void {
    const values = {
      description: this.description,
      comment: this.comment,
      admin: this.admin,
    };
    this.activeModal.close(values);
  }
  saveApproval() {
    const values = {
      comment: this.comment,
      action: this.action,
    };
    console.log(values);
    this.activeModal.close(values);
  }
  saveRegion() {
    this.activeModal.close(this.placeObject);
  }

  searchRegion() {
    this.regionsVisible = true;
    if (this.region) {
      this.modalService.getRegions(this.region, this.offset).then(resp => {
        this.regionList = resp;
      });
    }
  }

  nextRegion() {
  }

  chooseRegion(reg: any) {
    this.regionsVisible = false;
    this.region = reg.name;
    this.regionIso = reg.isoCode;
    this.placeButton = true;
  }

  searchPlace() {
    this.placesVisible = true;
    if (this.region && this.placeSelect) {
      if (this.placeSelect === 'Area') {
        this.modalService.getPlace('ADM2', this.offset, this.regionIso).then(resp => {
          this.placeList = resp;
        });
      } else if (this.placeSelect === 'City') {
        this.modalService.getPlace('CITY', this.offset, this.regionIso).then(resp => {
          this.placeList = resp;
        });
      }
    }
  }

  choosePlace(reg: any) {
    this.placesVisible = false;
    this.place = reg.name;
    this.placeObject = reg;
  }
}
