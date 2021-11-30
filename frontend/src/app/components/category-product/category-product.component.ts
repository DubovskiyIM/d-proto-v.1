import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuCloseReason } from '@angular/material/menu/menu';

interface ICategoryProductForCreate {
  title: string;
  icon?: string;
  value?: string;
  subCategory?: ICategoryProductForCreate[];
}

@Component({
  selector: 'app-category-create-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss'],
})
export class CategoryProductComponent implements OnInit {
  public categoryForAddProduct: ICategoryProductForCreate[] = [
    {
      title: 'Женская Одежда',
      icon: '',
      subCategory: [
        {
          title: 'Верхняя одежда',
          value: 'outerwear',
          subCategory: [
            {
              title: 'Куртка',
              value: 'type_a',
            },
            {
              title: 'Пальто',
            },
            {
              title: 'Пуховик',
            },
            {
              title: 'Плащ',
            },
            {
              title: 'Дождевик',
            },
            {
              title: 'Куртка',
            },
          ],
        },
        {
          title: 'Головные уборы',
        },
        {
          title: 'Одежда для дома',
        },
        {
          title: 'Рубашки и Блузы',
          value: 'shirt',
        },
        {
          title: 'Купальники',
        },
        {
          title: 'Платье',
        },
        {
          title: 'Юбки и шорты',
        },
        {
          title: 'Толстовка и свитер',
        },
        {
          title: 'Спортиваня одежда',
        },
        {
          title: 'Футболки топ',
        },
      ],
    },
    {
      title: 'Мужская Одежда',
      icon: '',
    },
    {
      title: 'Аксессуары',
      subCategory: [
        {
          title: 'Аксессуары для волос',
        },
        {
          title: 'Шапки и кепки',
        },
        {
          title: 'Солнцезащитные очки',
        },
        {
          title: 'Шарфы и накидки',
        },
        {
          title: 'Ремни и Подтяжки',
        },
        {
          title: 'Брелки и шнурки',
        },
        {
          title: 'Перчатки и варежки',
        },
        {
          title: 'Зонты и аксессуары от дождя',
        },
      ],
    },
    {
      title: 'Украшения',
      subCategory: [
        {
          title: 'Украшения на шею',
          subCategory: [
            {
              title: 'Кулоны',
            },
            {
              title: 'Чокеры',
            },
            {
              title: 'Ожерелья',
            },
            {
              title: 'Цепочки',
            },
          ],
        },
        {
          title: 'Кольца',
        },
        {
          title: 'Серьги',
        },
        {
          title: 'Браслеты',
        },
        {
          title: 'Украшения для тела',
        },
      ],
    },
    {
      title: 'Обувь',
      icon: '',
    },
    {
      title: 'Предметы интерьера',
    },
    {
      title: 'Красота и здоровье',
    },
    {
      title: 'Детские товары',
      subCategory: [
        {
          title: 'Конструкторы',
          subCategory: [{
            title: 'Супер-LEGO',
            subCategory: [{
              title: 'Mega-LEGO',
            }]}],
        },
        {
          title: 'Игрушки',
        },
        {
          title: 'Коляски',
        },
      ],
    },
  ];

  @Output() selectedCategory = new EventEmitter<ICategoryProductForCreate>();

  constructor() {}

  ngOnInit(): void {}

  public selectProductCategory(reason: ICategoryProductForCreate): void {
    // console.log(reason);
    this.selectedCategory.emit(reason);
  }
}
