import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
// const orders: any = require('./data.json')
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import {
  NzPlacementType,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown'
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  constructor(private modalService: NgbModal, private nzContextMenuService: NzContextMenuService, private Auth: AuthService) { }
  isvisible: boolean;
  orders:any
  sortfield: any;
  x: number;
  y: number;
  visible = false;
  checked: Boolean = true
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  // listOfData = orders
  // listOfDisplayData = [...this.listOfData]
  mapOfSort: { [key: string]: any } = {
    id: null,
    date: null,
    customer: null,
    total: null,
    tax: null,
    shipping: null,
    quantity: null,
    status: null,
  }
  sortName: string | null = null
  sortValue: string | null = null
  listOfPosition: NzPlacementType[] = [
    'bottomLeft'
  ]
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu)
  }

  closeMenu(): void {
    this.nzContextMenuService.close()
  }
  ngOnInit() { 
    this.getorders()
  }
  open(): void {
    this.visible = true
  }

  close(): void {
    this.visible = false
  }
  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
  }


  getorders() {
    this.Auth.getOrders().subscribe(data => {
      this.orders = data
      console.log(this.orders)

    })
  }

  sortsettings(field) {
    if (this.sortfield == field) {
      this.x = this.x * -1;
      this.y = this.y * -1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  get sortData() {
    if (this.orders) {
      return this.orders.sort((a, b) => {
        if (a[this.sortfield] < b[this.sortfield]) return this.x;
        else if (a[this.sortfield] > b[this.sortfield]) return this.y;
        else return 0;
      });
    } else {
      return []
    }
  }

}


