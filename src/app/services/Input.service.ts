import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  public data: { id: number, data: string, status: string }[] = [];
  public dataSubject = new BehaviorSubject<{ id: number, data: string, status: string }[]>([]);

  constructor(private http: HttpClient) { }

  addData(data: { id: number, data: string, status: string }) {
    this.data = [...this.data, data];
  }

  prePost() {
    this.dataSubject.next(this.data);
  }

  async postAll() {
    for (let i = 0; i < this.data.length; i++) {
      this.post(this.data[i].id);
      await this.sleep(1000);

    }
  }

  post(dataId: number) {
    this.http.get<{ id: number, status: string }[]>('http://localhost:3000/checkdata',
      { params: new HttpParams().set('id', `${dataId}`) }).subscribe(
        data => {
          console.log(data[0]);
          if (data.length === 0) {
            this.data[dataId - 1].status = 'failed';
            this.dataSubject.next(this.data);
          } else {
            const index = this.data.findIndex(d => d.id === data[0].id);
            if (index !== -1) {
              console.log(1);
              this.data[dataId - 1].status = data[0].status;
              this.dataSubject.next(this.data);
            } else {
              this.data[dataId - 1].status = 'failed';
              this.dataSubject.next(this.data);
            }
          }
        },
        error => {
          console.log(2);
          const index = this.data.findIndex(d => d.id === dataId);
          if (index !== -1) {
            this.data[dataId - 1].status = 'failed';
            this.dataSubject.next(this.data);
          }
        }
      );
  }

  sleep(msec) {
    return new Promise((resolve) => {

      setTimeout(() => resolve(), msec);

    });
  }

}
