function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    var aliveCharacters = livingCharacters(userDatas);
    orderBy(aliveCharacters);
    console.log(aliveCharacters);
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function livingCharacters(charactersDatabase) {
    var results = [];
    for (var i in charactersDatabase) {
        if (!charactersDatabase[i].dead) {
            results.push(charactersDatabase[i]);
        }
    }
    return results;
}

function orderBy(charactersDatabase) {
    var i = charactersDatabase.length;
    var swap = false;
    do {
        swap = false;
        for (var j = 0; j < i - 1; j++) {
            if (charactersDatabase[j].name > charactersDatabase[j + 1].name) {
                [charactersDatabase[j], charactersDatabase[j + 1]] = [charactersDatabase[j + 1], charactersDatabase[j]]
                swap = true;
            }
        }
        i--;
    } while (swap)
}

function fillContent(charactersDatabase) {
    var mainContent = document.getElementById('main-content');

}