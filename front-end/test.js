// myListofBeers = ['beer1', 'beer2', 'beer3', 'beer4', 'beer5'];
//
// var beerCounter = 0
//
// var STARTbutton = function(){
//     console.log(myListofBeers[beerCounter] + ' is being displayed');
//     // console.log(beerCounter);
// }
//
// var NEXTbutton = function(){
//     beerCounter = beerCounter + 1;
//     console.log(myListofBeers[beerCounter] + ' is being displayed');
//     // console.log(beerCounter);
// }
//
// STARTbutton();
// NEXTbutton();

var price = 108123;

var decimalprice = (price/100).toFixed(2);

var finalprice = `\$${decimalprice}`
var finalpriceWITHOUTtemplate = '$' + decimalprice

console.log(decimalprice);
console.log(finalprice);
console.log(finalpriceWITHOUTtemplate);







// beerCounter += 1;