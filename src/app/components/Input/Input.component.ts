import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputService } from 'src/app/services/Input.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Input',
  templateUrl: './Input.component.html',
  styleUrls: ['./Input.component.scss']
})
export class InputComponent implements OnInit {

  public name = '';
  public id = 1;

  constructor(private inputService: InputService, private router: Router) { }

  ngOnInit() {
  }

  insert() {
    console.log(this.name);
    this.inputService.addData({ id: this.id, data: this.name, status: 'yet' });
    this.id += 1;

  }

  post() {
    this.inputService.prePost();
    this.inputService.postAll();
    this.router.navigate(['confirm']);
  }

}
