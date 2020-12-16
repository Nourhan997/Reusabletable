import { Component, OnInit } from '@angular/core';
import { Order } from "./order";
import { TableColumn } from "../table/TableColumn";
import { CurrencyPipe, DecimalPipe, PercentPipe } from "@angular/common";
import { Sort } from "@angular/material/sort";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "https://jsonplaceholder.typicode.com/users";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})

export class OrdersComponent implements OnInit {
  orders: Object[] = [];
  ordersTableColumns: TableColumn[];
  content: [];
  //order: { name: any; username: any; phone: any; Website: any; }[];


  constructor(private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe,
    private http: HttpClient) {
  }

  getusersById(): Observable<any> {
    return this.http.get(AUTH_API, { responseType: "json" });
  }

  ngOnInit(): void {
    this.getusersById().subscribe(
      data => {
        this.content = data;
        console.log(this.content);
        this.getOrders();
        this.initializeColumns();
      }
    );
  }

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'Name',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'username',
        dataKey: 'username',
        position: 'right',
        isSortable: false
      },
      {
        name: 'Phone',
        dataKey: 'phone',
        position: 'right',
        isSortable: true
      },
      {
        name: 'Website',
        dataKey: 'Website',
        position: 'right',
        isSortable: false
      },
    ];
  }



  getOrders() {
    this.content.forEach((element: any) => {
      this.orders.push({
        id: element.id,
        name: element.name,
        username: element.username,
        phone: element.phone,
        Website: element.website
      });
    })
  }












  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.orders = this.orders.sort((a: Order, b: Order) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.orders = this.orders.sort((a: Order, b: Order) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.orders
    }
  }

  removeOrder(order: Order) {
  //  this.orders = this.orders.filter(item => item.id !== order.id)
  }
}



