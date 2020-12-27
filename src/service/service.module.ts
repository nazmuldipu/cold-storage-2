import { NgModule } from '@angular/core';

import { AgentService } from './agent.service';
import { AuthService } from './auth.service';
import { ChamberTypeService } from './chamber-type.service';
import { ChamberService } from './chamber.service';
import { CompanyService } from './company.service';
import { CustomerService } from './customer.service';
import { FloorService } from './floor.service';
import { LineService } from './line.service';
import { PocketService } from './pocket.service';
import { PositionService } from './position.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';


@NgModule({
  providers: [
    AgentService,
    AuthService,
    ChamberService,
    ChamberTypeService,
    CompanyService,
    CustomerService,
    FloorService,
    LineService,
    PocketService,
    PositionService,
    RoleService,
    UtilService,
    UserService,
  ],
})
export class ServiceModule { }
