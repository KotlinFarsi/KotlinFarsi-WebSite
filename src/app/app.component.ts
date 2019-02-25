import {
  Component,
  ElementRef,
  HostListener,
  Inject, OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {NgxMdComponent} from "../../libs/ngx-md/src/lib/ngx-md.component";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'KotlinFarsi-WebSite';
  @ViewChild('element') element: ElementRef<NgxMdComponent>;
  public markdownContent: string;

  constructor(
    @Inject(PLATFORM_ID) public platformId: string,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.http.get('assets/test3.md', {responseType: 'text'})
      .subscribe(data => this.markdownContent = data);
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    console.log(e.path[0].valueOf().toString().substring(e.path[0].valueOf().toString().indexOf("assets") - 1));

    this.http.get(e.path[0].valueOf().toString().substring(e.path[0].valueOf().toString().indexOf("assets") - 1)
      , {responseType: 'text'})
      .subscribe(data => this.markdownContent = data);

    return false;
  }
}
