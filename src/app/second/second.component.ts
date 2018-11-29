import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  token:any;
  tokenid:any;
  tokenname:any;
  name:any;age:any;mobileno:any;address:any;state:any;
  userdetails:any;
  constructor(private httpclient:HttpClient, private router:Router) { }

  ngOnInit() {
   this.token = JSON.parse(localStorage.getItem('token'));
   this.tokenid = this.token.id;
   this.tokenname = this.token.email;
   if(this.token == undefined  || null || ''){
    this.router.navigateByUrl('login')
    }
    this.profile();
    
  }


  profile(){
    this.httpclient.get('http://localhost:3000/api/userauths/'+ this.tokenid+'/userdetails').subscribe(res=>{
      this.userdetails=res;
      console.log(this.userdetails);
    })
  }

    detailp(){
        var params = {
          'name':this.name,
          'age' : this.age,
          'mobileno':this.mobileno,
          'address' : this.address,
          'state':this.state,
          'userauthId':this.tokenid
        }
        this.httpclient.post('http://localhost:3000/api/userdetails/upt',params).subscribe(res=>{
          console.log(res);
          alert("updated");
          this.router.navigateByUrl('profile');
        })
    }
    logout(){
      localStorage.clear();
      this.router.navigateByUrl('login');
    }
}
