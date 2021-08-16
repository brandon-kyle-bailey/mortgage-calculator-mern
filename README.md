# Mortgage Calculator Api & Frontend

## Getting started:

- Install dependencies
  - ```cd mortgage-calculator-mern && npm install && cd client && npm install``` 
- Run application
  - ```cd mortgage-calculator-mern && npm run dev```
- Just run the API
  - ```cd mortgage-calculator-mern && npm run dev-server```
- Run Unit Tests
  - ```cd mortgage-calculator-mern && npm run test```

## API format

This API has a single endpoint:
```/api/v1/calculate/:propertyPrice/:downPayment/:interest/:amortPeriod/:schedule```

that, will all data provided, will serve a JSON object with the following structure:
```
"message": [
    {
        "schedule":0,
        "starting_balance":90000,
        "interest":375,
        "principle":108.13946071092585,
        "ending_balance":89891.86053928907
    },
    ...
]
```

## Frontend

There is a frontend to this application. Consisting of a form component and a data
visualization component by way of a line graph.