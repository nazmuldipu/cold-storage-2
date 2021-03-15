import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/service/customer.service';
import { UtilService } from 'src/service/util.service';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { PHONE_NUMBER_PATTERN } from 'src/shared/forms/constants/validation-patterns-list';
import { Agent } from 'src/shared/model/agent.model';
import { InventoryType } from 'src/shared/model/inventory.model';
import _ from 'lodash';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent
  extends BaseFormComponent
  implements OnChanges {
  @Input() vouchar_no: number;

  typeEnum = InventoryType;
  typeList = [];
  searchPath = [];
  ngDate;

  agentList: Agent[] = [];
  customerList: Agent[] = [];
  existsCustomer = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,

    private util: UtilService
  ) {
    super();
    this.searchPath = ['phone', 'name'];
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.typeList = Object.keys(this.typeEnum).map((o) => {
      return { _id: o, name: this.typeEnum[o] };
    });

    this.createForm();
    // this.getCustomerList();
    // this.getAgentList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.item && this.item != null) {
      this.form.reset();
      const date = this.util.convertFireabaseDateToNgbDate(this.item.date);
      const value = {
        ...this.item,
        date,
        customerName: this.item.customer.name,
        customerFather: this.item.customer.father,
        customerPhone: this.item.customer.phone,
        customerAddress: this.item.customer.address,
      };
      this.exists = true;
      this.form.patchValue(value);
    }
    if (changes.vouchar_no && this.vouchar_no != null) {
      const vouchar_no = this.vouchar_no + 1;
      this.form.patchValue({ vouchar_no, sr_no: vouchar_no + '/' });
    }
  }

  // async getCustomerList() {
  //   this.customerService.customers$.subscribe((data) => {
  //     this.customerList = data;
  //     this.customerList.sort(this.util.dynamicSortObject('priority'));
  //   });
  // }

  // async getAgentList() {
  //   this.agentService.agents$.subscribe((data) => {
  //     this.agentList = data;
  //     this.agentList.sort(this.util.dynamicSortObject('priority'));
  //   });
  // }

  onQuanityChange(event) {
    const sr_no = this.exists
      ? `${this.item.vouchar_no}/${event.target.value}`
      : `${this.vouchar_no + 1}/${event.target.value}`;

    this.form.patchValue({
      sr_no,
    });
  }

  async onPhoneChange(event) {
    const phone = event.target.value;
    if (phone.length == 11) {
      try {
        const { docs } = await this.customerService
          .getCustomerList(1, 10, 'phone', 'asc', phone)
          .toPromise();
        if (docs.length) {
          this.existsCustomer = true;
          const customer = docs[0];
          const value = {
            customerName: customer.name,
            customerFather: customer.father,
            customerPhone: customer.phone,
            customerAddress: customer.address,
          };
          this.form.patchValue(value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  createForm() {
    this.form = this.fb.group({
      inventoryType: ['RECEIVE', Validators.required],
      vouchar_no: [0, Validators.required],
      date: [this.ngDate, Validators.required],
      year: [this.ngDate.year, Validators.required],
      sr_no: ['', Validators.required],
      name: ['Potato', Validators.required],
      customerName: ['', Validators.required],
      customerFather: ['', Validators.required],
      customerPhone: ['', [Validators.pattern(PHONE_NUMBER_PATTERN)]],
      customerAddress: ['', Validators.required],
      // customer: ['', Validators.required],
      agent: [''],
      quantity: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const date = this.util.convertNgbDateToJsDate(fvalue.date);
      const customer = {
        name: fvalue.customerName,
        father: fvalue.customerFather,
        phone: fvalue.customerPhone,
        address: fvalue.customerAddress,
      };
      var result = _.omit(fvalue, [
        'customerName',
        'customerFather',
        'customerPhone',
        'customerAddress',
      ]);
      _.unset(result, 'agent._id');
      const value = { ...result, date, customer };
      console.log(value);

      if (this.exists) {
        this.update.emit({ _id: this.item._id, ...value });
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  clean() {
    super.clean();
    const value = {
      inventoryType: 'RECEIVE',
      name: 'Potato',
      vouchar_no: this.vouchar_no + 1,
      date: this.ngDate,
      year: this.ngDate.year,
    };
    this.form.patchValue(value);
  }
}
