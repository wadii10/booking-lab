import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-header-owner',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RippleModule,
  ],
  templateUrl: './header-owner.component.html',
  styleUrl: './header-owner.component.scss'
})
export class HeaderOwnerComponent {

  profileMenuItems: MenuItem[] | undefined;
  mainMenuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.mainMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Stadium',
        icon: 'pi pi-star',
        items: [
          {
            label: 'Add Stadium',
            icon: 'pi pi-bolt',
          },
          {
            label: 'List Stadium',
            icon: 'pi pi-bolt',
          },
        ]
      },
      {
        label: 'Reservation',
        icon: 'pi pi-envelope',
        badge: '3',
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
