import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  providers: [
    {
      // register this component as valid NG value accessor
        provide: NG_VALUE_ACCESSOR,
        multi:true,
        useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {


  @Input() legend:string;

  onTouched = () => {};

  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
      addressLine1: [null, [Validators.required]],
      addressLine2: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {

  }

  registerOnChange(onChange: any) {
    // when form value changes, we report this new value to parent using onChange
    // parent can register for changes
    // we subscribe to form changes and push those changes to onChange parameter
      this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }

  ngOnDestroy() {
      this.onChangeSub.unsubscribe();
  }


  writeValue(value: any) {
    // used by parent form to write a value to a child component
    // input value should contain values for all elements of the form
      if (value) {
          this.form.setValue(value);
      }
  }

  registerOnTouched(onTouched: any) {
      // parent form registers for onTouched events
      this.onTouched = onTouched;
  }

  setDisabledState(disabled:boolean) {
    // disable property if passed

      if (disabled) {
          this.form.disable();
      }
      else {
          this.form.enable();
      }

  }

}