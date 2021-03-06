import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  repositories: any[] = [];
  isLoading: boolean = true;
  private currentPage: number = 1;
  private repositoriesCreationDate: string = '';

  constructor(private title: Title, private httpClient: HttpClient, private datePipe: DatePipe) {
    // Set title
    this.title.setTitle('Latest Github Repositories');
    // Set repositories creation date
    const date = new Date(new Date().setDate(new Date().getDate() - 30));
    this.repositoriesCreationDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.loadRepositories();
  }

  onScroll() {
    if (!this.isLoading) {
      this.loadRepositories();
    }
  }

  private loadRepositories() {
    this.isLoading = true;
    this.getRepositories(
      this.repositoriesCreationDate,
      this.currentPage,
      (repositories) => {
        this.repositories = this.repositories.concat(repositories.items);
        console.log(this.repositories);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
      });
  }

  private getRepositories(date: string, page: number = 1, successCallback: (repositories) => void, errorCallback: (error) => void, completeCallback: () => void) {
    const requestUrl = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`;
    return this.httpClient.get(requestUrl).pipe(
      tap(() => {
        console.log(requestUrl);
      })
    ).subscribe((repositories: any[]) => {
      this.currentPage++;
      successCallback(repositories);
    }, (error) => {
      errorCallback(error);
    }, () => {
      completeCallback();
    });
  }

  // stolen from: https://stackoverflow.com/a/3224854
  dateInterval(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(date.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
