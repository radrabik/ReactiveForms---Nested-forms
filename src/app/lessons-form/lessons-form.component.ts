import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.css']
})
export class LessonsFormComponent  {
  
    form = this.fb.group({
      lessons: this.fb.array([])
    });

    constructor(private fb:FormBuilder) {

    }

    get lessons() {
      return this.form.controls["lessons"] as FormArray;
    }

    addLesson() {

      const lessonForm = this.fb.group({
          title: ['', Validators.required],
          level: ['beginner', Validators.required]
      });

      this.lessons.push(lessonForm);
    }

    deleteLesson(lessonIndex: number) {
      this.lessons.removeAt(lessonIndex);
    }

}