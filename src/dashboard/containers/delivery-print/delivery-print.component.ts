import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/service/delivery.service';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from 'src/shared/model/delivery.model';
import { CompanyInfo } from 'src/shared/data/company.data';

@Component({
  selector: 'app-delivery-print',
  templateUrl: './delivery-print.component.html',
  styleUrls: ['./delivery-print.component.scss']
})
export class DeliveryPrintComponent implements OnInit {
  id;
  delivery: Delivery;
  company = CompanyInfo;

  constructor(private deliveryService: DeliveryService, private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.getDelivery(this.id);
    }
  }

  async getDelivery(id) {
    this.deliveryService.deliverys$.subscribe(data => {
      this.delivery = data.find(inv => inv._id == id);
    })
  }

}
