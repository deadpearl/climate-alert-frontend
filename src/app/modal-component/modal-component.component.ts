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
  description: string | undefined;
  comment: string | undefined;
  admin: string | undefined;
  adminList: any = null;
  actionList: any = ['Согласовать', 'Корректировка'];
  action: any = null;
  constructor(public activeModal: NgbActiveModal, private modalService: ModalService,
              private userService: UserService) {}

  ngOnInit() {
    this.assigned = this.modalService.isAssigned();
    this.approving = this.modalService.isApproving();
    if (this.assigned) {
     this.adminList = this.userService.getAdmins();
     console.log(this.adminList);
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
}
