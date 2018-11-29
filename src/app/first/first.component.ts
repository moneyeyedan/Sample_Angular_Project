import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { endpointlocation } from '../endpoint.js';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
msg:boolean = true;
author:any[]=['manikandan','sasikumar','vijay','kogul','saravanakumar','vengedesh'];
fname:any;
fpassword:any;
token:any;
endpoint=endpointlocation.API;

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
    console.log(this.author)
    this.token=localStorage.getItem('token');
    if(this.token == undefined  || null || ''){
      this.router.navigateByUrl('login')
    }else{
      this.router.navigateByUrl('profile')
    }


  }
  getid(){
   var params={
     'email':this.fname,
    'password':this.fpassword
  }
    this.http.post(this.endpoint.concat('userauths/login'),params).subscribe(data=>{
      if(data['data'].status){
        var result={
          email:data['data'].data.email,
          id:data['data'].data.id
        }
        localStorage.setItem('token',JSON.stringify(result))
        alert('login Success')
        this.router.navigateByUrl('profile');
      }
      else{
        this.router.navigateByUrl('login');
      }
    })
  }
  

}
