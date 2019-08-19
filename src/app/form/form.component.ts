import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import{HttpservicesService} from '../httpservices.service';
import{Subscription} from 'rxjs';
import{ActivatedRoute,Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
subscription:Subscription;
cookievalue:any = 'unknown';

listingarray:any =[];

tablename:any ='mycollection';
listingarray_skip:any = ["editid","_id"];
listingarray_modify_header:any ={'name':'Name'};
jwttoken:any = 'aassssa';
apiurl:any = 'http://192.169.196.208:7067/';
deletesingledata:any = 'deletesingledata';
statusarray:any = [{val:0, name:'Inactive'},{val:1, name:'Active'}];
editroute1="/form";
updateurl:any = 'addorupdatedata';


params_id:any;
ff:FormGroup;
  constructor(private build:FormBuilder,private activated:ActivatedRoute,
    private http:HttpservicesService,public router:Router, private cookie:CookieService) {
    this.ff = this.build.group({
      editid:[''],
      name:[],
      email:[]
    });

    this.subscription = this.http.getObj().subscribe((res)=>{
      let result = res;
      if(result !=null){
        this.listingarray = result;
        this.getdata();
      }else{
        result = null;
      }
    });

// get Edit Id.....................................

    this.activated.paramMap.subscribe(params => {
      this.params_id = params.get('_id');
   });
 }
public idval:any;
  ngOnInit() {
    this.cookie.set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NjYyOTQ3ODIsImlhdCI6MTU2NjIwODM4Mn0.UQ3McDNv_3AuNAfV-h4mafSIAA1FlzlqlrBMmB4RheY');
    this.cookievalue = this.cookie.get('token');
//********************************************************************** */

    this.getdata();
    if(this.params_id!=null){
      
      console.log('idval+++++++++++'+this.idval);
    let data:any = {'source': 'updatesamecomponent','condition': { "_id": this.params_id}, 'token':this.cookievalue};
    this.http.postData('datalist', data).subscribe((response)=>{
      console.log('+res+++++++++++++++'+response.res);
      
      this.ff.setValue({
        'editid':response.res[0]._id,
        'name':response.res[0].name,
        'email':response.res[0].email
      })
      
    },(err)=>{
      console.log('error Msg'+err);
    });
  }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

// Submit Data ..........................................

  submitData(){
    // console.log(this.ff.value);
    let data:any ={'source':'updatesamecomponent','data':this.ff.value};
    this.http.postData('addorupdatedata', data).subscribe((res)=>{
      alert('Insert++++++++++++'+res.status);
      console.log(res);
      this.http.clearObj(res);
      setTimeout(()=>{
        this.http.setObj(res);
      },50);

      this.ff.reset();
      // console.log(res);
    });
  }

 // fetch Data.............................................

  getdata(){
    let data:any = {'source':'updatesamecomponent','token':this.cookievalue};
    this.http.postData('datalist',data).subscribe((res)=>{
      console.log(res);
      this.listingarray = res.res;
      console.log(this.listingarray);
    });
  }

// for Update Data.........................................
  updateData(){
    let data:any = {'source':'updatesamecomponent', 
    "data": { 
        "id": this.ff.value.editid,
        "name": this.ff.value.name, 
        "email":this.ff.value.email
      }
  };
  this.http.postData('addorupdatedata',data).subscribe((res)=>{
    console.log(res);
    alert(''+res.status);
    this.router.navigateByUrl('');
    
  });

}

}
