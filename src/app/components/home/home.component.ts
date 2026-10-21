import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AvatarModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  router = inject(Router)
  token = localStorage.getItem('token');

  display = false;

  ngOnInit() {
    if (this.token) {
      this.display = true;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  featuredPosts = [
    {
      title: 'The Future of Web Development',
      excerpt: 'How AI is changing the way we write code and design user interfaces in 2026.',
      author: 'John Doe',
      authorInitials: 'JD',
      date: 'Oct 12',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600'
    },
    {
      title: 'Mastering Tailwind CSS',
      excerpt: 'Beyond the basics: Learning to build complex layouts with utility classes.',
      author: 'Jane Smith',
      authorInitials: 'JS',
      date: 'Oct 10',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600'
    },
    {
      title: 'Why Typography Matters',
      excerpt: 'A deep dive into how font choice affects readability and user retention.',
      author: 'Mike Ross',
      authorInitials: 'MR',
      date: 'Oct 08',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600'
    }
  ];

}
