import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  profile: any;
  username: string;
  repos: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 30, 50, 70, 100];
  searchParam: URLSearchParams;
  loadingrepo: boolean = false;
  loadingprofile: boolean = false;

  constructor(private apiService: ApiService) {
    this.searchParam = new URLSearchParams();
    this.tableSize = this.tableSizes[0]; // Set a default table size
    this.searchParam.set("per_page", this.tableSize.toString());
    this.searchParam.set("page", this.page.toString());
    this.username = "Rohit1170";
  }

  ngOnInit() {
    this.setprofile();
    this.setRepos();
  }

  handleSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
    let search_input = (event.target as HTMLInputElement);
    this.username = search_input.value;

    this.setprofile();
    this.setRepos();
    }
  }

  setprofile() {
    this.apiService.getUser(this.username).subscribe(
      (res: Object) => {
        this.profile = res;

        // total number of public repos of user
        this.count = this.profile['public_repos'];

        // handling loading 
        this.loadingprofile = false;

        if (!this.profile.name) {
          this.profile.name = "Name is not available :)";
        }

      },
      (error) => {
        console.error("Error fetching user profile:", error);
        this.loadingprofile = true;
      }
    );
  }

  setRepos() {
    this.apiService.getRepos(this.username, this.searchParam).subscribe(
      (res: Object) => {
        this.repos = res;

        // handling loading 
        this.loadingrepo = false;

        //handling null values
        for (let repo of this.repos) {
          for (let field in repo) {
            if (!repo[field]) {
              repo[field] = field + " is not available :)";
            }
          }
        }
      },
      (error) => {
        console.error("Error fetching repositories:", error);
        this.loadingrepo = true;
      }
    );
  }



  onTableDataChange(event: any) {
    this.page = event;
    this.searchParam.set("page", this.page.toString());
    this.setRepos();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.searchParam.set("per_page", this.tableSize.toString());
    this.setRepos();
  }
}
