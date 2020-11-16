import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/Input.service';

@Component({
  selector: 'app-PostConfirm',
  templateUrl: './PostConfirm.component.html',
  styleUrls: ['./PostConfirm.component.scss']
})
export class PostConfirmComponent implements OnInit {

  public dataList$ = this.inputService.dataSubject.asObservable();

  constructor(private inputService: InputService) { }

  ngOnInit() {
  }

}
