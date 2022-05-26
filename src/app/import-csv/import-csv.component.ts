import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css']
})

export class ImportCsvComponent implements OnInit {

  uploadProgress
  filename
  selectedFile
  toastText : string

  spinHide : boolean = true;
  color

  constructor(private api : ApiService, private fb :  FormBuilder, private http: HttpClient) {

  }

  ngOnInit(): void {
  }

   onFileSelected(event) {
        this.selectedFile=<File>event.target.files[0]
        this.filename = event.target.files[0].name;
     }

   upload(event) {

      this.selectedFile = <File>event.target.files[0]
      this.filename = event.target.files[0].name;
      const fd  =new FormData();
      fd.append('image',this.selectedFile, this.selectedFile.name);
      this.http.post("http://44.196.172.114:3008/api/v1/upload",fd,{
       reportProgress: true,
       observe: 'events'
       }).subscribe((event: any) => {

          this.spinHide = false
          this.toastText = "Uploading Start ..";
          this.color = "#fdcccc"

          if (event.type === HttpEventType.UploadProgress)
          {
            this.uploadProgress= Math.round(event.loaded/event.total*100);
          }
          else if (event.type === HttpEventType.Response) {

            if (event.status == 200) {
              this.toastText = "Uploading finish ..";
              this.color = "#fdcccc";

              setTimeout( () => {
                this.spinHide = true
              }, 5000);
              this.filename = event.body.data.image[0].path;
            }



          }

        })
    }

  updateImg() {

      console.log(this.filename);

      if (this.filename != undefined) {
            console.log(` if block `);

            this.api.importCsv(this.filename).subscribe(data=>{
              console.log('csv Updated')
            })


      } else {

          this.spinHide = false
          this.toastText = "File is not uploaded yet ..";
          this.color = "#fdcccc"

          setTimeout(()=>{
            this.spinHide = true
          }, 5000);
      }
    }


}
