import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { ChamberService } from './chamber.service';
import { FloorService } from './floor.service';
import { LineService } from './line.service';
import { PocketService } from './pocket.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';


@NgModule({
  providers: [
    AuthService,
    UserService,
    ChamberService,
    FloorService,
    LineService,
    PocketService,
    UtilService,
  ],
})
export class ServiceModule { }
