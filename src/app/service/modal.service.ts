import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponentComponent} from '../modal-component/modal-component.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}
  assign = false;

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
  isAssigned() {
    return this.assign;
  }
}
