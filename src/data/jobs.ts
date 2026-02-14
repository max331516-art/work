export interface Job {
  company: string;
  salary: string;
  period: 'perDay' | 'perMonth';
  tags: string[];
  badge: string;
  badgeClass: 'top' | 'urgent' | 'new';
  description: string;
  requirements: { documents: boolean; minAge: number; citizenship?: string };
  link: string;
  /** Резервная ссылка для A/B или запасного партнёра */
  fallbackLink?: string;
  icon: string;
}

export const jobsByCategory: Record<string, Record<string, Job[]>> = {
  delivery: {
    moscow: [
      {
        company: "Яндекс.Еда", salary: "6000₽", period: "perDay",
        tags: ["Ежедневная оплата", "Свой график"], badge: "ТОП", badgeClass: "top",
        description: "**График:** свободный, от 4 часов в день\n**Условия:** ежедневные выплаты, бонусы за рейтинг\n**Требования:** патент или самозанятость",
        requirements: { documents: true, minAge: 18 },
        link: "https://ya.ru/jobs/courier?ref=YOUR_REF",
        fallbackLink: "https://samokat.ru/jobs?ref=YOUR_REF",
        icon: "🚀"
      },
      {
        company: "Самокат", salary: "5800₽", period: "perDay",
        tags: ["Велокурьер", "Пеший"], badge: "СРОЧНО", badgeClass: "urgent",
        description: "**График:** 2/2, 3/3 — от 6 часов\n**Условия:** оплата 2 раза в неделю, развозка до склада\n**Требования:** гражданство РФ или патент",
        requirements: { documents: true, minAge: 18 },
        link: "https://samokat.ru/jobs?ref=YOUR_REF",
        icon: "🛴"
      },
      {
        company: "Delivery Club", salary: "5500₽", period: "perDay",
        tags: ["Без опыта", "Обучение"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** гибкий, от 4 часов\n**Условия:** обучение за счёт компании, форма бесплатно\n**Требования:** самозанятость или патент",
        requirements: { documents: true, minAge: 18 },
        link: "https://deliveryclub.ru/careers?ref=YOUR_REF",
        icon: "📦"
      },
      {
        company: "СберМаркет", salary: "5200₽", period: "perDay",
        tags: ["Пеший курьер", "Рядом с домом"], badge: "НОВОЕ", badgeClass: "new",
        description: "**График:** выбираешь сам, от 3 часов\n**Условия:** работа в своём районе, термосумка в подарок\n**Требования:** патент или гражданство РФ",
        requirements: { documents: true, minAge: 18 },
        link: "https://sbermarket.ru/jobs?ref=YOUR_REF",
        icon: "🛒"
      }
    ],
    spb: [
      {
        company: "Яндекс.Еда", salary: "5500₽", period: "perDay",
        tags: ["Ежедневная оплата"], badge: "ТОП", badgeClass: "top",
        description: "**График:** свободный\n**Условия:** ежедневные выплаты",
        requirements: { documents: true, minAge: 18 },
        link: "https://ya.ru/jobs/courier?ref=YOUR_REF",
        icon: "🚀"
      },
      {
        company: "Самокат", salary: "5300₽", period: "perDay",
        tags: ["Велокурьер"], badge: "СРОЧНО", badgeClass: "urgent",
        description: "**График:** 2/2, 3/3\n**Условия:** оплата 2 раза в неделю",
        requirements: { documents: true, minAge: 18 },
        link: "https://samokat.ru/jobs?ref=YOUR_REF",
        icon: "🛴"
      }
    ],
    other: [
      {
        company: "Delivery Club", salary: "4500₽", period: "perDay",
        tags: ["Без опыта"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** гибкий\n**Условия:** обучение бесплатно",
        requirements: { documents: true, minAge: 18 },
        link: "https://deliveryclub.ru/careers?ref=YOUR_REF",
        icon: "📦"
      }
    ]
  },
  warehouse: {
    moscow: [
      {
        company: "Ozon", salary: "7500₽", period: "perDay",
        tags: ["Жильё", "Питание"], badge: "ТОП", badgeClass: "top",
        description: "**График:** сменный 2/2, 3/3 — 8:00-20:00\n**Условия:** общежитие бесплатно, 3-разовое питание, развозка\n**Требования:** гражданство РФ или патент, медкнижка",
        requirements: { documents: true, minAge: 18 },
        link: "https://job.ozon.ru/warehouse?ref=YOUR_REF",
        icon: "📦"
      },
      {
        company: "Wildberries", salary: "7000₽", period: "perDay",
        tags: ["Развозка", "Питание"], badge: "СРОЧНО", badgeClass: "urgent",
        description: "**График:** 5/2 — 8:00-17:00 или сменный 2/2\n**Условия:** питание, корпоративная развозка, премии\n**Требования:** патент обязательно",
        requirements: { documents: true, minAge: 18 },
        link: "https://www.wildberries.ru/services/trudoustroystvo?ref=YOUR_REF",
        icon: "🏬"
      },
      {
        company: "Леруа Мерлен", salary: "6800₽", period: "perDay",
        tags: ["Без опыта", "Соцпакет"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** 5/2 — 9:00-18:00\n**Условия:** официальное трудоустройство, ДМС, скидки на товары\n**Требования:** патент или гражданство РФ",
        requirements: { documents: true, minAge: 18 },
        link: "https://leroymerlin.ru/jobs?ref=YOUR_REF",
        icon: "🔧"
      },
      {
        company: "Магнит", salary: "6500₽", period: "perDay",
        tags: ["Рядом с домом", "Стабильно"], badge: "НОВОЕ", badgeClass: "new",
        description: "**График:** сменный 2/2, 3/3\n**Условия:** работа в своём районе, карьерный рост\n**Требования:** патент",
        requirements: { documents: true, minAge: 18 },
        link: "https://magnit.ru/jobs?ref=YOUR_REF",
        icon: "🏪"
      }
    ],
    other: [
      {
        company: "Ozon", salary: "6500₽", period: "perDay",
        tags: ["Жильё"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** сменный\n**Условия:** общежитие, питание",
        requirements: { documents: true, minAge: 18 },
        link: "https://job.ozon.ru/warehouse?ref=YOUR_REF",
        icon: "📦"
      }
    ]
  },
  remote: {
    all: [
      {
        company: "Тинькофф", salary: "85 000₽", period: "perMonth",
        tags: ["Из дома", "Обучение"], badge: "ТОП", badgeClass: "top",
        description: "**График:** 5/2 — 8:00-17:00 или 9:00-18:00\n**Условия:** бесплатное обучение 2 недели, оплачиваемое, ДМС, премии\n**Требования:** гражданство РФ, компьютер, интернет",
        requirements: { documents: true, minAge: 18, citizenship: 'RU' },
        link: "https://www.tinkoff.ru/career/vacancies/call-center/?ref=YOUR_REF",
        icon: "💛"
      },
      {
        company: "Сбербанк", salary: "75 000₽", period: "perMonth",
        tags: ["Гибкий график", "Соцпакет"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** 5/2 или 2/2 — на выбор\n**Условия:** корпоративный ноутбук, ДМС, обучение за счёт банка\n**Требования:** гражданство РФ",
        requirements: { documents: true, minAge: 21, citizenship: 'RU' },
        link: "https://rabota.sber.ru/search?ref=YOUR_REF",
        icon: "💚"
      },
      {
        company: "VK", salary: "90 000₽", period: "perMonth",
        tags: ["Модератор", "Удалённо"], badge: "НОВОЕ", badgeClass: "new",
        description: "**График:** гибкий, от 6 часов в день\n**Условия:** полностью удалённо, премии, корпоративное обучение\n**Требования:** гражданство РФ, знание русского языка",
        requirements: { documents: true, minAge: 18, citizenship: 'RU' },
        link: "https://team.vk.company/vacancy/?ref=YOUR_REF",
        icon: "💙"
      },
      {
        company: "Альфа-Банк", salary: "70 000₽", period: "perMonth",
        tags: ["Консультант", "Обучение"], badge: "СРОЧНО", badgeClass: "urgent",
        description: "**График:** 5/2 — 10:00-19:00\n**Условия:** оплачиваемое обучение, ДМС через 3 месяца, бонусы\n**Требования:** гражданство РФ",
        requirements: { documents: true, minAge: 18, citizenship: 'RU' },
        link: "https://alfabank.ru/career/?ref=YOUR_REF",
        icon: "❤️"
      }
    ]
  },
  shift: {
    all: [
      {
        company: "Газпром", salary: "280 000₽", period: "perMonth",
        tags: ["15/15", "Север"], badge: "ТОП", badgeClass: "top",
        description: "**График:** вахта 15/15 или 30/30\n**Условия:** проживание в вахтовом посёлке, 3-разовое питание, перелёт за счёт компании\n**Требования:** гражданство РФ, медосмотр",
        requirements: { documents: true, minAge: 21, citizenship: 'RU' },
        link: "https://www.gazprom.ru/careers/vacancies/?ref=YOUR_REF",
        icon: "🔥"
      },
      {
        company: "РЖД", salary: "220 000₽", period: "perMonth",
        tags: ["30/30", "Сибирь"], badge: "НАБОР", badgeClass: "new",
        description: "**График:** вахта 30/30\n**Условия:** жильё, питание, проезд, соцпакет\n**Требования:** гражданство РФ",
        requirements: { documents: true, minAge: 21, citizenship: 'RU' },
        link: "https://job.rzd.ru/?ref=YOUR_REF",
        icon: "🚂"
      },
      {
        company: "Норникель", salary: "320 000₽", period: "perMonth",
        tags: ["Вахта", "Высокая зарплата"], badge: "ТОП", badgeClass: "top",
        description: "**График:** вахта 15/15, 30/30\n**Условия:** проживание, питание, перелёт, ДМС, премии\n**Требования:** гражданство РФ, опыт приветствуется",
        requirements: { documents: true, minAge: 21, citizenship: 'RU' },
        link: "https://www.nornickel.ru/career/?ref=YOUR_REF",
        icon: "⛏️"
      }
    ]
  }
};

export const partnerProducts = {
  delivery: [
    { name: "Powerbank 20000mAh", icon: "🔋", bonus: "+500₽", link: "https://ya.market.ru/product?ref=YOUR_REF" },
    { name: "Держатель для телефона", icon: "📱", bonus: "+300₽", link: "https://ozon.ru/product?ref=YOUR_REF" },
    { name: "Термосумка", icon: "🎒", bonus: "+800₽", link: "https://wb.ru/product?ref=YOUR_REF" }
  ],
  cards: [
    { name: "Тинькофф (бонус 1000₽)", icon: "💳", bonus: "+3000₽ тебе", link: "https://www.tinkoff.ru/cards/?ref=YOUR_REF" },
    { name: "Альфа-Банк (кэшбэк 10%)", icon: "💳", bonus: "+2500₽ тебе", link: "https://alfabank.ru/cards/?ref=YOUR_REF" }
  ]
};

export const documentHelp = [
  { name: "Оформить патент онлайн", icon: "📄", price: "от 5000₽", link: "https://patent-rf.ru/?ref=YOUR_REF" },
  { name: "Регистрация самозанятости", icon: "✅", price: "Бесплатно", link: "https://npd.nalog.ru/?ref=YOUR_REF" },
  { name: "Юридическая консультация", icon: "⚖️", price: "от 1500₽", link: "https://legal-help.ru/?ref=YOUR_REF" }
];
