# 22-6-2025

1. Grades, Task B - 80%
2. Project 2 - 90%

3. Pull request, How to submit project?

-

4. Recap - last lesson react, useState, routing.
5. routing + examples + new features.

## Cars Project

1. add new route, Register Route.
2. Crete form, userName, password, firstName and LastName
3. make input validation for userName and password - mandatory
4. submitting the form will navigate to login
5. navigate to register should be from the login page

6. convert the Registration form to use `useRef`
7. clone the reposiroty, run `npm install` inside nodejs.api and run `npm start`

8. implement login with the new api
   /login POST {userName:"bla", password:"blabla"}
   if the login succeeded navigate to home page.

# 25-6-2025

1. use /cars GET request to recieve cars to the Cars routing page on page loading
2. implement sales filters

```html
<button>This Month Sales</button> <button>All Sales</button>
```

# 29-6-2025

## Ex-1

1. In Cars Page
2. Show in piechart the types and number of cars for each type - https://recharts.org/en-US
   Electric - 2, Sedan - 1 , Crossover - 1
3. use useMemo to memoize this calculation

## Ex-2

1. Apply useCallback in registration page - `registerAction`

## Ex-3

1. Support New Route - Add new car.
2. Support the form inputs, name, type, price, image
3. support button - add new car
4. when clicking the button - make post request to the following API: POST /cars { name, type, price, image }
5. move to cars page to make sure the additional car added successfully

# 2-7-2025

1. explore the new page - cart + header + product lists
2. create context provider which add every product into the cart
3. the cart number of products will get update using the context

# Homework - 4/7/2025

1. Create new react applicaiton
2. with the following routes: Flights
3. Flights - use the Gov IL data api to show information
   https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=5
4. Train schedule - use the GOV IL data api
   https://data.gov.il/api/3/action/datastore_search?resource_id=1ebbbb91-1d44-4f41-a85c-4a93a35e32d6&limit=5

5. support pagination in each page, show the first 5 items and then give the option to show more, +5 each request ( maximum 50)

Good luck

# 06-07-2025

1. Support showing all the hidden columns - clear the hidden column state
2. Support cleaning the LS as well

3. Support new button for pagination only with Limit without offset


# Homework 06-07-2025
1. Add the following route - Search Car, add input for LP and search car with the query api from Gov.il data
https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5&q=5625265
2. add the result details in a card
3. add new route - אנטנות סלולריות פעילות
4. the new route should contain Charts - 1 pie char t that shows for each city the number of antenna 
for example tel-aviv - 1000 , haifa- 2400 etc..
5. the second chart will show the companies and thier number of antenna for example
celcom-200 partner-100 etc..
6. add filter that shows the data according to the number of result (100,200,300)






# 9/7/2025
1. support update model script for Cars
2. consider using param OR updating all the models together


3. Support DDL with values: 10 | 20 | 30 | 40 | 50 result to limit the number of items from the api 
4. Support new report Factories per Machuz 


# 13/7 
1. support lazy loading in all of your routes - component level route only

2. create a "HeavyPage" route, that should load 2 components, 
<HeavyCalender></HeavyCalender>
and
<HeavyChart></HeavyChart>
try to support loading both components in suspense


# 16/7
1. support get user details in your application 
2. use the API: http://localhost:2200/user-details
3. create slice - usersSlice 
4. create asyncThunk - action creator
5. get the user details from the server
6. store the response in the store
7. try to support the permissions in the cars - add to favorites

8. Run Api - navigate to nodejs.api folder & run 
`npm install`
`node index.js`