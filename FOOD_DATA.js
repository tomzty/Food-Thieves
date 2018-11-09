// JSON initialization of global objects to be used and manipulated
// This is essentially our fake backend data
// Quick side note: if the hasAllergens value is set to TRUE
// then the ui will indicate a tiny image marker for the user to see

var restaurantData = [
    {
        'restaurant': 'Rakki Rakki',
        'dishes': [ 
            {'Black Edition Ramen': 13.00}, 
            {'Salmon Skin Sushi': 10.00}, 
            {'Miso Soup': 3.00} 
        ],
        'hasAllergens': false  
    },
    {
        'restaurant': 'Nishiki',
        'dishes': [ 
            {'Tonkotsu Ramen': 13.00}, 
            {'Tempura Sushi': 10.00}, 
            {'Miso Soup': 3.00} 
        ],
        'hasAllergens': true 
    },
    {
    'restaurant': 'In n Out',
        'dishes': [ 
            {'Hamburger': 6.00}, 
            {'Cheese Burger': 6.00}, 
            {'Animal Style Fries': 3.00} 
        ],
        'hasAllergens': true
    },
    {
        'restaurant': 'Mana KBBQ',
        'dishes': [ 
            {'A1 combo': 20.00}, 
            {'A2 combo': 24.00}, 
            {'Family combo': 30.00} 
        ],
        'hasAllergens': true  
    }, 
    {
        'restaurant': 'Dumpling House',
        'dishes': [ 
            {'Soup Dumplings': 10.00}, 
            {'Chow Mein': 8.00}, 
            {'Wonton Soup': 6.00} 
        ],
        'hasAllergens': false  
    }
]