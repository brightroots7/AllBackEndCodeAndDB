import { Component  } from '@angular/core';
import { NbSidebarService , NbMenuItem , NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showAide - Admin';

  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: { icon: 'home-outline', pack: 'eva' },
      link: 'dashboard'
    },
    {
      title: 'All Users',
      icon: { icon: 'people-outline', pack: 'eva' },
      link : 'users'
    },
    {
      title: 'All Movies',
      icon: { icon: 'video-outline', pack: 'eva' },
      link : 'movies'
    },
    {
      title : 'Import Movies',
      icon : { icon: 'plus-outline', pack: 'eva' } ,
      link : 'import'
    },
    {
      title : 'Profile',
      icon : { icon: 'compass-outline', pack: 'eva' } ,
      link : 'profile'
    },
    {
      title : 'Log Out',
      icon: { icon: 'power-outline', pack: 'eva' },

    }
  ];

  constructor(private menuService : NbMenuService , private sidebarService: NbSidebarService , private router : Router) {

    menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log Out') {
        // console.log('logout clicked');
        this.logout();
      }
      });

  }



  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  verifyToken() {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login')
  }


}
