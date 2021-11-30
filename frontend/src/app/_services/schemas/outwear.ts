export const OutwearSchema = [
  {
    type: 'INPUT',
    id: 'productTitle',
    inputType: 'text',
    label: 'Введите название',
    name: 'INPUT',
  },
  {
    type: 'INPUT',
    id: 'productPrice',
    inputType: 'number',
    label: 'Цена',
    name: 'INPUT',
  },
  {
    type: 'INPUT',
    id: 'productCount',
    inputType: 'number',
    label: 'Колличество',
    name: 'INPUT',
  },
  {
    type: 'SELECT',
    id: 'type_outwear',
    label: 'Тип',
    options: [
      {
        label: 'Пуховики',
        value: 'Down_jacket',
      },
      {
        label: 'Шубы',
        value: 'Fur_coats',
      },
      {
        label: 'Дубленки',
        value: 'Sheepskin_coats',
      },
      {
        label: 'Пальто',
        value: 'Coat',
      },
      {
        label: 'Парки',
        value: 'Parks',
      },
      {
        label: 'Куртки',
        value: 'Jackets',
      },
      {
        label: 'Косухи',
        value: 'Leather jackets',
      },
      {
        label: 'Бомберы',
        value: 'Bombers',
      },
      {
        label: 'Ветровки',
        value: 'Windbreaker',
      },
      {
        label: 'Горнолыжные куртки',
        value: 'Ski_jackets',
      },
    ],
    value: null,
  },
  {
    type: 'SELECT',
    id: 'size',
    options: [
      {
        label: '46 (S)',
        value: '46 (S)',
      },
      {
        label: '48 (M)',
        value: '48 (M)',
      },
      {
        label: '50 (L)',
        value: '50 (L)',
      },
      {
        label: '52 (L/XL)',
        value: '52 (L/XL)',
      },
      {
        label: '54 (XL)',
        value: '54 (XL)',
      },
      {
        label: '56 (XXL)',
        value: '56 (XXL)',
      },
    ],
  },
  {
    type: 'SELECT',
    id: 'season',
    label: 'Сезон',
    options: [
      {
        label: 'Демисезон',
        value: 'i_did',
      },
      {
        label: 'Зима',
        value: 'i_did',
      },
      {
        label: 'Лето',
        value: 'i_did',
      },
    ],
  },
  {
    type: 'SELECT',
    id: 'who_did',
    options: [
      {
        label: 'Я сделал',
        value: 'i_did',
      },
      {
        label: 'Член моей компании',
        value: 'member_of_my_company',
      },
      {
        label: 'Другая компания',
        value: 'other_company',
      },
    ],
    value: 'Я сделал',
  },
  {
    type: 'INPUT',
    id: 'description',
    name: 'EDITOR',
  },
  {
    type: 'INPUT',
    label: 'Добавьте подходящие теги',
    id: 'productTag',
    name: 'TAGS',
    modelType: 'TAG',
  },
  {
    type: 'INPUT',
    label: 'Добавьте материалы',
    id: 'materials',
    name: 'TAGS',
    modelType: 'TAG',
  },
  {
    type: 'SELECT',
    label: 'Состояние',
    id: 'condition',
    options: [
      {
        label: 'Новое',
        value: 'New',
      },
      {
        label: 'Б/y',
        value: 'second thing',
      },
    ],
    value: 'Новое',
  },
];
