import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator , PageEvent } from '@angular/material/paginator';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

          
      hiringList :number
      myFlagForSlideToggle;


      @ViewChild(MatPaginator, {static: true}) set matPaginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
      }

      @ViewChild(MatSort , {static: true}) sort: MatSort

      displayedColumns: string[] = ['name', 'image','email'];
      dataSource = new MatTableDataSource([]);

      constructor( private api:ApiService , public dialog: MatDialog) { }

      ngOnInit(): void {
        this.getUserListing('0','10','0');
      }


      getUserListing(offset, limit,currentPage) {
        this.api.getUser(offset, limit,currentPage).subscribe(
          data => {
            this.dataSource.data = data.data.docs
            this.dataSource.sort = this.sort
            this.hiringList = data.data.totalDocs
          }
        )
      }

      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }


      getNextData(offset, limit,currentPage) {
        this.api.getUser(offset, limit,currentPage).subscribe(
        data => {
          this.dataSource.data = data.data.docs;
          this.dataSource.sort = this.sort;
          this.dataSource._updateChangeSubscription();
          this.hiringList = data.data.totalDocs // data.data.docs.length;
        })
      }

      pageChanged(event){
        let pageIndex = event.pageIndex;
        let pageSize = event.pageSize;
        let previousIndex = event.previousPageIndex;
        let previousSize = pageSize * pageIndex;
         this.getNextData((pageIndex).toString(), pageSize.toString(),previousSize);
      }


}
