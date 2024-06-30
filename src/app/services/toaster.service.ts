import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private _toaster:ToastrService) { }

  showSuccess() {
    this._toaster.success('تمت الاضافه بنجاح', 'إضافه');
  }
  showWarning() {
    this._toaster.warning('تم خفض الكميه ', 'تحذير');
  }
  showError() {
    this._toaster.error('تم الحذف بنجاج', 'حذف');
  }


}
