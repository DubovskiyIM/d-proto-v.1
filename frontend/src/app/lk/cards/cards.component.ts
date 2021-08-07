import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() listCards = [];
  @Input() isHomePage = true;
  updateMasonryLayout = false;
  masonryItems = [
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obcaecati praesentium recusandae rem sed? Amet architecto beatae distinctio error laboriosam nam nostrum ratione sint. Deserunt, rem',
    },
    { title: 'item 2' },
    { title: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cumque eum molestiae obc' },
  ];

  constructor() {}

  ngOnInit(): void {}

  updateGrid() {
    console.log('jnkl');
    this.updateMasonryLayout = !this.updateMasonryLayout;
  }

}
