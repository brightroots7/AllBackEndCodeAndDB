import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator , PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

      hiringList :number
      myFlagForSlideToggle;


      @ViewChild(MatPaginator, {static: true}) set matPaginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
      }

      @ViewChild(MatSort , {static: true}) sort: MatSort

      displayedColumns: string[] = ['title', 'directors','authors','content_rating','critics_consensus'];
      dataSource = new MatTableDataSource([]);

      constructor( private api:ApiService , public dialog: MatDialog) { }

      ngOnInit(): void {
        this.getMoviesListing('0','10','0');
      }


      getMoviesListing(offset, limit,currentPage) {
        this.api.getMovies(offset, limit,currentPage).subscribe(
          data => {

            this.dataSource.data = data.data.docs
            this.dataSource.sort = this.sort
            this.hiringList = data.data.totalDocs
            // console.log(data.data.totalPages);
          }
        )
      }

      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }




      getNextData(offset, limit,currentPage) {

        this.api.getMovies(offset, limit,currentPage).subscribe(
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
