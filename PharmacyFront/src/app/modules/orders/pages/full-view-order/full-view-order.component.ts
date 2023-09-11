import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../types/order';
import { OrderWithLoadedItems } from '../../types/full-loaded-order';
import { OrdersService } from '../../services/orders.service';
import { LoadedOrderItem } from '../../types/loaded-order-item';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BasicReviewDeliverer } from 'src/app/modules/review/types/review';
import { ReviewService } from 'src/app/modules/review/services/review.service';
import { BasicUserData } from 'src/app/modules/user/types/userData';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-full-view-order',
  templateUrl: './full-view-order.component.html',
  styleUrls: ['./full-view-order.component.scss'],
})
export class FullViewOrderComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  orderId!: number;
  order!: OrderWithLoadedItems;
  isEditableObservable!: Observable<boolean>;
  reviewDeliverer?: BasicReviewDeliverer | null = undefined;
  successChanged!: boolean;
  choosedOrderItemId?: number;
  modalRef!: NgbModalRef;
  reviewDelivererClicked: boolean = false;
  user!: BasicUserData;
  deliverer !:BasicUserData;
  private orderSubscription!: Subscription;
  private orderSubject: BehaviorSubject<OrderWithLoadedItems | null> =
    new BehaviorSubject<OrderWithLoadedItems | null>(null);
  order$ = this.orderSubject.asObservable();
  constructor(
    private router: ActivatedRoute,
    private r: Router,
    private orderService: OrdersService,
    public authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private reviewService: ReviewService,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.orderId = params['id']; // Zamenite 'paramName' sa stvarnim imenom parametra
      this.orderService.findById(this.orderId).subscribe({
        next: (res) => {
          this.order = res.data;
          this.orderSubject.next(this.order);
          this.fillForm(res.data);
          if(!this.authService.isCustomer()){
            this.findUser();
          }
          if(!this.authService.isCustomer() && this.order.deliverer_id){
            this.findDeliverer();
          }
          if (
            this.order.delivery &&
            this.order.deliverer_id &&
            this.order.order_status === 'FINISHED'
          ) {
            this.checkReviewDeliverer();
          }
        },
        error: (err) => {},
      });
    });

    this.orderSubscription = this.order$.subscribe((order) => {
      if (this.isEditable()) {
        this.form.get('delivery')?.enable();
      } else {
        this.form.get('delivery')?.disable();
      }
    });
  }

  findUser(){
    this.userService.findBasicUserById(this.order.user_id).subscribe({
      next: (res) =>{this.user = res.data;},
      error: (err) =>{}
    })
  }

  findDeliverer(){
    this.userService.findBasicUserById(this.order.deliverer_id as number).subscribe({
      next: (res) =>{this.deliverer = res.data;},
      error: (err) =>{}
    })
  }
  checkReviewDeliverer() {
    this.reviewService
      .findDelivererReviewByDelivererIdUserIdOrderId(
        this.order.deliverer_id as number,
        this.order.id
      )
      .subscribe({
        next: (res) => {
          this.reviewDeliverer = res.data;
        },
        error: (err) => {
          this.reviewDeliverer = null;
        },
      });
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

  createForm() {
    this.form = this.fb.group({
      address: [
        null,
        this.deliveryInitiallyTrue() ? [Validators.required] : [],
      ],
      note: [null],
      delivery: [{ value: null, disabled: !this.isEditable() }],
      items: this.fb.array([]),
    });
    this.form.get('delivery')?.valueChanges.subscribe((value) => {
      const addressControl = this.form.get('address');
      if (value) {
        addressControl?.setValidators([Validators.required]);
      } else {
        addressControl?.clearValidators();
      }
      addressControl?.updateValueAndValidity();
    });
  }

  fillForm(data: OrderWithLoadedItems) {
    const itemsArray = this.form.get('items') as FormArray;
    data.items.forEach((item) => {
      itemsArray.push(this.createItemFormGroup(item));
    });
    console.log(data.delivery);
    this.form.patchValue({
      address: data.address,
      delivery: data.delivery,
      note: data.note,
    });

    console.log("EVO");
    console.log(this.form);
  }

  deliveryInitiallyTrue(): boolean {
    return this.order?.delivery === true;
  }

  createItemFormGroup(item: any): FormGroup {
    return this.fb.group({
      id: [item.id],
      quantity: [
        item.quantity,
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
      image: [item.image],
      name: [item.name],
      price: [item.price],
      product_id:[item.product_id]
    });
  }

  getTotal() {
    let total = 0;
    for (let item of this.form.value.items) {
      total += item.price * item.quantity;
    }
    return total;
  }

  isEditable() {
    return (
      this.authService.isCustomer() && this.order?.order_status === 'CREATED'
    );
  }

  deleteItem() {
    if (this.choosedOrderItemId) {
      this.orderService.deleteOrderItem(this.choosedOrderItemId).subscribe({
        next: (res) => {
          this.order.items = this.order.items.filter(
            (item) => item.id != this.choosedOrderItemId
          );
          this.createForm();
          this.fillForm(this.order);
          this.modalRef.close();
        },
        error: (err) => {},
      });
    }
  }

  openModal(target: any, orderItemId: number) {
    this.modalRef = this.modalService.open(target, {
      centered: true,
      backdrop: 'static',
    });
    this.choosedOrderItemId = orderItemId;
  }

  handleNotification(){
    this.checkReviewDeliverer();
  }
  onUserClick(userId:number){
    this.r.navigate(['user/profile'],{queryParams:{id:userId}});
  }

  saveChanges() {
    let changed_items = [];
    for (let group of this.form.value.items) {
      let item = {
        id: group.id,
        quantity: group.quantity,
      };
      changed_items.push(item);
    }
    let changeObject = {
      address: this.form.value.delivery ? this.form.value.address : '',
      delivery: this.form.value.delivery,
      note: this.form.value.note,
      items: changed_items,
    };
    console.log(changeObject);
    this.orderService.saveChanges(this.order.id, changeObject).subscribe({
      next: (res) => {
        this.successChanged = true;
        setTimeout(() => {
          this.successChanged = false;
        }, 1200);
      },
      error: (err) => {},
    });
  }

  onProductClicked(productId: number) {
    this.r.navigate(['/full-view-product'], { queryParams: { id: productId } });
  }

  getItems(): FormArray {
    return this.form.get('items') as FormArray;
  }

  clickReviewDeliverer() {
    this.reviewDelivererClicked = !this.reviewDelivererClicked;
  }

  onNameClick(productId:number){
    this.r.navigate(['full-view-product'], {queryParams: {id:productId}})
  }
}
