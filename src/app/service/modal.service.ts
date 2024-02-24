import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponentComponent} from '../modal-component/modal-component.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal, private http: HttpClient) {}
  assign = false;
  approve = false;
  region = false;

  openModal(title: string, content: string) {
    const modalRef = this.modalService.open(ModalComponentComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;

    return modalRef.result; // Возвращение Promise, который разрешится при закрытии модального окна
  }

  assignModal(title: string, content: string): Promise<any> {
    this.assign = true;
    const modalRef = this.modalService.open(ModalComponentComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }
  approveModal(title: string, content: string): Promise<any> {
    this.approve = true;
    const modalRef = this.modalService.open(ModalComponentComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }
  selectRegionModal(title: string, content: string): Promise<any> {
    this.region = true;
    const modalRef = this.modalService.open(ModalComponentComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }
  isAssigned() {
    return this.assign;
  }
  isApproving() {
    return this.approve;
  }
  isRegionModal() {
    return this.region;
  }
  getRegions(namePrefix, offset) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/KZ/regions?namePrefix=${namePrefix}&hateoasMode=false&limit=10&offset=${offset}`).toPromise();
  }
  getPlace(type, offset, region) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/KZ/regions/${region}/places?types=${type}&hateoasMode=false&limit=10&offset=${offset}&sort=name`).toPromise();
  }
  getAllRegions(offset) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://geodb-free-service.wirefreethought.com/v1/geo/countries/KZ/regions?namePrefix=&hateoasMode=false&limit=10&offset=${offset}`).toPromise();
  }
}
