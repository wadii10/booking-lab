import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RippleModule,
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss',
})
export class HeaderAdminComponent implements OnInit {
  profileMenuItems: MenuItem[] | undefined;
  mainMenuItems: MenuItem[] | undefined;

  constructor(private router:Router) {}

  ngOnInit() {
    this.mainMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['admin'])
      },
      {
        label: 'State',
        icon: 'pi pi-star',
        command: () => this.router.navigate(['admin/state'])
      },
      {
        label: 'Activity',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['admin/activity'])
        //badge: '3',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3',
              },
            ],
          },
        ],
      },
    ];

    this.profileMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
          },
          {
            label: 'Billing',
            icon: 'pi pi-fw pi-file',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-sign-out',
      },
    ];
  }
}
