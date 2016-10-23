//Objects to hold functions and event handlers
myEvents = {};
myVars = {};

//Empty Arrays to hold values from ajax request
myVars.userPack = [];
myVars.cpuPackOne = [];
myVars.cpuPackTwo = [];
myVars.cpuPackThree = [];
myVars.BoosterTwoPackOne = [];
myVars.BoosterTwoPackTwo = [];
myVars.BoosterTwoPackThree = [];
myVars.BoosterTwoPackFour = [];
myVars.BoosterThreePackOne = [];
myVars.BoosterThreePackTwo = [];
myVars.BoosterThreePackThree = [];
myVars.BoosterThreePackFour = [];
myVars.userPicks = [];

//Counter to traverse through different boosters to display
myVars.boosterIndex = 1;
myVars.confirmCounter = 0;

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
myVars.displayPackTwo = function(array){
    for (i = 0; i < array.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-two" src=' + array[i] + '></li>');
    }
}
myVars.displayPackThree = function(array){
    for (i = 0; i < array.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-three" src=' + array[i] + '></li>');
    }
}
myVars.displayPackFour = function(array){
    for (i = 0; i < array.length; i++) {
        $('.card-container').append('<li><img class="belong-booster-four" src=' + array[i] + '></li>');
    }
}
myVars.delayStart = function(){
    myVars.displayPackOne(myVars.userPack);
}

//Functions to store selected booster value in elements
myEvents.boosterOneClick = function(){
    $('button#button-1').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected .set-title').text()
        $('#confirm-1').html(boosterName);
    })
    $('button#button-1').one('click', function(){
        myVars.confirmCounter += 1;
        if (myVars.confirmCounter > 2) {
            $('.set-button img').css('animation', 'bounce 1.5s infinite').css('opacity', '1');
            $('.start-draft').css('pointer-events', 'auto').css('opacity', '1');
            $('.error-message').css('display', 'none');
        }
    })
}
myEvents.boosterTwoClick = function(){
    $('button#button-2').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected .set-title').text()
        $('#confirm-2').html(boosterName);
    })
    $('button#button-2').one('click', function(){
        myVars.confirmCounter += 1;
        if (myVars.confirmCounter > 2) {
            $('.set-button img').css('animation', 'bounce 1.5s infinite').css('opacity', '1');
            $('.start-draft').css('pointer-events', 'auto').css('opacity', '1');
            $('.error-message').css('display', 'none');
        }
    })
}
myEvents.boosterThreeClick = function(){
    $('button#button-3').on('click', function(){
        var boosterName = $('.carousel-cell.is-selected .set-title').text()
        $('#confirm-3').html(boosterName);
    })
    $('button#button-3').one('click', function(){
        myVars.confirmCounter += 1;
        if (myVars.confirmCounter > 2) {
            $('.set-button img').css('animation', 'bounce 1.5s infinite').css('opacity', '1');
            $('.start-draft').css('pointer-events', 'auto').css('opacity', '1');
            $('.error-message').css('display', 'none');
        }
    })
}

//Ajax requests to generate four random boosters
myEvents.getPack = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.userPack.push(cardImage);
        })
    })
}
myEvents.getPackCpuOne = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackOne.push(cardImage);
        })
    })
};
myEvents.getPackCpuTwo = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackTwo.push(cardImage);
        })
    })
};
myEvents.getPackCpuThree = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.cpuPackThree.push(cardImage);
        })
    })
};
myEvents.getBoosterTwoPackOne = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterTwoPackOne.push(cardImage);
        })
    })
}
myEvents.getBoosterTwoPackTwo = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterTwoPackTwo.push(cardImage);
        })
    })
}
myEvents.getBoosterTwoPackThree = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterTwoPackThree.push(cardImage);
        })
    })
}
myEvents.getBoosterTwoPackFour = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterTwoPackFour.push(cardImage);
        })
    })
}
myEvents.getBoosterThreePackOne = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterThreePackOne.push(cardImage);
        })
    })
}
myEvents.getBoosterThreePackTwo = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterThreePackTwo.push(cardImage);
        })
    })
}
myEvents.getBoosterThreePackThree = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterThreePackThree.push(cardImage);
        })
    })
}
myEvents.getBoosterThreePackFour = function(set){
    $.ajax({
        url: `http://localhost:3000/generate/${set}/booster`,
        method: 'GET',
        dataType: 'json'
    }).then(function(cards){
        cards.forEach(function(index){
            var cardImage = index.imageUrl;
            myVars.BoosterThreePackFour.push(cardImage);
        })
    })
}
//Function that handles all events that happen on card select
myEvents.selectCard = function(){
    $('.card-container').on('click', 'li img', function() {
        var imagePath = $(this).attr('src');
        if (myVars.userPicks.length < 15) {
            if ($('.card-container li img').hasClass('belong-booster-one') == true) {
                myVars.userPicks.push(imagePath);
                myVars.removeCard(imagePath, myVars.userPack);
                myVars.removeRandom(myVars.cpuPackOne);
                myVars.removeRandom(myVars.cpuPackTwo);
                myVars.removeRandom(myVars.cpuPackThree);
            } else if ($('.card-container li img').hasClass('belong-booster-two') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.cpuPackOne.length);
                myVars.removeCard(imagePath, myVars.cpuPackOne);
                // console.log(myVars.cpuPackOne.length);
                myVars.removeRandom(myVars.userPack);
                myVars.removeRandom(myVars.cpuPackTwo);
                myVars.removeRandom(myVars.cpuPackThree);
            } else if ($('.card-container li img').hasClass('belong-booster-three') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.cpuPackTwo.length);
                myVars.removeCard(imagePath, myVars.cpuPackTwo);
                // console.log(myVars.cpuPackTwo.length);
                myVars.removeRandom(myVars.cpuPackOne);
                myVars.removeRandom(myVars.userPack);
                myVars.removeRandom(myVars.cpuPackThree);
            } else if ($('.card-container li img').hasClass('belong-booster-four') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.cpuPackThree.length);
                myVars.removeCard(imagePath, myVars.cpuPackThree);
                // console.log(myVars.cpuPackThree.length);
                myVars.removeRandom(myVars.cpuPackOne);
                myVars.removeRandom(myVars.cpuPackTwo);
                myVars.removeRandom(myVars.userPack);
            }
            //display new cards
            $('.card-container').empty();
            if (myVars.boosterIndex == 1) {
                myVars.displayPackTwo(myVars.cpuPackOne);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 2) {
                myVars.displayPackThree(myVars.cpuPackTwo);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 3) {
                myVars.displayPackFour(myVars.cpuPackThree);
                myVars.boosterIndex += 1;
            } else {
                myVars.displayPackOne(myVars.userPack);
                myVars.boosterIndex = 1;
            }
        } else if (myVars.userPicks.length < 30) {
            if ($('.card-container li img').hasClass('belong-booster-one') == true) {
                console.log('This is coming from booster Two');
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackOne.length);
                myVars.removeCard(imagePath, myVars.BoosterTwoPackOne);
                // console.log(myVars.BoosterTwoPackOne.length);
                myVars.removeRandom(myVars.BoosterTwoPackTwo);
                myVars.removeRandom(myVars.BoosterTwoPackThree);
                myVars.removeRandom(myVars.BoosterTwoPackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-two') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackTwo.length);
                myVars.removeCard(imagePath, myVars.BoosterTwoPackTwo);
                // console.log(myVars.BoosterTwoPackTwo.length);
                myVars.removeRandom(myVars.BoosterTwoPackOne);
                myVars.removeRandom(myVars.BoosterTwoPackThree);
                myVars.removeRandom(myVars.BoosterTwoPackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-three') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackThree.length);
                myVars.removeCard(imagePath, myVars.BoosterTwoPackThree);
                // console.log(myVars.BoosterTwoPackThree.length);
                myVars.removeRandom(myVars.BoosterTwoPackTwo);
                myVars.removeRandom(myVars.BoosterTwoPackOne);
                myVars.removeRandom(myVars.BoosterTwoPackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-four') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackFour.length);
                myVars.removeCard(imagePath, myVars.BoosterTwoPackFour);
                // console.log(myVars.BoosterTwoPackFour.length);
                myVars.removeRandom(myVars.BoosterTwoPackTwo);
                myVars.removeRandom(myVars.BoosterTwoPackThree);
                myVars.removeRandom(myVars.BoosterTwoPackOne);
            }
            //display new cards
            $('.card-container').empty();
            if (myVars.boosterIndex == 1) {
                myVars.displayPackTwo(myVars.BoosterTwoPackTwo);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 2) {
                myVars.displayPackThree(myVars.BoosterTwoPackThree);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 3) {
                myVars.displayPackFour(myVars.BoosterTwoPackFour);
                myVars.boosterIndex += 1;
            } else {
                myVars.displayPackOne(myVars.BoosterTwoPackOne);
                myVars.boosterIndex = 1;
            }
        } else {
            if ($('.card-container li img').hasClass('belong-booster-one') == true) {
                myVars.userPicks.push(imagePath);
                myVars.removeCard(imagePath, myVars.BoosterThreePackOne);
                myVars.removeRandom(myVars.BoosterThreePackTwo);
                myVars.removeRandom(myVars.BoosterThreePackThree);
                myVars.removeRandom(myVars.BoosterThreePackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-two') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackTwo.length);
                myVars.removeCard(imagePath, myVars.BoosterThreePackTwo);
                // console.log(myVars.BoosterTwoPackTwo.length);
                myVars.removeRandom(myVars.BoosterThreePackOne);
                myVars.removeRandom(myVars.BoosterThreePackThree);
                myVars.removeRandom(myVars.BoosterThreePackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-three') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackThree.length);
                myVars.removeCard(imagePath, myVars.BoosterThreePackThree);
                // console.log(myVars.BoosterTwoPackThree.length);
                myVars.removeRandom(myVars.BoosterThreePackTwo);
                myVars.removeRandom(myVars.BoosterThreePackOne);
                myVars.removeRandom(myVars.BoosterThreePackFour);
            } else if ($('.card-container li img').hasClass('belong-booster-four') == true) {
                myVars.userPicks.push(imagePath);
                // console.log(myVars.BoosterTwoPackFour.length);
                myVars.removeCard(imagePath, myVars.BoosterThreePackFour);
                // console.log(myVars.BoosterTwoPackFour.length);
                myVars.removeRandom(myVars.BoosterThreePackTwo);
                myVars.removeRandom(myVars.BoosterThreePackThree);
                myVars.removeRandom(myVars.BoosterThreePackOne);
            }
            //display new cards
            $('.card-container').empty();
            if (myVars.boosterIndex == 1) {
                myVars.displayPackTwo(myVars.BoosterThreePackTwo);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 2) {
                myVars.displayPackThree(myVars.BoosterThreePackThree);
                myVars.boosterIndex += 1;
            } else if (myVars.boosterIndex == 3) {
                myVars.displayPackFour(myVars.BoosterThreePackFour);
                myVars.boosterIndex += 1;
            } else {
                myVars.displayPackOne(myVars.BoosterThreePackOne);
                myVars.boosterIndex = 1;
            }
        }
        console.log(myVars.userPicks.length);
        if (myVars.userPicks.length == 15) {
            console.log('hello');
            $('.booster-two-overlay').addClass('booster-overlay-fix');
            for (i = 0; i < myVars.userPicks.length; i++) {
                var $cellsToAdd = $('<div class="carousel-cell"><img src=' + myVars.userPicks[i] + '></div>')
                $('.user-picks-carousel').flickity('append', $cellsToAdd);
            }
            $('.user-picks-carousel').flickity('remove', $('#cellRemove'));
        }
        if (myVars.userPicks.length == 30) {
            $('.booster-three-overlay').addClass('booster-overlay-fix');
            for (i = 15; i < myVars.userPicks.length; i++) {
                var $cellsToAdd = $('<div class="carousel-cell"><img src=' + myVars.userPicks[i] + '></div>')
                $('.user-picks-carousel').flickity('append', $cellsToAdd);
            }
        }
        if (myVars.userPicks.length == 45) {
            for (i = 30; i < myVars.userPicks.length; i++) {
                var $cellsToAdd = $('<div class="carousel-cell"><img src=' + myVars.userPicks[i] + '></div>')
                $('.user-picks-carousel').flickity('append', $cellsToAdd);
            }
            $('.final-overlay').addClass('booster-overlay-fix');
        }
    })
};

//Function that initiates the draft, displays booster pack one
myEvents.startDraft = function(){
    $('.start-draft').on('click', function(){
        var boosterNameOne = $('#confirm-1').text().replace(/\s/g, '');
        var boosterNameTwo = $('#confirm-2').text().replace(/\s/g, '');
        var boosterNameThree = $('#confirm-3').text().replace(/\s/g, '');
        myEvents.getPack(boosterNameOne);
        myEvents.getPackCpuOne(boosterNameOne);
        myEvents.getPackCpuTwo(boosterNameOne);
        myEvents.getPackCpuThree(boosterNameOne);
        myEvents.getBoosterTwoPackOne(boosterNameTwo);
        myEvents.getBoosterTwoPackTwo(boosterNameTwo);
        myEvents.getBoosterTwoPackThree(boosterNameTwo);
        myEvents.getBoosterTwoPackFour(boosterNameTwo);
        myEvents.getBoosterThreePackOne(boosterNameThree);
        myEvents.getBoosterThreePackTwo(boosterNameThree);
        myEvents.getBoosterThreePackThree(boosterNameThree);
        myEvents.getBoosterThreePackFour(boosterNameThree);
        $('.start-draft').css('opacity', '0').css('z-index', '-5');


        setTimeout(myVars.delayStart, 275);
    })
}
myEvents.startBoosterTwo = function(){
    $('.start-booster-two').on('click',function(){
        myVars.displayPackOne(myVars.BoosterTwoPackOne);
        myVars.boosterIndex = 1
        $('.booster-two-overlay').removeClass('booster-overlay-fix');

    })
}
myEvents.startBoosterThree = function(){
    $('.start-booster-three').on('click',function(){
        myVars.displayPackOne(myVars.BoosterThreePackOne);
        myVars.boosterIndex = 1
        $('.booster-three-overlay').removeClass('booster-overlay-fix');
    })
}
myEvents.check = function(){
    $('.check').on('click',function(){
        console.log('BoosterOnePackOne: ' + myVars.userPack.length);
        console.log('BoosterOnePackTwo: ' + myVars.cpuPackOne.length);
        console.log('BoosterOnePackThree: ' + myVars.cpuPackTwo.length);
        console.log('BoosterOnePackFour: ' + myVars.cpuPackThree.length);
        console.log('BoosterTwoPackOne: ' + myVars.BoosterTwoPackOne.length);
        console.log('BoosterTwoPackTwo: ' + myVars.BoosterTwoPackTwo.length);
        console.log('BoosterTwoPackThree: ' + myVars.BoosterTwoPackThree.length);
        console.log('BoosterTwoPackFour: ' + myVars.BoosterTwoPackFour.length);
        console.log('BoosterThreePackOne: ' + myVars.BoosterThreePackOne.length);
        console.log('BoosterThreePackTwo: ' + myVars.BoosterThreePackTwo.length);
        console.log('BoosterThreePackThree: ' + myVars.BoosterThreePackThree.length);
        console.log('BoosterThreePackFour: ' + myVars.BoosterThreePackFour.length);
        console.log('UserPicks: ' + myVars.userPicks.length);
    })
}
myEvents.viewPicks = function(){
    $('.view-picks').on('click', function(){
        $('.user-picks-overlay').addClass('user-picks-fix');
        $('.card-selection-header').css('opacity', '0');
    });
    $('.close-picks').on('click', function(){
        $('.user-picks-overlay').removeClass('user-picks-fix');
        $('.card-selection-header').css('opacity', '1');
    });
}

//some click events
myEvents.clickSet = function(){
    $('.carousel-filter p').on('click', function(){
        $('.set-modal').addClass('set-modal-clicked');
        $('.carousel-filter p').css('opacity', '0');
        $('.flickity-prev-next-button').css('opacity', '0');
    })
    $('.set-modal-exit').on('click', function(){
        $('.set-modal').removeClass('set-modal-clicked');
        $('.carousel-filter p').css('opacity', '1');
        $('.flickity-prev-next-button').css('opacity', '1');
    })
}
myEvents.smoothScroll = function(){
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

//On Page Load, do these things..
$(function(){
    myEvents.boosterOneClick();
    myEvents.boosterTwoClick();
    myEvents.boosterThreeClick();
    myEvents.selectCard();
    myEvents.startDraft();
    myEvents.startBoosterTwo();
    myEvents.startBoosterThree();
    myEvents.check();
    myEvents.clickSet();
    myEvents.smoothScroll();
    myEvents.viewPicks();
    // myEvents.boosterTwoShow();
});

//add nav bar with pack1/pick1
