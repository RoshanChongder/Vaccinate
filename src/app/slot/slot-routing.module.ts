import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FindSlotComponent } from '../find-slot/find-slot.component';
import { LoginGuardService } from '../login/login-guard.service';

const routes: Routes = [
    { 
        path : "slot"   , 
        component : FindSlotComponent , 
        canActivate :[ LoginGuardService] 
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SlotRoutingModule { }