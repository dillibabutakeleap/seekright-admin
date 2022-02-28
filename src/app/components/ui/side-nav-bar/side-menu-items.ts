import {MenuItem} from "./side-menu-bar/side-bar-menu-model";

export const sideMenu: MenuItem[] = [
  {
    title: 'Home',
    type: "group",
  }, {
    title: 'Dashboard',
    type: "basic",
    icon: `heroicons_outline:home`,
    link: '/'
  }, {
    title: "",
    type: "divider"
  },
  {
    title: 'User Management',
    type: "group",
  },
  {
    title: 'All Users',
    type: 'basic',
    icon: 'heroicons_outline:users',
    link:'/users'
  },
  
];
