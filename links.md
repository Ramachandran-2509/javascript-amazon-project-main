# these are external library using  directly using in html script src='' and other one for ESM version are directly used in js file

example 1:

 <!-- <script src="https://unpkg.com/dayjs@1.11.10/dayjs.min.js"></script>   these al external library we used get from internet -->

 Example 2:
 <import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'> these are called 
 default export files

Lesson 15

Hello external library: [https://unpkg.com/supersimpledev@1.0.1/hello.js](https://unpkg.com/supersimpledev@1.0.1/hello.js)

DayJS external library: [https://unpkg.com/dayjs@1.11.10/dayjs.min.js](https://unpkg.com/dayjs@1.11.10/dayjs.min.js)

Hello (ESM version): [https://unpkg.com/supersimpledev@1.0.1/hello.esm.js](https://unpkg.com/supersimpledev@1.0.1/hello.esm.js)

DayJS (ESM version): [https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js](https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js)

How to Put a Website on the Internet: [https://youtu.be/p1QU3kLFPdg](https://youtu.be/p1QU3kLFPdg)

## MVC=> Model View Controller

Model => we save and store the data for Cart.js

view=> checkout.js page most of code view

controller=> checkout.js we use addEventlistener these all controller. these pattern follow up mrore convenient

                MVC Pattern (Simple Diagram)

           +-------------------+
           |       User        |
           +-------------------+
                    |
                    v
           +-------------------+
           |    Controller     |
           | Handles Request   |
           +-------------------+
             |             |
             v             v
     +---------------+   +---------------+
     |     Model     |   |     View      |
     | Data / Logic  |   | UI / Display  |
     +---------------+   +---------------+
             |                 ^
             +-----------------+
              Sends Data to View
Simple Meaning:
Model → Manages data and business logic
View → Displays data to user
Controller → Connects Model and View, handles user actions
Real Example:

If user clicks Login Button:

View → Button click in UI
Controller → Receives click event
Model → Checks username/password
View → Shows success or error message

If you want, I can also give JavaScript MVC Example with code (easy Amazon project style).
