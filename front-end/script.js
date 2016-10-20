//Objects to hold functions and event handlers
myEvents = {};
myVars = {};

//Empty Arrays to hold values from ajax request
myVars.userPack = [];
myVars.cpuPackOne = [];
myVars.cpuPackTwo = [];
myVars.cpuPackThree = [];
myVars.userPicks = [];

//Counter to traverse through different boosters to display
myVars.boosterIndex = 1;

//Functions to remove selected cards + random card
myVars.removeCard = function(object, list){
    for (i = 0; i < list.length; i++){
        if (list[i] == object) {
            list.splice(i, 1);
        }
    }
}
myVars.randomArrayIndex = function(arr){
    return Math.floor(Math.random() * arr.length);
} //needs fixing*******
myVars.removeRandom = function(arr) {
    arr.splice(myVars.randomArrayIndex(arr), 1);
}

//Functions to display next set of cards
myVars.displayPackOne = function(array){
    for (i = 0; i < array.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-one" src=' + array[i] + '></li>');
    }
}
myVars.displayPackTwo = function(){
    for (i = 0; i < myVars.cpuPackOne.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-two" src=' + myVars.cpuPackOne[i] + '></li>');
    }
}
myVars.displayPackThree = function(){
    for (i = 0; i < myVars.cpuPackTwo.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-three" src=' + myVars.cpuPackTwo[i] + '></li>');
    }
}
myVars.displayPackFour = function(){
    for (i = 0; i < myVars.cpuPackThree.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-four" src=' + myVars.cpuPackThree[i] + '></li>');
    }
}

//Functions to store selected booster value in elements
myEvents.boosterOneClick = function(){
    $('button#button-1').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected p').text()
        $('#confirm-1').html(boosterName);
    })
}
myEvents.boosterTwoClick = function(){
    $('button#button-2').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected p').text()
        $('#confirm-2').html(boosterName);
    })
}
myEvents.boosterThreeClick = function(){
    $('button#button-3').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected p').text()
        $('#confirm-3').html(boosterName);
    })
}

//Ajax requests to generate four random boosters
myEvents.getPack = function(){
    $.ajax({
        url: 'http://localhost:3000/generate/zendikar/booster',
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.userPack.push(cardImage);
        })
    })
}
myEvents.getPackCpuOne = function(){
    $.ajax({
        url: 'http://localhost:3000/generate/zendikar/booster',
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackOne.push(cardImage);
        })
    })
};
myEvents.getPackCpuTwo = function(){
    $.ajax({
        url: 'http://localhost:3000/generate/zendikar/booster',
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackTwo.push(cardImage);
        })
    })
};
myEvents.getPackCpuThree = function(){
    $.ajax({
        url: 'http://localhost:3000/generate/zendikar/booster',
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackThree.push(cardImage);
        })
    })
};

//Function that handles all events that happen on card select
myEvents.selectCard = function(){
    $('.card-container').on('click', 'li img', function() {
        var imagePath = $(this).attr('src');
        if ($('.card-container li img').hasClass('belong-booster-one') == true) {
            myVars.userPicks.push(imagePath);
            console.log(myVars.userPack.length);
            myVars.removeCard(imagePath, myVars.userPack);
            console.log(myVars.userPack.length);
            myVars.removeRandom(myVars.cpuPackOne);
            myVars.removeRandom(myVars.cpuPackTwo);
            myVars.removeRandom(myVars.cpuPackThree);
        } else if ($('.card-container li img').hasClass('belong-booster-two') == true) {
            myVars.userPicks.push(imagePath);
            console.log(myVars.cpuPackOne.length);
            myVars.removeCard(imagePath, myVars.cpuPackOne);
            console.log(myVars.cpuPackOne.length);
            myVars.removeRandom(myVars.userPack);
            myVars.removeRandom(myVars.cpuPackTwo);
            myVars.removeRandom(myVars.cpuPackThree);
        } else if ($('.card-container li img').hasClass('belong-booster-three') == true) {
            myVars.userPicks.push(imagePath);
            console.log(myVars.cpuPackTwo.length);
            myVars.removeCard(imagePath, myVars.cpuPackTwo);
            console.log(myVars.cpuPackTwo.length);
            myVars.removeRandom(myVars.cpuPackOne);
            myVars.removeRandom(myVars.userPack);
            myVars.removeRandom(myVars.cpuPackThree);
        } else if ($('.card-container li img').hasClass('belong-booster-four') == true) {
            myVars.userPicks.push(imagePath);
            console.log(myVars.cpuPackThree.length);
            myVars.removeCard(imagePath, myVars.cpuPackThree);
            console.log(myVars.cpuPackThree.length);
            myVars.removeRandom(myVars.cpuPackOne);
            myVars.removeRandom(myVars.cpuPackTwo);
            myVars.removeRandom(myVars.userPack);
        }

        $('.card-container').empty();
        if (myVars.boosterIndex == 1) {
            myVars.displayPackTwo();
            myVars.boosterIndex += 1;
        } else if (myVars.boosterIndex == 2) {
            myVars.displayPackThree();
            myVars.boosterIndex += 1;
        } else if (myVars.boosterIndex == 3) {
            myVars.displayPackFour();
            myVars.boosterIndex += 1;
        } else {
            myVars.displayPackOne(myVars.userPack);
            myVars.boosterIndex = 1;
        }
    })
};

//Function that initiates the draft, displays booster pack one
myEvents.startDraft = function(){
    $('.start-draft').on('click', function(){
        myVars.displayPackOne(myVars.userPack);
        console.log(myVars.userPack.length);
        console.log(myVars.cpuPackOne.length);
        console.log(myVars.cpuPackTwo.length);
        console.log(myVars.cpuPackThree.length);
    })
}

//On Page Load, do these things..
$(function(){
    myEvents.boosterOneClick();
    myEvents.boosterTwoClick();
    myEvents.boosterThreeClick();
    myEvents.getPack();
    myEvents.getPackCpuOne();
    myEvents.getPackCpuTwo();
    myEvents.getPackCpuThree();
    myEvents.selectCard();
    myEvents.startDraft();
});

