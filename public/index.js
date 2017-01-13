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

function setPrice_and_Commission(cars, rentals){
	for(var i=0; i<rentals.length;++i){
		var carOfRental = getCarById(cars, rentals[i].carId);
		var PickDate =  new Date(rentals[i].pickupDate);
		var ReturnDate = new Date(rentals[i].returnDate);
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
		var Distance = rentals[i].distance * carOfRental.pricePerKm;
		
		rentals[i].price = Time + Distance;
		
		//exercise 3 --start
		var commission = rentals[i].price*0.3;
		rentals[i].commission.assistance = nbDays;
		rentals[i].commission.insurance = commission*0.5;
		rentals[i].commission.drivy = commission - rentals[i].commission.assistance - rentals[i].commission.insurance;
		//exercise 3 --end
		
		//exercise 4 --start
		if(rentals[i].options.deductibleReduction){
			var AmountDeductible = (nbDays*4);
			rentals[i].price += AmountDeductible;
		}
		//exercise 4 --end
	}
}

function getCarById(cars, Id){
	for( var c in cars){
		if(cars[c].id == Id){
			return cars[c];
		}
	}
	return;
}

console.log(cars);
console.log(rentals);

setPrice_and_Commission(cars,rentals);

console.log(rentals);

console.log(actors);
console.log(rentalModifications);

