import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentService } from 'src/service/agent.service';
import { CustomerService } from 'src/service/customer.service';
import { UtilService } from 'src/service/util.service';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { Agent } from 'src/shared/model/agent.model';
import { InventoryType } from 'src/shared/model/inventory.model';
import { PHONE_NUMBER_PATTERN } from 'src/shared/forms/constants/validation-patterns-list';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent extends BaseFormComponent {
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
    private agentService: AgentService,
    private util: UtilService
  ) {
    super();
    this.searchPath = ['phone', 'name'];
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.typeList = Object.keys(this.typeEnum).map((o) => {
      return { _id: o, name: this.typeEnum[o] };
    });

    this.createForm();
    this.getCustomerList();
    this.getAgentList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && this.item != null) {
      this.form.reset();
      const date = this.util.convertFireabaseDateToNgbDate(this.item.date);
      const value = { ...this.item, date };
      this.exists = true;
      this.form.patchValue(value);
    }
    if (changes.vouchar_no && this.vouchar_no != null) {
      const vouchar_no = this.vouchar_no + 1;
      this.form.patchValue({ vouchar_no, sr_no: vouchar_no + '/' });
    }
  }

  async getCustomerList() {
    this.customerService.customers$.subscribe((data) => {
      this.customerList = data;
      this.customerList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getAgentList() {
    this.agentService.agents$.subscribe((data) => {
      this.agentList = data;
      this.agentList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  onQuanityChange(event) {
    console.log('onQuanityChange', event.target.value);
    this.form.patchValue({
      sr_no: `${this.vouchar_no + 1}/${event.target.value}`,
    });
  }

  onPhoneChange(event) {
    const phone = event.target.value;
    const customer = this.customerList.find((cus) => cus.phone === phone);
    if (customer) {
      this.existsCustomer = true;
      const value = {
        customerName: customer.name,
        customerFather: customer.father,
        customerPhone: customer.phone,
        customerAddress: customer.address,
      };
      this.form.patchValue(value);
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
      customerPhone: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
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
      delete fvalue['customerName'];
      delete fvalue['customerFather'];
      delete fvalue['customerPhone'];
      delete fvalue['customerAddress'];
      if (!this.existsCustomer) {
        this.customerService
          .create(customer as Agent)
          .then(() => console.log('New custome created'));
      }
      const value = { ...fvalue, date, customer };
      if (this.exists) {
        this.update.emit(value);
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
