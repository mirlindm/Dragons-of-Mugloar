# **Dragons of Mugloar**

**Visual Experience** for **Dragons og Mugloar Game**. 

For more information about the game itself and the nicely documented APIs, you can visit the following website: [Dragons of Mugloar](https://dragonsofmugloar.com/)

## Technologies used to develop the Frontend Visual Experience

> React, Ant Design, React+Redux, Styled Components.

## Installation

- Download or clone this repository to your local machine: 
```
git clone https://github.com/mirlindm/Dragons-of-Mugolar.git
``` 
- Open it in your preferred code editor 
- Navigate to the MUGLOAR_UI folder
- For installing the dependencies, run the command: 
```
npm install
``` 
- For starting the server, run the command: 
```
npm start
``` 
- You will be redirected to the browser, but nevertheless, you might as well navigate to: localhost:3000

- To run the tests, located in: ``` /src/utils/utils.test.js``` , run the commmand:
```
npm test
```

## About the Application

The Kingdom of Mugloar has noticeably changed over the short time of just a few years – it was not long ago when the state officials introduced a skilled dragon trainer to the country’s payroll to train the scaly beasts to protect our lands against invading knights, hungry for royal hands in marriage – princess or miscellaneous. The dragon trainer was successful in fending off the knights and making dragons commonplace in the Mugloarian everyday...

## Application Structure
    
    MUGOLAR_UI
    .
    ├── public                  # Application <html> </html> and favicon
    ├── src                     # Documentation files (alternatively `doc`)
    ├── src                     # Source files 
        |── assets              # Images and screenshots used in the application and README.md file
        |── components          # Reusable components, such as custom styled Buttons and Modal 
        |── pages               # Application pages that carry on and showcase different application facets 
        |── services            # Application service to interact and consume the exposed APIs 
        |── styles              # Styled components that are reused in various other components 
        |── utils               # Functions used to calculate game ads' scores and provide hints to the user
        |── App.js              # Contains main logic and renders all other components used in the application
        |── index.css           # Customizing the application styles and overwriting Ant Components design
        |── index.js            # Rendering the whole application through the linked <html> </html>
        |── reportWebVitals
        |── setupTests.js
    ├── .gitignore              # Application files to ignore when committing to the remote repository
    ├── package-lock.json       # Tracking installed packages version throughout the application
    ├── package.json            # Application dependencies/packages (install them through ```npm install``` ) 
    └── README.md               # Application thorough description

## Dragons of Mugloar GIFs
![Dragons of Mugloar Part 1](https://user-images.githubusercontent.com/55096560/144057496-731242cb-0859-4644-b95a-588e638f809b.gif)
![Dragons of Mugloar Part 2](https://user-images.githubusercontent.com/55096560/144057761-69d4e35c-13a0-434f-87fb-8346281ee39b.gif)
<br /> <br />

![Dragons of Mugloar Part 3](https://user-images.githubusercontent.com/55096560/144058690-e0719fed-5d02-499d-bd18-cc19129745d8.gif)


## Dragons of Mugloar Screenshots
<img alt="Home Page" src="./src/assets/UI_Screenshots/HomePage.png">
<img alt="Game Stats" src="./src/assets/UI_Screenshots/Stats.png">
<img alt="Shop" src="./src/assets/UI_Screenshots/Shop.png">
<img alt="Challenges" src="./src/assets/UI_Screenshots/Challenges.png">
<img alt="Successful Challenge Solving" src="./src/assets/UI_Screenshots/ChallengeSolved.png">

## TODO in the application (a couple of improvements that can be done)

- Use a state management library such as Redux, MobX, etc., in order to have a centralized global state and access game details directly from the shared store. Currently, the state is managed through passing the props among components (not the ideal practice), as the application is rather small. 

- With a global shared store for managing application state, in place, it would enable to extract more dedicated components in the application.

- Testing the React components thoroughly through Jest or React Testing Library. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contact
@: mirlindmurati@outlook.com
