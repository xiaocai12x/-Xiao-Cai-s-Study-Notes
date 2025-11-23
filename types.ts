import React from 'react';

export enum Language {
  CN = 'CN',
  EN = 'EN'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Page {
  HOME = 'home',
  NOTES = 'notes',
  PORTFOLIO = 'portfolio',
  GUESTBOOK = 'guestbook'
}

export enum SoundType {
  HOVER = 'hover',
  CLICK = 'click',
  TYPE = 'type',
  SWITCH = 'switch',
  TRANSMIT = 'transmit',
  ERROR = 'error',
  SUCCESS = 'success',
  OPEN = 'open'
}

export interface NavItem {
  id: Page;
  labelCN: string;
  labelEN: string;
  icon: React.ComponentType<any>;
}

export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}