# ToDo:

    Get rid of dublicated events
    live events storage
    selecting which service I used to bet
    lower stake/odds steps
    lost/won not set by default in betslip [Autoset for ended events]
    betslip rework
    better input in 'store bet' for odds
    custom bet options aswell as basic ones[kills, roshans, etc]
    show time ago from event timing, not from my bet placing. (also probably rework dates to mongo dates)
    dashboard - omg
    merge events.vue with predictions.vue, theres way too much same functionality


Basd on PanJiaChen
## Directory structure [Outdated]
 
``` 
├── build                      // build  
├── config                     // config 
├── src                        // source code 
│   ├── api                    // all requests 
│   ├── assets                 // static resource like themes, fonts 
│   ├── components             // global public components 
│   ├── directive              // global directive 
│   ├── filters                // global filters 
│   ├── mock                   // mock data 
│   ├── router                 // router 
│   ├── store                  // global status management 
│   ├── styles                 // global styles 
│   ├── utils                  // global public functions 
│   ├── view                   // view 
│   ├── App.vue                // entry view 
│   └── main.js                // entry for loading components, initialization 
├── static                     // third-party libraries not packed with Webpack 
│   └── Tinymce                // rich text 
├── .babelrc                   // babel-loader config 
├── eslintrc.js                // eslint config 
├── .gitignore                 // gitignore 
├── favicon.ico                // favicon 
├── index.html                 // html template 
└── package.json               // package.json 
``` 