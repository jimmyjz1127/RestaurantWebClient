const menuItems = [
    {
      id:1,
      name: "Veggie Nachos",
      price: 699, // 6.99 GBP
      category: "Appetizer",
      description:
        "Crispy tortilla chips topped with melted cheese, jalapeÃ±os, black beans, and pico de gallo.",
      extras: [
        { name: "Guacamole", price: 99 }, // 0.99 GBP
        { name: "Sour Cream", price: 50 }, // 0.50 GBP
        { name: "Extra Cheese", price: 75 }, // 0.75 GBP
      ],
      img:'./Assets/food_images/nachos.jpg'
    },
    {
      id:2,
      name: "Free Range Chicken & Avocado Tacos",
      price: 449, // 4.49 GBP
      category: "Taco",
      description:
        "Grilled free-range chicken served in a soft tortilla with avocado, lettuce, and lime crema.",
      extras: [
        { name: "Guacamole", price: 99 }, // 0.99 GBP
        { name: "Extra Chicken", price: 150 }, // 1.50 GBP
        { name: "Spicy Salsa", price: 50 }, // 0.50 GBP
      ],
      img:'./Assets/food_images/chicken_tacos.jpg'
    },
    {
        id:3,
        name: "Grassfed Beef Tacos",
        price: 449, // 4.49 GBP
        category: "Taco",
        description:
          "Grilled grass-fed beef served in soft corn tortilla with roasted peppers, onions, and sour cream",
        extras: [
          { name: "Guacamole", price: 99 }, // 0.99 GBP
          { name: "Extra Beef", price: 150 }, // 1.50 GBP
          { name: "Spicy Salsa", price: 50 }, // 0.50 GBP
        ],
        img:'./Assets/food_images/beef-taco.jpg'
    },
    {
        id:4,
        name: "Hot Carnitas Tacos",
        price: 399, // 3.99 GBP
        category: "Taco",
        description:
          "Smoky and hot carnitas tacos served in corn tortilla with pico-de-gallo, fresh coriander, and jalapeno salsa.",
        extras: [
          { name: "Extra Carnitas", price: 125 }, // 1.25 GBP
          { name: "Monterry Jack Cheese", price: 75 }, // 0.75 GBP
          { name: "Salsa Verde", price: 50 }, // 0.50 GBP
        ],
        img:'./Assets/food_images/carnitas-taco.jpg'
    },
    {
        id:5,
        name: "Birria Tacos",
        price: 399, // 3.99 GBP
        category: "Taco",
        description:
          "12 hour birria tacos served in a monterrey jack cheese-fried hard shell tortilla, served with pico-de-gallo and pork consume.",
        extras: [
          { name: "Extra Pork", price: 125 }, // 1.25 GBP
          { name: "Monterry Jack Cheese", price: 75 }, // 0.75 GBP
          { name: "Salsa Verde", price: 50 }, // 0.50 GBP
        ],
        img:'./Assets/food_images/birria_tacos.jpg'
    },
    {
        id:6,
        name: "Shrimp Tacos",
        price: 399, // 3.99 GBP
        category: "Taco",
        description:
          "Garlic roasted shrimp in flour tortilla served with roasted pinapple, corn and chillies.",
        extras: [
          { name: "Extra shrimp", price: 125 }, // 1.25 GBP
          { name: "Monterry Jack Cheese", price: 75 }, // 0.75 GBP
          { name: "Salsa Verde", price: 50 }, // 0.50 GBP
        ],
        img:'./Assets/food_images/shrimp_tacos.jpg'
    },
    {
      id:7,
      name: "Ancho Mushroom Tacos",
      price: 399, // 3.99 GBP
      category: "Taco",
      description:
        "Smoky ancho-marinated mushrooms with red cabbage slaw and avocado in a soft tortilla.",
      extras: [
        { name: "Extra Mushrooms", price: 125 }, // 1.25 GBP
        { name: "Vegan Cheese", price: 75 }, // 0.75 GBP
        { name: "Salsa Verde", price: 50 }, // 0.50 GBP
      ],
      img:"./Assets/food_images/mushroom-taco.png"
    },
    {
      id:8,
      name: "Sustainable Battered Fish Tacos",
      price: 549, // 5.49 GBP
      category: "Taco",
      description:
        "Crispy battered fish with tangy slaw and lime mayo in a soft tortilla.",
      extras: [
        { name: "Extra Fish", price: 199 }, // 1.99 GBP
        { name: "Extra Lime Mayo", price: 50 }, // 0.50 GBP
        { name: "Pickled Onions", price: 50 }, // 0.50 GBP
      ],
      img:"./Assets/food_images/fish_taco.png"
    },
    {
      id:9,
      name: "Black Bean & Three Cheeses Quesadillas",
      price: 499, // 4.99 GBP
      category: "Quesadilla",
      description:
        "Grilled quesadilla stuffed with black beans, cheddar, mozzarella, and feta cheese.",
      extras: [
        { name: "Guacamole", price: 99 }, // 0.99 GBP
        { name: "Sour Cream", price: 50 }, // 0.50 GBP
        { name: "Extra Cheese", price: 75 }, // 0.75 GBP
      ],
      img:"./Assets/food_images/quesadilla.jpg"
    },
    {
      id:10,
      name: "Horchata",
      price: 249, // 2.49 GBP
      category: "Drink",
      description:
        "Sweet and refreshing traditional Mexican rice milk with cinnamon.",
      extras: [
        { name: "Extra Cinnamon", price: 25 }, // 0.25 GBP
        { name: "Large Size", price: 99 }, // 0.99 GBP
      ],
      img:'./Assets/food_images/horchata.jpg'
    },
    {
        id:11,
        name: "Tres Leches Cake",
        price: 549, // 2.49 GBP
        category: "Dessert",
        description:
          "Sweet and rich tres leches cake served with strawberries.",
        extras: [
          { name: "Extra Strawberry", price: 25 }, // 0.25 GBP
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/tresleches.jpg'
      },
      {
        id:12,
        name: "Tomato Salsa",
        price: 249, // 2.49 GBP
        category: "Side",
        description:
          "Freshly made tomato salsa with freshly squeezed lime",
        extras: [
          { name: "Extra jalapeno", price: 25 }, // 0.25 GBP
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/tomatosalsa.jpg'
      },
      {
        id:13,
        name: "Guacamole",
        price: 249, // 2.49 GBP
        category: "Side",
        description:
          "Creamy and tangy freshly made guacamole.",
        extras: [
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/guac.jpg'
      },
      {
        id:14,
        name: "Mandarin Jarritos Soda",
        price: 249, // 2.49 GBP
        category: "Drink",
        description:
          "Sweet and refreshing Mexican Jarrito Soda.",
        extras: [
        ],
        img:'./Assets/food_images/jarritos.jpg'
      },
      {
        id:15,
        name: "Beef Burrito",
        price: 849, // 2.49 GBP
        category: "Burrito",
        description:
          "Traditional Mexican beef burrito with grass fed ground beef, monterry jack cheese, pico-de-gallo, and corn.",
        extras: [
          { name: "Extra Beef", price: 25 }, // 0.25 GBP
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/beef_burrito.jpg'
      },
      { 
        id:16,
        name: "Chicken Burrito",
        price: 849, // 2.49 GBP
        category: "Burrito",
        description:
          "Free range chicken breast served in flour tortilla with monterry jack cheese, coriander, and tomato salsa.",
        extras: [
          { name: "Extra Chicken", price: 25 }, // 0.25 GBP
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/chicken_burrito.jpg'
      },
      {
        id:17,
        name: "Choriza Burrito",
        price: 849, // 2.49 GBP
        category: "Burrito",
        description:
          "Traditional spanish chorizo served in flour tortilla with mango salsa and fresh coriander.",
        extras: [
          { name: "Extra Chorizo", price: 25 }, // 0.25 GBP
          { name: "Large Size", price: 99 }, // 0.99 GBP
        ],
        img:'./Assets/food_images/chorizo_burrito.jpg'
      },
  ];
  

export default menuItems;