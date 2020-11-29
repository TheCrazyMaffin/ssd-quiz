'use strict';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

/*Player, dont you dare looking at this!
Yeah theres no keys, why do you want keys?
{
    'q': 'Question?',
    'a': ['answer', 'answer', 'answer', 'answer'],
    't': 'true answer', //Yes only one
    'c': 'Comment to show when answered'
}
*/
var randomNumber = -1;
var askedQuestions = [];
var correctCount = 0;
const questionsAndAnswers = [
    {
        'q': 'Wie lauten die fünf "W"s?' ,
        'a': ['Wo? Was? Wie? Welche? Warten!', 'Was? Wo? Wieso? Welche? Warten!', 'Wieso? Welche? Wo? Was? Warum?', 'Welche? Wo? Wann? Was? Warten!'],
        't': 'Wo? Was? Wie? Welche? Warten!',
        'c': 'Für den Disponent ist es am wichtigsten zu wissen <b>wo</b> etwas passiert ist.<br><b>Was</b> genau passiert ist und <b>wie</b> viele Verletzte es gibt kommt danach. Letztlich ist es ebenfalls wichtig zu wissen <b>welche</b> Verletzungen ein Patient hat. Am Ende des Gesprächs legt man nicht einfach auf sondern <b>wartet</b> auf Rückfragen. <br><br>Keine Angst wenn Du dir nicht alle "W"s merken kannst, der Disponent wird Dich danach fragen.'
    },
    {
        'q': 'Wie lautet die europäische Notrufnummer für den Rettungsdienst und die Feuerwehr?',
        'a': ['112', '110', '911', '19222'],
        't': '112',
        'c': 'Die 112 ist die europaweit gültige Notrufnummer für Feuerwehr und Rettungsdienst.<br>Die 110 wird von der Polizei verwendet, die 911 ist die Amerikanische Notrufnummer und 19222 ist für <abbr title="Für Fahrten nach Hause/zum Arzt/u.ä. wenn man nicht in Not ist aber nicht selber fahren kann.">Krankentransporte</abbr>.<br>Solltest Du aber doch mal die falsche Nummer anrufen ist das nicht schlimm, die Disponenten werden Dich immer zur richtigen Nummer weiterleiten.'
    },
    {
        'q': 'Was ist zu beachten, wenn man mit dem Handy einen Notruf absetzt?',
        'a': ['Der Notruf funktioniert ohne Guthaben und ist immer kostenlos.', 'Der Notruf kostet nur 10ct pro Minute.', 'Man muss eine 0 vorwählen.', 'Anrufe aus dem Festnetz haben Vorrang.'],
        't': 'Der Notruf funktioniert ohne Guthaben und ist immer kostenlos.',
        'c': 'Notrufe sind immer kostenlos (außer bei Scherzanrufen) und funktionieren in jedem Netz. Wenn Du einen Vertrag bei 1&1 hast kannst Du auch im Netz der Telekom einen Notruf tätigen.'
    },
    {
        'q': 'Die Rettungskette...',
        'a': ['gibt vor was man bei einem Unfall tun soll.', 'wird zum abschleppen von Autos verwendet.', 'hilft bei Knochenbrüchen.', 'wird zum Abseilen verwendet.'],
        't': 'gibt vor was man bei einem Unfall tun soll.',
        'c': 'Die Rettungskette für Ersthelfer lautet: Absicherung, <abbr title="Bspw.: Patient ansprechen, Vitalfunktionen prüfen">Sofortmaßnahmen</abbr>, Notruf, Erste Hilfe.<br>Die Eigensicherung geht <b>immer</b> vor. Tu nichts was Dich in Gefahr bringen könnte nur um dem Patient zu helfen.'
    },
    {
        'q': 'Was zählt NICHT zu den lebenswichtigen Vitalfunktionen?',
        'a': ['Gedächtniss', 'Atmung', 'Bewusstsein', 'Kreislauf'],
        't': 'Gedächtniss',
        'c': 'Atmung, Bewusstsein und Kreislauf sind Vitalfunktionen. Wenn diese nicht mehr funktionieren ist der Patient in Lebensgefahr und braucht dringend Hilfe.<br>Auch wenn das Gedächtniss sehr wichtig für uns im Alltag ist stellt ein Verlust in Extremsituationen keine Lebensbedrohung dar.'
    },
    {
        'q': 'Was tut man bei einer Verbrennung?',
        'a': ['Die Stelle unter kühles Wasser halten.', 'Sofort einen Verband umbinden.', 'Sofort den Notruf rufen und warten bis der Rettungsdienst eintrifft.', 'Möglichst nichts tun und die Stelle nicht berühren'],
        't': 'Die Stelle unter kühles Wasser halten.',
        'c': 'Eine Verbrennung sollte sofort gekühlt werden. Je nach Größe der Verbrennung nimmt man auch lauwarmes Wasser damit es dem Patient nicht zu kalt wird.<br>Sollte es eine größere Verbrennung sein empfiehlt es sich die Wunde <abbr title="sodass keine Krankheitserreger/Dreck oder Ähnliches in die Wunde gelangen kann">steril</abbr> abzudecken aber nicht zu verbinden.'
    },
    {
        'q': 'Was tut man wenn man als Erster an einem Unfallort ankommt?',
        'a': ['Absichern, dann sofort um die Patienten kümmern', 'Bilder machen um das Geschehen zu dokumentieren.', 'Sofort Feuerwehr, Rettungsdienst und Polizei alarmieren.', 'Weglaufen weil es dort gefährlich ist.'],
        't': 'Absichern, dann sofort um die Patienten kümmern',
        'c': 'Jeder hat die Pflicht Menschen die medizinische Hilfe benötigen so gut wie möglich Hilfe anzubieten. Auch wenn Du noch keine Erste Hilfe Ausbildung hast kannst Du mit dem Patient reden um ihn zu beruhigen oder um Informationen zu erfragen.'
    },
    {
        'q': 'Damit bewusstlose Patienten nicht ersticken legen wir sie in die...',
        'a': ['stabile Seitenlage', 'statische Seitenlage', 'sogenannte Bettposition', 'Mitte einer Bettdecke'],
        't': 'stabile Seitenlage',
        'c': 'Bewusstlose Personen sind nicht in der Lage ihre Atemwege freizuhalten. Das heißt Patienten können an ihrer Zunge oder Erbrochenem ersticken. Um das zu verhindern legen wir Patienten in die stabile Seitenlage'
    },
    {
        'q': 'Was muss man tun um Notarzt zu werden?',
        'a': ['Man muss eine ärztliche Ausbildung und eine Zusatzausbildung haben', '3 Jahre nach der Ausbildung zum Notfallsanitäter wird man zum Notarzt', 'Notärzte müssen ein Professor der Medizin sein', 'Um Notarzt zu werden muss man in jeder Abteilung des Rettungsdienstes mindestens einmal gewesen sein.'],
        't': 'Man muss eine ärztliche Ausbildung und eine Zusatzausbildung haben',
        'c': 'Der Notfallsanitäter ist die höchste Stufe der Weiterbildung die man nur im Rettungsdienst erwerben kann. Ein Notarzt hat zusätzlich zu seiner ärztlichen Ausbildung auch Zusatzausbildungen für die Notfallversorgung.'
    },
    {
        'q': 'Wie können wir einem Patienten mit Krampfanfall helfen?',
        'a': ['Sofort alle Gegenstände aus dem Umfeld entfernen', 'Den Patient festhalten', 'Nur den Kopf festhalten', 'Einen Gegenstand zwischen die Zähne schieben'],
        't': 'Sofort alle Gegenstände aus dem Umfeld entfernen',
        'c': 'Sollte ein Patient krampfen dürfen wir diesen auf keinen Fall festhalten, dadurch bringen wir uns und den Patient in Gefahr. Hier hilft nur Abwarten bis der Krampfanfall vorrüber ist und alle Gegenstände aus dem Umfeld zu entfernen an denen sich der Patient verletzten könnte.'
    },
    {
        'q': 'Welches Lied eignet sich nicht als Rhythmus für eine Herzdruckmassage?',
        'a': ['TNT - ACDC', 'Highway to Hell - ACDC', 'Atemlos - Helene Fischer', 'Stayin\' Alive - Bee Gees'],
        't': 'TNT - ACDC',
        'c': 'Alle Lieder sind nicht nur thematisch passend sondern eignen sich auch optimal um die Herzdruckmassage im richtigen Tempo durchzuführen'
    },
    {
        'q': 'Wie bediene ich einen Defibrillator?',
        'a': ['Jeder kann das Gerät benutzen, da es akustische Anweisungen gibt', 'Nur Rettungssannitäter dürfen einen AED bedienen', 'Nur Personen über 18 dürfen den AED bedienen', 'Für den AED gibt es eine Erste-Hilfe-Zusatzausbildung'],
        't': 'Jeder kann das Gerät benutzen, da es akustische Anweisungen gibt',
        'c': 'Ein AED ist so konzipiert, dass ihn jeder benutzen kann und das Laien nichts falsch machen können.'
    },
]

function randomize(){
    randomNumber = Math.floor(Math.random() * questionsAndAnswers.length);
}

function checkTargetAchieved(count = 10){
    if(askedQuestions.length >= count){
        return true
    }else{
        return false
    }
}

function loadRandomQuestion(){
    [...document.querySelectorAll("input")].filter(el => (el.checked)).forEach(function(el){
        el.checked = false;
    })
    randomize();
    while(askedQuestions.includes(randomNumber) && (askedQuestions.length < questionsAndAnswers.length)){
        randomize()
    }
    askedQuestions.push(randomNumber)
    document.querySelector('#question').innerText = questionsAndAnswers[randomNumber].q;
    var shuffledAnswers = shuffle(questionsAndAnswers[randomNumber].a)
    for (let i = 0; i < 4; i++) {
        document.querySelector(`#answer${i + 1}text`).innerText = shuffledAnswers[i];
    }
}

function hideQuizElements(bool = true){
    document.getElementById("qEl").style.display = bool ? "none" : "block";
    document.getElementById("resCont").style.display = bool ? "block" : "none";
}

function setResult(res = true, text = "", title = res ? "Richtig!" : "Leider falsch"){
    document.getElementById("resAn").classList.remove(res ? "fail-bg" : "success-bg");
    document.getElementById("resAn").classList.add(res ? "success-bg" : "fail-bg");
    document.getElementById("resAn").querySelector("span").innerText = title;
    document.getElementById("resultText").innerHTML = text
}

function winMsg(count = 10){
        if(checkTargetAchieved(count)){
            hideQuizElements();
            setResult(true, `Du hast <b>${correctCount}</b> von ${count} Fragen richtig beantwortet!<br/>Du kannst Dich gerne noch einmal versuchen, es warten noch mehr Fragen auf dich.`, "Fertig!")
            var submit = document.getElementById("submitR")
            submit.style.display = "none";
            submit.querySelector("button").innerText = "Neu laden";
            submit.querySelector("button").onclick = function(){window.location.reload(false)}
            setTimeout(() => {
                submit.style.display = "block";
            }, 3000)
            return
        }
}

document.querySelector("#submit").onclick = function(e){
    var checkedInputs = [...document.querySelectorAll("input")].filter(el => (el.checked))
    if(checkedInputs.length < 1){
        return
    }
    var ansId = checkedInputs[0].id;
    var ansText = document.querySelector(`#${ansId}text`).innerText;
    if(ansText == questionsAndAnswers[randomNumber].t){
        correctCount++
        setResult(true, questionsAndAnswers[randomNumber].c);
        hideQuizElements();
        winMsg();
    }else{
        setResult(false, questionsAndAnswers[randomNumber].c);
        hideQuizElements();
        winMsg();
    }
}


loadRandomQuestion();
hideQuizElements(false);
