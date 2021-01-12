"use strict";
/**
 * Set up the players (a team of four: Care Home; Pharmacy; Wholesaler; Manufacturer)
 * The class methods contain the game mechanics
 */
class Player {
    constructor(name) {
        this.name = name;
        this.LeftOver = 12;         // Units left over from last week (A1)
        this.NewlyArrived = 4;      // Units arrived this week (A2)
        this.TotalStock = 0;        // Placeholder variable for A1 + A2 (A)
        this.OnTheWay = 4;          // Units to arrive next week (B)
        this.Owing = 4;             // Units yet to be supplied against last week's order (C1)
        this.NewOrder = 4;          // Units ordered this week (C2)
        this.TotalOrder = 0;        // Placeholder variable for C1 + C2 (C)
        this.ToOrder = 0;           // Number of units to request this week (D)
    }
    thisWeek(_WeekNumber) {
        var Report = "";
        Report = Report + "This week:\r\n"; 
        Report = Report  + "\r\n";
        Report = Report + "Your stock level was " + this.TotalStock + " units.\r\n";
        Report = Report + "You have been asked to supply " + this.TotalOrder + " units.\r\n";
        if ((this.TotalStock - this.TotalOrder) > 0) {
            Report = Report + "This leaves you with " + (this.TotalStock - this.TotalOrder) + " units.\r\n";
        }
        else if ((this.TotalStock - this.TotalOrder) == 0) {
            Report = Report + "This leaves you out of stock.\r\n";
        }
        else
        {
            Report = Report + "This leave you out of stock and owing " + this.Owing + " units.\r\n";
        }                    
        Report = Report + "You have a new request to supply " + this.NewOrder + " units next week.\r\n";
        Report = Report + "And " + this.NewStock + " units of stock already on order.\r\n";
        this.ToOrder = -1       // To trigger one of the while loops that follows
        if (_WeekNumber <= 4)
        {
            while (this.ToOrder != 4) {
                Report = Report + "\r\nWe recommend that you order 4 more units this week.";
                Report = Report + "\r\nHow many more units do you wish to order now?";
                this.ToOrder = prompt(Report);
            }
        }
        else if (_WeekNumber = 5)
        {
            while (this.ToOrder < 0) {
                Report = Report + "\r\nFrom now on, you may now order whatever number of units you think you need, as long as the value is zero or greater.";
                Report = Report + "\r\nHow many more units do you wish to order now?";
                this.ToOrder = prompt(Report);
            }            
        }            
        else if (_WeekNumber = 36)
        {
            Report = Report + "\r\nHowever, at this point you have reached the end of the game.  You may now like to compare your figures with those of your other team members.  Thanks for playing!";
        }

        else 
            while (this.ToOrder < 0) {
                Report = Report + "\r\nHow many more units do you wish to order now? (Please input a value that is 0 or greater)"
                this.ToOrder = prompt(Report);
            }
    }
}

class CareHome extends Player {}

class Pharmacy extends Player {}

class Wholesaler extends Player {}

class Manufacturer extends Player {}

class Team {
    constructor(name) {
        this.Name = name;
        this.Week = 0;                          // Week number
        this.CareHome = new(CareHome);
        this.Pharmacy = new(Pharmacy);
        this.Wholesaler = new(Wholesaler);
        this.Manufacturer = new(Manufacturer);
    }
    advanceStock() {
        CareHome.TotalStock = CareHome.LeftOver + CareHome.NewlyArrived;
        Pharmacy.TotalStock = Pharmacy.LeftOver + Pharmacy.NewlyArrived;
        Wholesaler.TotalStock = Wholesaler.LeftOver + Wholesaler.NewlyArrived;
        Manufacturer.TotalStock = Manufacturer.LeftOver + Manufacturer.NewlyArrived
        CareHome.NewlyArrived = CareHome.OnTheWay;
        Pharmacy.NewlyArrived = Pharmacy.OnTheWay;
        Wholesaler.NewlyArrived = Wholesaler.OnTheWay;
        Manufacturer.NewlyArrived = Manufacturer.OnTheWay;
    }
    fulfilOrders() {
        CareHome.TotalOrder = CareHome.Owing + CareHome.NewOrder;
        if (CareHome.TotalStock >= CareHome.TotalOrder) {
            CareHome.TotalStock = CareHome.TotalStock - CareHome.TotalOrder;
            CareHome.Owing = 0; }
        else {
            CareHome.Owing = Math.abs(CareHome.TotalStock - CareHome.TotalOrder);
            CareHome.TotalStock = 0; }
        Pharmacy.TotalOrder = Pharmacy.Owing + Pharmacy.NewOrder;
        if (Pharmacy.TotalStock >= Pharmacy.TotalOrder) {
            CareHome.OnTheWay = Pharmacy.TotalOrder;    
            Pharmacy.TotalStock = Pharmacy.TotalStock - Pharmacy.TotalOrder;
            Pharmacy.Owing = 0; }
        else {
            CareHome.OnTheWay = Pharmacy.TotalOrder - Pharmacy.TotalStock;
            Pharmacy.Owing = Math.abs(Pharmacy.TotalStock - Pharmacy.TotalOrder);
            Pharmacy.TotalStock = 0; }    
        Wholesaler.TotalOrder = Wholesaler.Owing + Wholesaler.NewOrder;
        if (Wholesaler.TotalStock >= Wholesaler.TotalOrder) {
            Pharmacy.OnTheWay = Wholesaler.TotalOrder;    
            Wholesaler.TotalStock = Wholesaler.TotalStock - Wholesaler.TotalOrder;
            Wholesaler.Owing = 0; }
        else {
            Pharmacy.OnTheWay = Wholesaler.TotalOrder - Wholesaler.TotalStock;
            Wholesaler.Owing = Math.abs(Wholesaler.TotalStock - Wholesaler.TotalOrder);
            Wholesaler.TotalStock = 0; }    
        Manufacturer.TotalOrder = Manufacturer.Owing + Manufacturer.NewOrder;
        if (Manufacturer.TotalStock >= Manufacturer.TotalOrder) {
            Wholesaler.OnTheWay = Manufacturer.TotalOrder;    
            Manufacturer.TotalStock = Manufacturer.TotalStock - Manufacturer.TotalOrder;
            Manufacturer.Owing = 0; }
        else {
            Wholesaler.OnTheWay = Manufacturer.TotalOrder - Manufacturer.TotalStock;
            Manufacturer.Owing = Math.abs(Manufacturer.TotalStock - Manufacturer.TotalOrder);
            Manufacturer.TotalStock = 0; }
    }    
    advanceOrders() {
        if (Team.Week < 4) {
            CareHome.NewOrder = 4;
        }
        else {
            CareHome.NewOrder = 8;
        }
        Pharmacy.NewOrder = CareHome.ToOrder;
        Wholesaler.NewOrder = Pharmacy.ToOrder;
        Manufacturer.NewOrder = Wholesaler.NewOrder;
    }
}


/* 
I'm not sure how to implement a "main" function in JS, so I've put the pseudocode for that function here until I work out what to do...
- Create 35(?) instances of "Team" object (each Player within a Team is to be operated remotely by one real-life player)
- For each Team, do the following while Team.Week < 36
    - advanceStock
    - fulfilOrders
    - CareHome.thisWeek(Team.Week)
    - Pharmacy.thisWeek(Team.Week)
    - Wholesaler.thisWeek(Team.Week)
    - Manufacturer.thisWeek(Team.Week)
    - advanceOrders
    - Team.Week = Team.Week + 1
*/