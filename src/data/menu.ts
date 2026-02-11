export type MenuItem = {
  title: string;
  price?: string;
  details?: string;
};

export type MenuGroup = {
  title?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  label: string;
  eyebrow?: string;
  heroImage?: { src: string; alt: string };
  groups: MenuGroup[];
};

/**
 * Full menu (from `public/Cafe_Keppler_menu_mei_2025.pdf`).
 * Prices are stored as display strings to match the printed card.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "ontbijt-lunch",
    label: "Ontbijt & lunch",
    eyebrow: "Eten",
    heroImage: { src: "/bakery-photo.png", alt: "Ontbijt en lunch bij Keppler" },
    groups: [
      {
        title: "Vanaf 09:00 tot 16:00",
        items: [
          { title: "Croissant", price: "€ 3,00" },
          { title: "jam of boter", price: "+ € 0,60" },
          { title: "Yoghurt met muesli", price: "€ 6,75" },
          { title: "Omelet op brood", price: "€ 9,75" },
          { title: "met kaas", price: "+ € 0,70" },
          { title: "Uitsmijter op brood", price: "€ 9,25" },
          { title: "met kaas", price: "+ € 0,70" },
          {
            title: "Kepplers Groene Shakshuka",
            price: "€ 16,75",
            details:
              "Arabisch ontbijt met zacht gepocheerd ei, aubergine, feta, cashew en brood",
          },
        ],
      },
      {
        title: "Vanaf 11:00 tot 16:00",
        items: [
          {
            title: "Broodje kaas",
            price: "€ 7,50",
            details: "met mayo en ingelegde venkel",
          },
          {
            title: "Broodje makreelmousse",
            price: "€ 11,50",
            details: "met yoghurt-dillesaus en ingelegde komkommer",
          },
          {
            title: "Broodje bal",
            price: "€ 11,50",
            details: "met mosterd, mayo en ingelegde rode kool",
          },
          { title: "Tosti kaas", price: "€ 7,00" },
          { title: "met worst of met kimchi", price: "+ € 1,00" },
          { title: "Broodje v/d dag - zie bord", price: "v.a. € 9,50" },
          { title: "Soep v/d dag - zie bord", price: "v.a. € 8,00" },
          { title: "Salade v/d dag - zie bord", price: "v.a. € 16,00" },
        ],
      },
    ],
  },
  {
    id: "zoet",
    label: "Zoet",
    eyebrow: "Eten",
    heroImage: { src: "/intro-food.png", alt: "Zoet uit eigen bakkerij" },
    groups: [
      {
        title: "Zoet uit eigen bakkerij",
        items: [
          { title: "Arretjescake", price: "€ 2,30" },
          { title: "Haverkoek", price: "€ 3,00" },
          { title: "Kepplertje", price: "€ 4,30" },
          { title: "Carrot Cake", price: "€ 4,50" },
          { title: "Brownie", price: "€ 4,80" },
          { title: "Taart v/d dag", price: "v.a. € 4,80" },
        ],
      },
    ],
  },
  {
    id: "borrel-frituur",
    label: "Borrel & frituur",
    eyebrow: "Eten",
    heroImage: {
      src: "/Generated Image February 04, 2026 - 1_08PM.jpeg",
      alt: "Borrel op het terras",
    },
    groups: [
      {
        title: "Borrel vanaf 15:00",
        items: [
          { title: "Borrelnootjes", price: "€ 3,80" },
          { title: "Oude kaas", price: "€ 7,50" },
        ],
      },
      {
        title: "Huisgebakken zuurdesem brood met",
        items: [
          { title: "Boter of olijfolie", price: "€ 5,50" },
          { title: "Tapenade", price: "€ 8,00" },
          { title: "Humus en dukkah", price: "€ 8,50" },
          { title: "Makreelmousse", price: "€ 9,00" },
          { title: "Sobrasada", price: "€ 10,00" },
          { title: "Sardientjes uit blik", price: "€ 11,00" },
          { title: "Geitenkaas en honing", price: "€ 9,50" },
        ],
      },
      {
        title: "Plankjes",
        items: [
          {
            title: "Vleesplankje droge worst, rillette en ham",
            price: "€ 15,00",
          },
          {
            title: "Kaasplankje brie, Stolwijker en blauwschimmel",
            price: "€ 15,00",
          },
        ],
      },
      {
        title: "Frituur",
        items: [
          {
            title: "Bitterballen (6 / 12 / 18 stuks)",
            price: "€ 7,50 / 14 / 20",
            details: "oesterzwam of Van Dobben",
          },
          { title: "Kaasstengels (6 / 12 / 18 stuks)", price: "€ 7 / 13 / 19" },
          { title: "Mini-loempia's (6 / 12 / 18 stuks)", price: "€ 7 / 13 / 19" },
          { title: "Huisgemaakte friet", price: "€ 6,50" },
        ],
      },
    ],
  },
  {
    id: "diner-dessert",
    label: "Diner & dessert",
    eyebrow: "Eten",
    heroImage: { src: "/01-misset-cafe-keppler-9049.jpg", alt: "Diner bij Keppler" },
    groups: [
      {
        title: "Woensdag t/m zaterdag vanaf 17:30",
        items: [
          {
            title: "Charsjo Georgische tomaten-rundvlees soep",
            price: "€ 9,50",
          },
          { title: "Soep v/d dag", price: "v.a. € 8,50" },
          { title: "Salade v/d dag met brood", price: "v.a. € 16,00" },
          {
            title: "Kepplers Rode Shakshuka",
            price: "€ 21,50",
            details:
              "ei, gemarineerde oesterzwammen, bonen, geroosterde groene paprika, tomatensaus, dukkah, zhough en brood",
          },
          {
            title: "Kepplers Smashed Burger",
            price: "€ 21,50",
            details:
              "huisgemaakte brioche met runderburger, anjovis-tomatenboter, gembersaus, miso-uien, ingelegde komkommer, oude kaas en friet",
          },
          {
            title: "Kaasfondue met brood, witlof en groene sla",
            price: "€ 27,00",
          },
        ],
      },
      {
        title: "Dessert",
        items: [
          { title: "Brownie met vanille-ijs", price: "€ 9,50" },
          { title: "Affogato", price: "€ 7,50" },
          { title: "Dessert v/d dag", price: "v.a. € 9,00" },
        ],
      },
    ],
  },
  {
    id: "drinken",
    label: "Drinken",
    eyebrow: "Drinken",
    heroImage: {
      src: "/cafe-keppler-koffiebar-amsterdam.jpg",
      alt: "Drankjes bij Keppler",
    },
    groups: [
      {
        title: "Koffie",
        items: [
          { title: "Mok filterkoffie", price: "€ 2,90" },
          { title: "Espresso", price: "€ 3,20" },
          { title: "Americano", price: "€ 3,20" },
          { title: "Cortado", price: "€ 3,50" },
          { title: "Cappuccino", price: "€ 3,90" },
          { title: "Koffie verkeerd", price: "€ 4,10" },
          { title: "Flat white", price: "€ 4,80" },
          { title: "V60 (300 ml)", price: "€ 6,70" },
        ],
      },
      {
        title: "Thee (glas / potje)",
        items: [
          { title: "Verveine", price: "€ 2,90 / 5,10" },
          { title: "Earl Grey", price: "€ 2,90 / 5,10" },
          { title: "Jasmijn groen", price: "€ 2,90 / 5,10" },
          { title: "Lapsang Souchong", price: "€ 2,90 / 5,10" },
          { title: "Zwarte thee", price: "€ 2,90 / 5,10" },
          { title: "Verse munt", price: "€ 3,30 / 5,50" },
          { title: "Kepplers gemberthee", price: "€ 4,00 / 6,00" },
        ],
      },
      {
        title: "Fris",
        items: [
          { title: "Melk / karnemelk", price: "€ 2,70" },
          { title: "Chocomel", price: "€ 3,20" },
          { title: "Verse jus (klein / groot)", price: "€ 4,50 / 5,75" },
          { title: "Appelsap", price: "€ 3,50" },
          { title: "Tomatensap", price: "€ 3,50" },
          { title: "Bruiswater (klein / groot)", price: "€ 3,30 / 5,70" },
          { title: "Coca Cola", price: "€ 3,30" },
          { title: "Tonic", price: "€ 3,30" },
          { title: "Kepplers ijsthee", price: "€ 4,00" },
          { title: "Kepplers gemberbier", price: "€ 4,00" },
          { title: "Kepplers citroenlimonade", price: "€ 3,00 / 3,70" },
        ],
      },
      {
        title: "Bier — Tap",
        items: [
          { title: "Gulpener", price: "€ 3,30 / 3,80" },
          { title: "Walhalla Loki", price: "€ 6,20" },
          { title: "Walhalla Njord", price: "€ 6,20" },
          { title: "La Trappe Dubbel", price: "€ 6,00" },
          { title: "Homeland Brassers Blond", price: "€ 6,20" },
        ],
      },
      {
        title: "Bier — Fles / blik",
        items: [
          { title: "Loirette (Saison Blond)", price: "€ 5,90" },
          { title: "Karmeliet Tripel", price: "€ 6,00" },
          { title: "Duvel", price: "€ 6,00" },
          { title: "Brouwerij 't IJ - IJwit", price: "€ 6,00" },
        ],
      },
      {
        title: "Bier — Laag en non-alcohol",
        items: [
          { title: "Jopen Non-IPA", price: "€ 5,10" },
          { title: "Homeland Ketelbinkie", price: "€ 5,10" },
          { title: "Oedipus Dorinku", price: "€ 5,10" },
          { title: "Warsteiner", price: "€ 5,10" },
        ],
      },
      {
        title: "Wijn — Witte wijn (glas / halve liter / fles)",
        items: [
          {
            title: "Muscadet de Sèvre (Loire)",
            price: "€ 7 / 21 / 30",
            details: "fris, mineralig, ziltig",
          },
          {
            title: "Vermentino (Puglia)",
            price: "€ 6 / 20 / 29",
            details: "vol, rond, steenfruit",
          },
          {
            title: "Apremont (Savoie)",
            price: "€ 8 / 23 / 33",
            details: "fris, fruitig, groene appeltjes, mineralig",
          },
          {
            title: "Les Bénédictins Limoux Chardonnay (Languedoc)",
            price: "€ 8,50 / 25 / 35",
            details: "rijp fruit, stevig, geurig, romig",
          },
        ],
      },
      {
        title: "Wijn — Rode wijn (glas / halve liter / fles)",
        items: [
          {
            title: "Shi Fu Me, vin naturel (Côtes du Rhône)",
            price: "€ 8 / 23 / 33",
            details: "gekoeld; milde kruiden, aards, fris sappig",
          },
          {
            title: "Merlot - Cabernet (Languedoc)",
            price: "€ 6 / 20 / 29",
            details: "vol, soepel, rood fruit",
          },
          {
            title: "Spätburgunder (Baden)",
            price: "€ 7 / 21 / 30",
            details: "licht, fris",
          },
          {
            title: "Monferrato Ruanera (Piemonte)",
            price: "€ 8 / 23 / 33",
            details: "overrijp rood fruit, tonen van eikenhout, vol, rond",
          },
          {
            title: "Artelan Rioja Alavesa Crianza (Rioja)",
            price: "€ 8,50 / 25 / 35",
            details: "vanille, zoethout, vol, krachtig",
          },
        ],
      },
      {
        title: "Bubbels",
        items: [
          { title: "Prosecco", price: "€ 9,00" },
          { title: "Cider (glas / fles)", price: "€ 5,20 / 25,00" },
          { title: "Crémant de Bourgogne (fles)", price: "€ 37,00" },
          { title: "Pet Nat Moscato Giallo (fles)", price: "€ 39,00" },
        ],
      },
      {
        title: "In de mix",
        items: [
          { title: "Gin-tonic", price: "€ 11,00" },
          { title: "Campari-tonic", price: "€ 11,00" },
          { title: "Moscow-mule", price: "€ 11,00" },
          { title: "Dark & Stormy", price: "€ 11,00" },
        ],
      },
      {
        title: "Sterk",
        items: [
          { title: "Rode port", price: "€ 6,00" },
          { title: "Campari", price: "€ 6,00" },
          {
            title: "Zuidam genever",
            price: "v.a. € 5,00",
            details: "jong / oud / korenwijn / gin",
          },
          { title: "Cognac", price: "v.a. € 7,00" },
          { title: "Whiskey", price: "v.a. € 7,00" },
          { title: "Calvados", price: "v.a. € 7,00" },
        ],
      },
    ],
  },
];

