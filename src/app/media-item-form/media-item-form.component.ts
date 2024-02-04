import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { MediaItemService } from '../media-item.service';
import { lookupListToken } from '../providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService,
    @Inject(lookupListToken) public lookupLists: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.min(1900),
        Validators.max(2100),
      ])),
    });
  }

  customYearValidator(control: FormControl): ValidationErrors | null {
    if (control.value.trim().length === 0) {
      return null; // Allow empty field
    }
    const year = parseInt(control.value, 10);
    const minYear = 1900;
    const maxYear = 2100;
    const isNumber = !isNaN(year); // Check if value is actually a number
    if (!isNumber || year < minYear || year > maxYear) {
      return { year: true }; // Return error object
    }
    // Additional checks (e.g., specific years not allowed)
    if (year === 2012) { // Example custom check
      return { year: 'Specific year not allowed' };
    }
    return null; // Valid
  }

  onSubmit(mediaItem: any) {
    console.log(mediaItem);
    this.mediaItemService.add(mediaItem)
      .subscribe(() => {
        this.router.navigate(['/', mediaItem.medium]);
      });
  }
}