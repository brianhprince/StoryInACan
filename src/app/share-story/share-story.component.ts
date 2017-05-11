import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { Story } from '../models/story';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-share-story',
  templateUrl: './share-story.component.html',
  styleUrls: ['./share-story.component.css']
})
export class ShareStoryComponent implements AfterViewChecked {

  submitted = false;
  newStory: Story = new Story;
  storyForm: NgForm;
  @ViewChild('storyForm') currentForm: NgForm;

  constructor() { }

  onSubmit() {
    this.submitted = true;
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.storyForm) { return; }
    this.storyForm = this.currentForm;
    if (this.storyForm) {
      this.storyForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.storyForm) { return; }
    const form = this.storyForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'title': '',
    'storyTeller': '',
    'tags': '',
  };

  validationMessages = {
    'title': {
      'required':      'You must give your story a title.',
      'minlength':     'The title must have 4 or more characters.',
      'maxlength':     'While we run in the cloud, we don`t have enough space to have a title longer than 24 characters. Please shorten it.',
    },
    'storyTeller': {
      'required':      'The story teller`s name is required.',
      'minlength':     'The story teller`s name must be at least 4 characters long.',
      'maxlength':     'The story teller`s name cannot be more than 24 characters long.',
    },
    'tags': {
      'maxlength':     'Please enter fewer tags. You can have up to 24 characters.',
    }
  };

}
