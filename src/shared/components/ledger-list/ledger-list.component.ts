import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ledger, LedgerPage } from 'src/shared/model/ledger.model';

@Component({
  selector: 'ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss'],
})
export class LedgerListComponent implements OnChanges {
  @Input() ledgerPage: LedgerPage;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
