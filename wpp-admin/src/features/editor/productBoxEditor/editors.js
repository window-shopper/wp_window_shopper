import React from 'react';
import { TitleEditor } from './TitleEditor';
import { DescriptionEditor } from './DescriptionEditor';
import { ImageEditor } from './ImageEditor';
import { CaptionEditor } from './CaptionEditor';
import { Cta1Editor, Cta2Editor } from './CtaEditor';
import { ItemEditor } from './ItemEditor';
import { BadgeEditor } from './BadgeEditor';

export default [
  { name: 'Title', component: <TitleEditor />, selector: 'hasTitle' },
  { name: 'Link', component: <ItemEditor />, selector: 'hasItem' },
  { name: 'Badge', component: <BadgeEditor />, selector: 'hasBadge' },
  { name: 'Image', component: <ImageEditor />, selector: 'hasImage' },
  { name: 'Caption', component: <CaptionEditor />, selector: 'hasCaption' },
  { name: 'Description', component: <DescriptionEditor />, selector: 'hasDescription' },
  { name: 'Call To Action', component: <Cta1Editor />, selector: 'hasCta1' },
  { name: 'Call To Action', component: <Cta2Editor />, selector: 'hasCta2' },
];
