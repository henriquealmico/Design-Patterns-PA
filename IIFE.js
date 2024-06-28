
/////////////////////////////////// Before IIFE ///////////////////////////////////

/*
var users = [
    { name: "Maria Clara", weight: 68, height: 1.65 },
    { name: "Jorge", weight: 85, height: 1.75 },
    { name: "Marcelo", weight: 54, height: 1.60 }
];

function calculateIMC(weight, height) {
    return weight / (height * height);
}

function displayUserIMC(users) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var IMC = calculateIMC(user.weight, user.height);
        console.log("IMC - " + user.name + ":" + IMC.toFixed(2));
    }
}

displayUserIMC(users);
*/

/////////////////////////////////// After IIFE ///////////////////////////////////

var IMCApp = (function() {
    var users = [
        { name: "Maria Clara", weight: 68, height: 1.65 },
        { name: "Jorge", weight: 85, height: 1.75 },
        { name: "Marcelo", weight: 54, height: 1.60 }
    ];

    function calculateIMC(weight, height) {
        return weight / (height * height);
    }

    function displayUserIMC() {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var IMC = calculateIMC(user.weight, user.height);
            console.log("IMC - " + user.name + ": " + IMC.toFixed(2));
        }
    }

    return {
        displayIMC: displayUserIMC
    };
})();

IMCApp.displayIMC();
