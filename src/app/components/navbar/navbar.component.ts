import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public brand: string;
  public home: string;
  public about: string;
  public contact: string;
  constructor() { 
    this.brand = 'CodeDate';
    this.home = 'Home';
    this.about = 'About';
    this.contact = 'Contact';
  }

  ngOnInit() {
    // Functions to manipulate navbar color-scheme depending on its position relative to the viewport
    $(window).scroll(function() {
      if($(document).scrollTop() > 400) {
        $('.navbar').removeClass('navbar-dark bg-transparent').addClass('navbar-light bg-light');
      }
      else {
      $('.navbar').removeClass('navbar-light bg-light').addClass('navbar-dark bg-transparent');
      }
    });

    $('.navbar-toggler:eq(0)').on('click', ()=>{
      if($(document).scrollTop() < 400) {
      $('.navbar').toggleClass('navbar-dark bg-transparent navbar-light bg-light')
      }
    })
  }

}
