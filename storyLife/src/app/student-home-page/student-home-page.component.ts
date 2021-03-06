import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { User } from '../users/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  constructor(public router: Router,public db: DatabaseService,
    private cookieService: CookieService, private _firebaseAuth:AngularFireAuth) { }

  ngOnInit() {
    if(<User>this.cookieService.getObject('user')!=undefined)
    {
         this.db.loggedInUser = <User>this.cookieService.getObject('user');
         if(this.db.loggedInUser.type==='הורה' || this.db.loggedInUser.type==='מורה')
             this.router.navigate(['/'])

    }
   else
       this.router.navigate(['/'])

  }
  GoToAmI()
  {
      this.router.navigate(['am-i']);
    
    
  }
  GoToSchedule()
  {
    this.router.navigate(['viewSchedule']);

  }
  logout() 
  {

    this.cookieService.putObject('user',undefined);

    this._firebaseAuth.auth.signOut()
    

    .then((res) => {  

      alert("יצא"+this.db.loggedInUser.email)
    this.db.loggedInUser.loggedIn = false;
    this.db.updateListing(this.db.loggedInUser.uid);
    this.db.loggedIn = 'false';
     this.router.navigate(['/'])
     


  })
    .catch((err) =>{
    console.log(err + "")
   // this.db.loggedInUser.loggedIn = true;
    // this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }
}
