'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//EXERCISE 1

function setPrice_and_Commission(cars, rentals, rentalId = 0){
	if(rentalId == 0){
		for(var i=0; i<rentals.length;++i){
			setPriceRental(cars, rentals, rentals[i]);
		}
	} else {
		setPriceRental(cars, rentals, rentalId);
	}
}

function setPriceRental(cars, rentals, rentalId){
	var carOfRental = getCarById(cars, rentalId.carId);
	var PickDate =  new Date(rentalId.pickupDate);
	var ReturnDate = new Date(rentalId.returnDate);
	var nbDays = Math.ceil((ReturnDate - PickDate)/(1000*60*60*24)) + 1;
	
	var pricePerDay = carOfRental.pricePerDay;
	
	//exercise 2 -- start
	if(nbDays > 10){
		pricePerDay *= 0.5;
	} else if(nbDays >4){
		pricePerDay *= 0.7;	
	}else if(nbDays>1){
		pricePerDay *= 0.9;
	}
	//exercise 2 --end
	
	var Time = nbDays * pricePerDay;
	var Distance = rentalId.distance * carOfRental.pricePerKm;
	
	rentalId.price = Time + Distance;
	
	//exercise 3 --start
	var commission = rentalId.price*0.3;
	rentalId.commission.assistance = nbDays;
	rentalId.commission.insurance = commission*0.5;
	rentalId.commission.drivy = commission - rentalId.commission.assistance - rentalId.commission.insurance;
	//exercise 3 --end
	
	//exercise 4 --start
	if(rentalId.options.deductibleReduction){
		var AmountDeductible = (nbDays*4);
		rentalId.price += AmountDeductible;
	}
	//exercise 4 --end
}

function getCarById(cars, Id){
	for( var c in cars){
		if(cars[c].id == Id){
			return cars[c];
		}
	}
	return;
}

function getRentalById(rentals, Id){
	for( var r in rentals){
		if(rentals[r].id == Id){
			return rentals[r];
		}
	}
	return;
}

function getActorsById(actors, Id){
	for( var a in actors){
		if(actors[a].rentalId == Id){
			return actors[a];
		}
	}
	return;
}

//Exercise 5

function PayActors(actors, rentals, actorsId = 0){
	if(actorsId == 0){
		for(var i=0; i<actors.length;++i){
			PayActorsRental(actors, rentals, actors[i])
		}
	} else {
		PayActorsRental(actors, rentals, actorsId);
	}
	
}

function PayActorsRental(actors, rentals, actorsId){
	
	var ActualRental = getRentalById(rentals, actorsId.rentalId);
	
	var PickDate =  new Date(ActualRental.pickupDate);
	var ReturnDate = new Date(ActualRental.returnDate);
	var nbDays = Math.ceil((ReturnDate - PickDate)/(1000*60*60*24)) + 1;
	
	//Let's get the amount for each actor
	var PriceDriver = ActualRental.price;
	var PriceInsurance = ActualRental.commission.insurance;
	var PriceAssistance = ActualRental.commission.assistance;
	var PriceDrivy = ActualRental.commission.drivy;
	//Don't forget the deductive thing
	if(ActualRental.options.deductibleReduction){
		var AmountDeductible = (nbDays*4);
		PriceDrivy += AmountDeductible;
	}
	
	var PriceOwner = PriceDriver - (PriceAssistance+PriceDrivy+PriceInsurance);
	
	//Set up the amount
	for(var i=0; i<actorsId.payment.length;++i){
		switch(actorsId.payment[i].who){
			case "driver" :
				actorsId.payment[i].amount = PriceDriver;
			break;
			
			case "owner" :
				actorsId.payment[i].amount = PriceOwner;
			break;
			
			case "insurance" :
				actorsId.payment[i].amount = PriceInsurance;
			break;
			
			case "assistance" :
				actorsId.payment[i].amount = PriceAssistance;
			break;
			
			case "drivy" :
				actorsId.payment[i].amount = PriceDrivy;					
			break;
		}
	}
}

//End exercise 5

//Exercise 6
function ModifyAndUpdate(rentals, rentalModifications,actors){
	for(var i=0; i<rentalModifications.length;++i){
		var ActualRental = getRentalById(rentals,rentalModifications[i].rentalId);
		var ActualActors = getActorsById(actors,rentalModifications[i].rentalId);
		/*var Distance = ActualRental.Distance;
		var PickUp = ActualRental.pickupDate;
		var Return = ActualRental.returnDate;*/
		
		if(rentalModifications[i].pickupDate != null){
			ActualRental.pickupDate = rentalModifications[i].pickupDate;
		}
		
		if(rentalModifications[i].returnDate != null){
			ActualRental.returnDate = rentalModifications[i].returnDate;
		}
		
		if(rentalModifications[i].distance != null){
			ActualRental.distance = rentalModifications[i].distance;
		}
		
		setPrice_and_Commission(cars, rentals, ActualRental)
		PayActors(actors, rentals, ActualActors);
	}
}
//End exercise 6



setPrice_and_Commission(cars,rentals);
PayActors(actors, rentals);
ModifyAndUpdate(rentals, rentalModifications,actors);

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);