// ==========================================================================
// NANASI CAFE — BITE . SIP . SMILE
// Complete & Verified Menu Data from the Official 9-Page Menu PDF
// ==========================================================================

window.NANASI_MENU = {
  restaurant: {
    name: "NANASI CAFE",
    tagline: "BITE . SIP . SMILE",
    motto: "More Than a Meal — It's a Moment",
    location: "Survey Complex, University Road, Dar es Salaam, Tanzania",
    currency: "TSH",
    whatsappNumber: "255700000000"
  },

  // Featured Spotlight Items (Inspired by the Jimbo / CheckCheck vibrant showcase cards)
  spotlights: [
    {
      id: "swahili-breakfast",
      secId: "nanasi-special-breakfast",
      tag: "MORNING FAVORITE",
      title: "SWAHILI BREAKFAST",
      price: 12000,
      theme: "orange",
      image: "assets/dishes/pdf_breakfast_special.jpg"
    },
    {
      id: "chicken-chips",
      secId: "chips-and-meats",
      tag: "CRISPY & GOLDEN",
      title: "CHICKEN & CHIPS",
      price: 9000,
      theme: "yellow",
      image: "assets/dishes/pdf_chicken_chips.jpg"
    },
    {
      id: "mixed-meat-pizza",
      secId: "pizza-large",
      tag: "LARGE SUPREME",
      title: "MIXED MEAT PIZZA",
      price: 20000,
      theme: "red",
      image: "assets/dishes/pdf_pizza_whole.jpg"
    },
    {
      id: "beef-changamoto",
      secId: "chips-and-meats",
      tag: "CHEF'S SIGNATURE",
      title: "BEEF CHANGAMOTO",
      price: 12000,
      theme: "orange",
      image: "assets/dishes/beef_changamoto.jpg"
    },
    {
      id: "chocolate-cake",
      secId: "desserts",
      tag: "BAKERY SLICE",
      title: "CHOCOLATE CAKE",
      price: 8000,
      theme: "red",
      image: "assets/dishes/dessert_chocolate_cake.png?v=8"
    },
    {
      id: "oreo-milkshake",
      secId: "milkshake",
      tag: "HAND-SPUN SHAKE",
      title: "OREO MILKSHAKE",
      price: 10000,
      theme: "yellow",
      image: "assets/dishes/oreo_milkshake.jpg"
    }
  ],

  // All 16 Exact Sections from the 9-Page Official Menu PDF
  sections: [
    {
      id: "bites",
      title: "BITES",
      subtitle: "Freshly baked East African bites & morning pastries",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "green",
      bannerImage: "assets/dishes/bites_chapati.png",
      items: [
        {
          id: "chapati-portion",
          name: "Chapati per portion",
          displayTitle: ["CHAPATI", "PORTION"],
          price: 2000,
          subtitle: "Soft, flaky, golden-layered East African flatbread",
          descriptors: ["Soft & flaky", "Golden-layered", "East African classic"],
          image: "assets/dishes/bites_chapati.png"
        },
        {
          id: "sambusa-portion",
          name: "Sambusa per portion",
          displayTitle: ["SAMBUSA", "PORTION"],
          price: 4000,
          subtitle: "Golden triangular pastries filled with spiced minced beef",
          descriptors: ["Crispy golden", "Spiced minced beef", "Savory bite"],
          image: "assets/dishes/bites_sambusa.png"
        },
        {
          id: "kebabu-portion",
          name: "Kebabu per portion",
          displayTitle: ["BEEF", "KEBAB"],
          price: 3000,
          subtitle: "Juicy seasoned minced beef kebabs fried golden",
          descriptors: ["Juicy seasoned", "Smoky flame-grilled", "Minced beef"],
          image: "assets/dishes/bites_kebab.png"
        },
        {
          id: "sausage-russian-portion",
          name: "Sausage Russian per portion",
          displayTitle: ["RUSSIAN", "SAUSAGE"],
          price: 6000,
          subtitle: "Hearty smoked Russian sausage grilled juicy",
          descriptors: ["Hearty smoked", "Russian recipe", "Grilled succulent"],
          image: "assets/dishes/bites_sausage_russian.png"
        },
        {
          id: "sausage-vienna-portion",
          name: "Sausage Vienna per portion",
          displayTitle: ["VIENNA", "SAUSAGE"],
          price: 2000,
          subtitle: "Tender Vienna beef sausage portion",
          descriptors: ["Tender beef", "Classic Vienna", "Savory grill"],
          image: "assets/dishes/bites_sausage_vienna.png"
        },
        {
          id: "waffle-portion",
          name: "Waffle per portion",
          displayTitle: ["BELGIAN", "WAFFLE"],
          price: 6000,
          subtitle: "Warm golden Belgian waffle portion",
          descriptors: ["Warm golden", "Belgian style", "Crisp honeycomb"],
          image: "assets/dishes/bites_waffle.png"
        },
        {
          id: "avocado-toast",
          name: "Avocado Toast",
          displayTitle: ["AVOCADO", "TOAST"],
          price: 5000,
          subtitle: "Toasted artisan bread topped with ripe smashed avocado",
          descriptors: ["Creamy smashed", "Artisan toasted", "Fresh produce"],
          image: "assets/dishes/bites_avocado_toast.png"
        },
        {
          id: "kachori-portion",
          name: "Kachori per portion",
          displayTitle: ["SWAHILI", "KACHORI"],
          price: 3000,
          subtitle: "Crispy spiced potato balls in a golden batter",
          descriptors: ["Crispy spiced", "Golden batter", "Swahili snack"],
          image: "assets/dishes/bites_kachori.png"
        },
        {
          id: "maharage",
          name: "Maharage",
          displayTitle: ["COCONUT", "MAHARAGE"],
          price: 2000,
          subtitle: "Creamy red kidney beans simmered in rich coconut milk",
          descriptors: ["Creamy coconut", "Simmered red beans", "Traditional"],
          image: "assets/dishes/bites_maharage.png"
        }
      ]
    },
    {
      id: "soup",
      title: "SOUP",
      subtitle: "Slow-simmered traditional broths served steaming hot",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "green",
      bannerImage: "assets/dishes/soup_chicken.png",
      items: [
        {
          id: "beef-soup",
          name: "Beef Soup",
          displayTitle: ["BEEF", "SOUP"],
          price: 6000,
          subtitle: "Slow-simmered beef broth with tender cuts & herbs",
          descriptors: ["Slow-simmered tender beef", "Aromatic herbal broth", "Root vegetables & parsley"],
          image: "assets/dishes/soup_beef.png"
        },
        {
          id: "free-range-chicken",
          name: "Free-Range Chicken Soup",
          displayTitle: ["FREE-RANGE", "CHICKEN SOUP"],
          price: 12000,
          subtitle: "Authentic local free-range chicken soup (Supu ya Kuku)",
          descriptors: ["Local free-range chicken", "Golden nourishing broth", "Tender carrots & herbs"],
          image: "assets/dishes/soup_chicken.png"
        },
        {
          id: "pumpkin-soup",
          name: "Pumpkin Soup",
          displayTitle: ["PUMPKIN", "SOUP"],
          price: 6000,
          subtitle: "Minced beef meat & rich pumpkin puree",
          descriptors: ["Golden velvety pumpkin", "Savory minced beef", "Toasted pumpkin seeds"],
          image: "assets/dishes/soup_pumpkin.png"
        }
      ]
    },
    {
      id: "nanasi-special-breakfast",
      title: "NANASI SPECIAL",
      subtitle: "Complete hearty breakfast platters served with hot tea",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "yellow",
      bannerImage: "assets/dishes/special_swahili_breakfast.png",
      items: [
        {
          id: "swahili-breakfast",
          name: "Swahili Breakfast",
          displayTitle: ["SWAHILI", "BREAKFAST"],
          price: 12000,
          subtitle: "Chapati, maharage (beans), kachori, meat Changamoto (beef/chicken) & tea (milk/black)",
          descriptors: ["Folded Chapati & Beans", "Golden Kachori", "Tender Beef Changamoto", "Hot Tea Included"],
          image: "assets/dishes/special_swahili_breakfast.png"
        },
        {
          id: "english-breakfast",
          name: "English Breakfast",
          displayTitle: ["ENGLISH", "BREAKFAST"],
          price: 18000,
          subtitle: "Toast, mushroom, tomatoes, beans, sausage Russian, eggs and tea (milk/black)",
          descriptors: ["Toasted Bread & Eggs", "Grilled Russian Sausage", "Baked Beans & Mushrooms", "Hot Tea Included"],
          image: "assets/dishes/special_english_breakfast.png"
        },
        {
          id: "healthy-breakfast",
          name: "Healthy Breakfast",
          displayTitle: ["HEALTHY", "BREAKFAST"],
          price: 15000,
          subtitle: "Poached egg, veggie, kachori, okra, seasonal fruit, meat sausage & tea (milk/black)",
          descriptors: ["Poached Farm Eggs", "Sautéed Spinach & Okra", "Fresh Tropical Fruits", "Hot Tea Included"],
          image: "assets/dishes/special_healthy_breakfast.png"
        }
      ]
    },
    {
      id: "platters",
      title: "PLATTERS",
      subtitle: "Generous sharing & combo platters",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "orange",
      bannerImage: "assets/dishes/platter_two_dish.png",
      items: [
        {
          id: "platter-one",
          name: "Platter One",
          displayTitle: ["PLATTER", "ONE"],
          price: 8000,
          subtitle: "Beef Soup with chapati portion",
          image: "assets/dishes/platter_one_dish.png"
        },
        {
          id: "platter-two",
          name: "Platter Two",
          displayTitle: ["PLATTER", "TWO"],
          price: 12000,
          subtitle: "Kebab portion, Sambusa portion, kachori portion & Sausage Vienna portion",
          image: "assets/dishes/platter_two_dish.png"
        }
      ]
    },
    {
      id: "chips-and-meats",
      title: "CHIPS AND MEATS",
      subtitle: "Crispy golden chips, flame-grilled meats, fresh fish & signature Changamoto",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "red",
      bannerImage: "assets/dishes/chicken_chips_dish.png",
      items: [
        {
          id: "chicken-chips",
          name: "Chicken Chips",
          price: 9000,
          subtitle: "Crispy golden chicken strips served with french fries & signature dip",
          image: "assets/dishes/chicken_chips_dish.png"
        },
        {
          id: "sausage-chips",
          name: "Sausage & Chips",
          price: 7000,
          subtitle: "Grilled Russian sausage served with hot golden chips & dipping sauce",
          image: "assets/dishes/sausage_chips_dish.png"
        },
        {
          id: "chips-yai",
          name: "Chips Yai",
          price: 7000,
          subtitle: "Iconic Tanzanian french fry omelette served with fresh kachumbari & chili",
          image: "assets/dishes/chips_yai_dish.png"
        },
        {
          id: "fish-chips",
          name: "Fish & Chips",
          price: 15000,
          subtitle: "Golden battered Sangara fish portion served with thick chips & garden salad",
          image: "assets/dishes/fish_chips_dish.png"
        },
        {
          id: "fried-kalamari-chips",
          name: "Fried Kalamari & Chips",
          price: 22000,
          subtitle: "Crispy tender kalamari rings served with golden chips & fresh side salad",
          image: "assets/dishes/fried_kalamari_dish.png"
        },
        {
          id: "beef-changamoto",
          name: "Beef Changamoto",
          price: 12000,
          subtitle: "Sautéed tender beef cubes in rich spice, served with chips & fresh kachumbari",
          image: "assets/dishes/beef_changamoto_dish.png"
        },
        {
          id: "half-chicken-changamoto",
          name: "1/2 Chicken Changamoto",
          price: 12000,
          subtitle: "Half tender chicken simmered in spiced savory sauce with chips & fresh salad",
          image: "assets/dishes/half_chicken_dish.png"
        },
        {
          id: "full-chicken-changamoto",
          name: "Full Chicken Changamoto",
          price: 24000,
          subtitle: "Whole spiced roast chicken served with golden chips & garden salad",
          image: "assets/dishes/full_chicken_dish.png"
        }
      ]
    },
    {
      id: "salad",
      title: "SALAD",
      subtitle: "Fresh garden bowls, grilled proteins & loaded nachos",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "yellow",
      bannerImage: "assets/dishes/salad_beef.png",
      items: [
        {
          id: "beef-salad",
          name: "Beef Salad",
          price: 15000,
          subtitle: "Beef, lettuce, onion, black olives, bell pepper & dressing",
          image: "assets/dishes/salad_beef.png"
        },
        {
          id: "chicken-salad",
          name: "Chicken Salad",
          price: 15000,
          subtitle: "Chicken, lettuce, onion, olives, carrots & dressing",
          image: "assets/dishes/salad_chicken.png"
        },
        {
          id: "beef-nachos",
          name: "Beef Nachos",
          price: 15000,
          subtitle: "Beef, beans, tomatoes, fried potato chips & guacamole",
          image: "assets/dishes/salad_nachos.png"
        },
        {
          id: "fish-salad",
          name: "Fish Salad",
          price: 15000,
          subtitle: "Sangara fish, lettuce, olives & dressing",
          image: "assets/dishes/salad_fish.png"
        }
      ]
    },
    {
      id: "standalone-sides",
      title: "STANDALONE SIDES AND PORTION",
      subtitle: "Extra portions, spicy masala chips & creamy mash",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "orange",
      bannerImage: "assets/dishes/standalone_masala_chips.png",
      items: [
        {
          id: "quarter-chicken-portion",
          name: "1/4 Chicken Portion",
          price: 5000,
          subtitle: "Fried 1/4 chicken (no grill) 1/4 — crispy golden quarter with fries & lemon",
          image: "assets/dishes/standalone_chicken_quarter.png"
        },
        {
          id: "masala-chips",
          name: "Masala Chips",
          price: 6000,
          subtitle: "Crispy golden chips tossed in aromatic masala spice & fresh herbs",
          image: "assets/dishes/standalone_masala_chips.png"
        },
        {
          id: "chips-portion",
          name: "Chips Portion",
          price: 4000,
          subtitle: "Crispy golden hand-cut fries served with house dipping sauce",
          image: "assets/dishes/standalone_chips_portion.png"
        },
        {
          id: "mash-potato",
          name: "Mash Potato",
          price: 4000,
          subtitle: "Smooth, velvety buttery mashed potatoes with herbs & melting butter",
          image: "assets/dishes/standalone_mash_potato.png"
        }
      ]
    },
    {
      id: "pizza-large",
      title: "PIZZA LARGE",
      subtitle: "Oven-baked large pizzas with stretchy mozzarella & bold toppings",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "red",
      bannerImage: "assets/dishes/pizza_mixed_meat.png",
      items: [
        {
          id: "margherita-pizza",
          name: "Margherita Pizza",
          price: 17000,
          subtitle: "Tomato sauce, mozzarella cheese, fresh tomato slices & aromatic basil herbs",
          image: "assets/dishes/pizza_margherita.png"
        },
        {
          id: "bbq-chicken-pizza",
          name: "BBQ Chicken Pizza",
          price: 17000,
          subtitle: "Grilled chicken, BBQ sauce, mozzarella, red onion & pizza seasoning",
          image: "assets/dishes/pizza_bbq_chicken.png"
        },
        {
          id: "beef-pizza",
          name: "Beef Pizza",
          price: 17000,
          subtitle: "Tender seasoned beef cuts, tomato sauce, stretchy mozzarella & Italian herbs",
          image: "assets/dishes/pizza_beef.png"
        },
        {
          id: "bbq-sausage-pizza",
          name: "BBQ Sausage Pizza",
          price: 17000,
          subtitle: "Sliced sausages, savory BBQ glaze, mozzarella cheese & scallions",
          image: "assets/dishes/pizza_bbq_sausage.png"
        },
        {
          id: "mixed-meat-pizza",
          name: "Mixed Meat Pizza",
          price: 20000,
          subtitle: "Triple feast: minced beef, chicken, savory sausage & golden mozzarella",
          image: "assets/dishes/pizza_mixed_meat.png"
        }
      ]
    },
    {
      id: "pasta",
      title: "PASTA",
      subtitle: "Rich, savory stir-fried spaghetti with tender meats",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "yellow",
      bannerImage: "assets/dishes/pasta_shire_clean.png",
      items: [
        {
          id: "shire-pasta",
          name: "Shire Pasta",
          price: 15000,
          subtitle: "Spaghetti, bell pepper, meats (beef/chicken)",
          image: "assets/dishes/pasta_shire_clean.png"
        }
      ]
    },
    {
      id: "desserts",
      title: "NANASI DESSERTS",
      subtitle: "Freshly baked cakes per slice, mousse cakes & sweet waffles",
      priceHeader: "TSH",
      itemHeader: "Cakes Per Slice",
      accent: "green",
      bannerImage: "assets/dishes/dessert_chocolate_cake.png?v=8",
      items: [
        {
          id: "marble-cake",
          name: "Marble",
          price: 6000,
          subtitle: "Rich vanilla and chocolate swirled sponge slice",
          image: "assets/dishes/dessert_marble_cake.png?v=8"
        },
        {
          id: "lemon-cake",
          name: "Lemon Cake",
          price: 6000,
          subtitle: "Zesty glazed lemon sponge cake slice",
          image: "assets/dishes/dessert_lemon_cake.png?v=8"
        },
        {
          id: "nutella-waffles",
          name: "Nutella Waffles",
          price: 6000,
          subtitle: "Warm golden waffles drizzled with rich Nutella",
          image: "assets/dishes/dessert_nutella_waffles.png?v=8"
        },
        {
          id: "chocolate-cake",
          name: "Chocolate Cake",
          price: 8000,
          subtitle: "Decadent layered dark chocolate fudge cake",
          image: "assets/dishes/dessert_chocolate_cake.png?v=8"
        },
        {
          id: "carrot-walnut-cake",
          name: "Carrot Walnut Cake",
          price: 8000,
          subtitle: "Spiced carrot cake studded with roasted walnuts",
          image: "assets/dishes/dessert_carrot_walnut_cake.png?v=8"
        },
        {
          id: "red-velvet-cakes",
          name: "Red Velvet Cakes",
          price: 8000,
          subtitle: "Classic crimson cocoa layer cake with cream frosting",
          image: "assets/dishes/dessert_red_velvet_cake.png?v=8"
        },
        {
          id: "lemon-cheesecake-mousse",
          name: "Lemon Cheesecake Mousse Cake",
          price: 12000,
          subtitle: "Velvety lemon curd & cream cheese mousse slice",
          image: "assets/dishes/dessert_lemon_cheesecake_mousse.png?v=8"
        },
        {
          id: "raspberry-strawberry-mousse",
          name: "Raspberry/Strawberry Mousse Cake",
          price: 12000,
          subtitle: "Light berry mousse layered over delicate sponge",
          image: "assets/dishes/dessert_raspberry_strawberry_mousse.png?v=8"
        }
      ]
    },
    {
      id: "tea-botanicals",
      title: "TEA & BOTANICALS",
      subtitle: "Warming black teas, spiced dawa & soothing herbal infusions",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "orange",
      bannerImage: "assets/dishes/tea_dawa.png",
      items: [
        {
          id: "black-tea",
          name: "Black Tea",
          price: 4000,
          subtitle: "Aromatic East African pure black tea",
          image: "assets/dishes/tea_black.png"
        },
        {
          id: "lemongrass-tea",
          name: "Lemongrass Tea",
          price: 4000,
          subtitle: "Fragrant fresh lemongrass (mchaichai) infusion",
          image: "assets/dishes/tea_lemongrass.png"
        },
        {
          id: "ginger-tea",
          name: "Ginger Tea",
          price: 4000,
          subtitle: "Warming spiced ginger tea (chai ya tangawizi)",
          image: "assets/dishes/tea_ginger.png"
        },
        {
          id: "hibiscus-tea",
          name: "Hibiscus Tea",
          price: 4000,
          subtitle: "Ruby-red botanical hibiscus (rozela) infusion",
          image: "assets/dishes/tea_hibiscus.png"
        },
        {
          id: "ginger-lemon-tea-dawa",
          name: "Ginger Lemon Tea (Dawa)",
          price: 5000,
          subtitle: "Fresh crushed ginger, squeezed lemon & pure honey",
          image: "assets/dishes/tea_dawa.png"
        },
        {
          id: "hot-milk",
          name: "Hot Milk",
          price: 5000,
          subtitle: "Steaming farm-fresh whole milk",
          image: "assets/dishes/tea_hot_milk.png"
        },
        {
          id: "milk-tea",
          name: "Milk Tea",
          price: 5000,
          subtitle: "Creamy simmered East African milk chai",
          image: "assets/dishes/tea_milk.png"
        },
        {
          id: "milk-masala-tea",
          name: "Milk Masala Tea",
          price: 5000,
          subtitle: "Spiced milk chai with cardamom, cinnamon & ginger",
          image: "assets/dishes/tea_milk_masala.png"
        },
        {
          id: "hot-chocolate",
          name: "Hot Chocolate",
          price: 5000,
          subtitle: "Rich, velvety hot cocoa with steamed milk",
          image: "assets/dishes/tea_hot_chocolate.png"
        }
      ]
    },
    {
      id: "cafe-coffee",
      title: "NANASI CAFÉ COFFEE",
      subtitle: "Barista-crafted espresso drinks from roasted Tanzanian beans",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "yellow",
      bannerImage: "assets/dishes/coffee_cappuccino.png",
      items: [
        {
          id: "cafe-latte",
          name: "Café Latte",
          price: 6000,
          subtitle: "Rich espresso with silky steamed milk & micro-foam",
          image: "assets/dishes/coffee_latte.png"
        },
        {
          id: "cappuccino",
          name: "Cappuccino",
          price: 7000,
          subtitle: "Bold espresso crowned with airy cocoa-dusted foam",
          image: "assets/dishes/coffee_cappuccino.png"
        },
        {
          id: "espresso-single",
          name: "Espresso (Single)",
          price: 4500,
          subtitle: "Single shot of pure Arabica espresso",
          image: "assets/dishes/coffee_espresso_single.png"
        },
        {
          id: "espresso-double",
          name: "Espresso (Double)",
          price: 6500,
          subtitle: "Double shot of rich full-bodied espresso",
          image: "assets/dishes/coffee_espresso_double.png"
        },
        {
          id: "americano",
          name: "Americano",
          price: 4000,
          subtitle: "Smooth espresso lengthened with hot water",
          image: "assets/dishes/coffee_americano.png"
        }
      ]
    },
    {
      id: "nanasi-cold-special",
      title: "NANASI SPECIAL (COLD DRINKS)",
      subtitle: "Barista-crafted espresso drinks from roasted Tanzanian beans",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "orange",
      bannerImage: "assets/dishes/cold_iced_cafe_latte.png",
      items: [
        {
          id: "iced-lemon-tea",
          name: "Iced Lemon Tea",
          displayTitle: ["ICED LEMON", "TEA"],
          price: 5000,
          subtitle: "Chilled black tea over ice with fresh lemon & mint",
          descriptors: ["Chilled black tea", "Fresh lemon slice", "Crystal ice"],
          image: "assets/dishes/cold_iced_lemon_tea.png"
        },
        {
          id: "cold-chocolate",
          name: "Cold Chocolate",
          displayTitle: ["COLD", "CHOCOLATE"],
          price: 7000,
          subtitle: "Creamy iced chocolate blended with fudge drizzle",
          descriptors: ["Creamy chocolate", "Fudge drizzle", "Served chilled"],
          image: "assets/dishes/cold_chocolate.png"
        },
        {
          id: "iced-cafe-latte",
          name: "Iced Cafe Latte",
          displayTitle: ["ICED CAFE", "LATTE"],
          price: 7000,
          subtitle: "Double espresso poured over cold milk and ice",
          descriptors: ["Double espresso", "Cold fresh milk", "Layered on ice"],
          image: "assets/dishes/cold_iced_cafe_latte.png"
        },
        {
          id: "iced-americano",
          name: "Iced Americano",
          displayTitle: ["ICED", "AMERICANO"],
          price: 7000,
          subtitle: "Refreshing chilled espresso over crystal ice",
          descriptors: ["Chilled espresso", "Roasted beans", "Crystal ice cubes"],
          image: "assets/dishes/cold_iced_americano.png"
        },
        {
          id: "sodas",
          name: "Sodas",
          displayTitle: ["CHILLED", "SODAS"],
          price: 2000,
          subtitle: "Chilled assorted soft drinks",
          descriptors: ["Assorted sodas", "Crisp & bubbly", "Served ice cold"],
          image: "assets/dishes/cold_sodas.png"
        },
        {
          id: "water",
          name: "Water",
          displayTitle: ["MINERAL", "WATER"],
          price: 1000,
          subtitle: "Chilled bottled mineral water",
          descriptors: ["Pure mineral water", "Crisp & clean", "Served on ice"],
          image: "assets/dishes/cold_water.png"
        }
      ]
    },
    {
      id: "fresh-juice",
      title: "FRESH JUICE",
      subtitle: "100% pure pressed tropical fruit juices",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "yellow",
      bannerImage: "assets/dishes/juice_mango.png",
      items: [
        {
          id: "mango-juice",
          name: "Mango",
          price: 5000,
          subtitle: "100% pure ripe tropical mango juice",
          image: "assets/dishes/juice_mango.png"
        },
        {
          id: "watermelon-juice",
          name: "Watermelon",
          price: 5000,
          subtitle: "Chilled hydrating ruby watermelon juice",
          image: "assets/dishes/juice_watermelon.png"
        },
        {
          id: "passion-juice",
          name: "Passion",
          price: 5000,
          subtitle: "Tangy, aromatic fresh passion fruit juice",
          image: "assets/dishes/juice_passion.png"
        },
        {
          id: "avocado-juice",
          name: "Avocado",
          price: 5000,
          subtitle: "Smooth, creamy blended fresh avocado juice",
          image: "assets/dishes/juice_avocado.png"
        },
        {
          id: "pineapple-juice",
          name: "Pineapple",
          price: 5000,
          subtitle: "Sweet golden pressed pineapple (Nanasi) juice",
          image: "assets/dishes/juice_pineapple.png"
        },
        {
          id: "mixed-juice",
          name: "Mixed Juice",
          price: 5000,
          subtitle: "Tropical blend of mango, pineapple, passion & watermelon",
          image: "assets/dishes/juice_mixed.png"
        },
        {
          id: "sugarcane-juice",
          name: "Sugarcane",
          price: 6000,
          subtitle: "Freshly pressed sugarcane juice with ginger & lime",
          image: "assets/dishes/juice_sugarcane.png"
        }
      ]
    },
    {
      id: "milkshake",
      title: "MILKSHAKE",
      scriptTitle: "Fresh Handcrafted Shakes",
      subtitle: "Thick, indulgent ice cream shakes crowned with whipped cream & rich toppings",
      priceHeader: "TSH",
      itemHeader: "ITEM",
      accent: "red",
      bannerImage: "assets/dishes/milkshake_oreo.png",
      items: [
        {
          id: "vanilla-milkshake",
          name: "Vanilla",
          price: 10000,
          subtitle: "Creamy Madagascar vanilla bean ice cream shake",
          image: "assets/dishes/milkshake_vanilla.png",
          color: "#FFD166"
        },
        {
          id: "chocolate-milkshake",
          name: "Chocolate",
          price: 10000,
          subtitle: "Rich chocolate ice cream shake with fudge swirls",
          image: "assets/dishes/milkshake_chocolate.png",
          color: "#D48B55"
        },
        {
          id: "strawberry-milkshake",
          name: "Strawberry",
          price: 10000,
          subtitle: "Sweet strawberry ice cream & real berry shake",
          image: "assets/dishes/milkshake_strawberry.png",
          color: "#FF5E7E"
        },
        {
          id: "oreo-milkshake",
          name: "Oreo",
          price: 10000,
          subtitle: "Crushed Oreo cookies spun with vanilla ice cream & fudge",
          image: "assets/dishes/milkshake_oreo.png",
          color: "#FFFFFF"
        },
        {
          id: "banana-nuts-milkshake",
          name: "Banana & Nuts",
          price: 10000,
          subtitle: "Sweet ripe banana & roasted nuts milkshake",
          image: "assets/dishes/milkshake_banana_nuts.png",
          color: "#FFE066"
        },
        {
          id: "caramel-milkshake",
          name: "Caramel",
          price: 10000,
          subtitle: "Golden salted-caramel spun ice cream shake",
          image: "assets/dishes/milkshake_caramel.png",
          color: "#FFA737"
        }
      ]
    },
    {
      id: "smoothie",
      title: "SMOOTHIE",
      scriptTitle: "100% Pure Pressed Tropical Juices",
      subtitle: "100% pure pressed tropical fruit juices",
      priceHeader: "TZS",
      itemHeader: "ITEM",
      accent: "orange",
      bannerImage: "assets/dishes/smoothie_showcase_banner.jpg",
      items: [
        {
          id: "mango-smoothie",
          name: "Mango Smoothie",
          price: 10000,
          subtitle: "Thick golden mango & creamy yogurt smoothie",
          image: "assets/dishes/smoothie_mango.png"
        },
        {
          id: "banana-smoothie",
          name: "Banana Smoothie",
          price: 10000,
          subtitle: "Velvety banana, yogurt & honey smoothie",
          image: "assets/dishes/smoothie_banana.png"
        },
        {
          id: "avocado-smoothie",
          name: "Avocado Smoothie",
          price: 10000,
          subtitle: "Creamy Hass avocado & yogurt smoothie",
          image: "assets/dishes/smoothie_avocado.png"
        },
        {
          id: "mixed-smoothie",
          name: "Mixed Smoothie",
          price: 12000,
          subtitle: "Signature multi-fruit tropical smoothie blend",
          image: "assets/dishes/smoothie_mixed.png"
        }
      ]
    }
  ]
};
