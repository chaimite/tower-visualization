# IGS Front-end Engineer Tech Test

One of the core functions of the IGS software is to automate the growing of plants. The growing process happens in what we call a **Tower**.

An IGS Tower has a number of **Slots** in which **Growth Trays** can be placed. Once a **Growth Tray** is in position, an operator can schedule a **Growth Job** in it.

A **Growth Job** is what automates the growing of plants by sending instructions for when plants should be watered and when they should be lit by LED lights.

The back-end system handles what **Growth Tray** is in what **Slot** and what **Growth Job** is running in what **Growth Tray**.

## Back-end System Simulation

The `tower.service.ts` class simulates the workings of the back-end system and exposing an ever changing stream of data through an observable called `towerData$`.

The observable will give you an array of 2 towers that have some **Growth Jobs** running in them. Every second the progress of each **Growth Job** will update. Once each **Growth Job** is finished a new **Growth Job** simulation will start. This is meant to mimic an operator scheduling new **Growth Jobs** once the old ones are done.

An very basic example of a **Tower** with just a single **Slot** would look like this

```json
{
  "number": 1,
  "slots": [
    {
      "number": 1,
      "growthTray": {
        "identifier": "GT A1",
        "growthJob": {
          "name": "Basil",
          "progressPercentage": 80,
        }
      }
    },
  ]
}
```

## Objective

### Visualisation

Develop a solution that visualises each **Tower** with its associated **Slots**, **Growth Trays** and **Growth Job** progress.

Your solution should reflect the constant progress of the **Growth Jobs**.

### Switching Between Towers

Having multiple towers displayed on the same screen makes it difficult for operators to manage their work. Only 1 tower should be displayed at a time with the ability to switch between them.

## Requirements

- Solution should be done using the latest version of Angular
- The solution should be accompanied by a README file containing your thought process, any shortcuts you've taken and why, assumptions that had to be made as well as how you would evolve your solution to make it ready for a production environment.
- The solution should be delivered as a git repository with instructions for how to run it.

## Guidelines

- You can either extend the provided Angular workspace or copy the simulation classes into your own project if you prefer a different setup
- Technologies we would like to see used  
  - monorepo (Nx/Lerna)
  - State Management (RxJS/Redux)
  - Micro frontend and module federation
- Don't worry too much about presentation, we would like to see well written functioning code

## Bonus Points

- Unit, component and/or e2e tests
- linting
- containerised solution
