$(document).ready(function () {
    for (var i = 0; i < 11; i++) {
        $(".ack" + i).hide();
    }
    $("#start").click(function () {
        muovi1(function () {muovi2(muovi3)});
    });
    $(".frame3 button").click(function () { interrompiTrasferimento(0, 5, $(this).attr("id").replace("bottone", ""), function(){muovi2(muovi3)});});
    $(".frame4 button").click(function () { interrompiTrasferimento(5, 8, $(this).attr("id").replace("bottone", ""), muovi3); });
    $(".frame5 button").click(function () { interrompiTrasferimento(8, 10, $(this).attr("id").replace("bottone", ""),function(){});});
});

var velocita = 2000;
var nuovoPacchettoId;
var bool = [true, true, true, true, true, true, true, true];
var controllo = true;

function muovi1(callback) {
    muoviPacchetto(0, 5, function () {
        ackGiusto(0, 5, callback);
    });
}

function muovi2(callback) {
    muoviPacchetto(5, 8, function () { ackGiusto(5, 8, callback); });
}

function muovi3() {
    muoviPacchetto(8, 10, function () {});
    ackGiusto(8, 10,function(){});
}

function animatePacchetto(i, x, callback) {
    if (i < x) {
        console.log(i);
        $("#busta" + i).animate({ top: "400px" }, velocita, function () {
            $(".ack" + i).show();
            bool[i] = false;
            if (i == x - 1) callback();
        });
        $("#busta" + i).attr("src", "../immagini/ack.png");
        animatePacchetto(i + 1, x, callback);
    }
}

function animatePacchetto2(i, x, callback) {
    if (i < x) {
        $("#busta" + i).animate({ top: "11px" }, velocita,function(){$("#busta" + i).show();});
        
        console.log()
        $("#busta" + i).animate({ top: "400px" }, velocita, function () {
            $(".ack" + i).show();
            if (i == x - 1) callback();
        });
        $("#busta" + i).attr("src", "../immagini/ack.png");
        animatePacchetto2(i + 1, x, callback);
    }
}

function muoviPacchetto(i, x, callback) {
    animatePacchetto(i, x, callback);
}

function muoviPacchetto2(i, x, callback) {
    animatePacchetto2(i, x, callback)
}

function animateBusta(i, x, callback) {
    if (i < x) {
        $("#busta" + i).animate({ top: "11px" }, velocita, function () {
            if (i == x - 1 && controllo == true) callback();
        });
        animateBusta(i + 1, x, callback);
    }
}

function animateBusta2(i, x, callback) {
    if (i < x) {
        if (bool[i] == false) {
            console.log(bool);
            $("#busta" + i).attr("src", "../Immagini/nack.png");
            $("#busta" + i).show();
            setTimeout(function () {
                $("#busta" + i).hide();
            }, 1000);
            if (i == x - 1) callback();
            setTimeout(function () {
                animateBusta2(i + 1, x, callback);
            }, 1000);

        } else {
            $("#busta" + i).animate({ top: "11px" }, velocita, function () {
            });
            if (i == x - 1) callback();
            setTimeout(function () {
                animateBusta2(i + 1, x, callback);
            }, 1000);
        }
    }
}

function ackGiusto(i, x, callback) {
    animateBusta(i, x, callback);
}

function ackGiusto2(i, x, callback) {
    animateBusta2(i, x, callback);
}

function interrompiTrasferimento(i, x, pacchettoId, callback) {
    controllo = false;
    $("#busta" + pacchettoId).stop().hide();
    $("#bottone" + pacchettoId).hide();
    CominciaCountdown();
    setTimeout(function () {
        inviaNuovoPacchetto(i, x, callback);
    }, 5000);

}


function inviaNuovoPacchetto(i, x, callback) {
    muoviPacchetto2(i, x, function () { ackGiusto2(i, x, callback); });
    setTimeout(function () {
        $("#messaggio").hide(); // Nascondi il messaggio dopo un certo periodo di tempo
    }, 4500); // Nascondi dopo 5 secondi (come nel setTimeout all'interno di interrompiTrasferimento)
}



var countdownInterval; // Variabile per tenere traccia dell'intervallo

function CominciaCountdown() {
    var secondi = 4;
    var CD = $("#countdown");
    var messaggio = $("#messaggio");
    CD.show();

    // Cancella l'intervallo precedente se presente
    clearInterval(countdownInterval);

    function calcoloConto() {
        CD.text("Timer = " + secondi);
        if (secondi <= 0) {
            messaggio.show();
            CD.hide();
            clearInterval(countdownInterval); // Ferma il conto alla rovescia
        }
        secondi--;
    }
    countdownInterval = setInterval(calcoloConto, 1000);
}
