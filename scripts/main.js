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
    var GoT = {
        lastId: 0,
        livingCharacters: function (charactersDatabase) {
            var results = [];
            for (var i in charactersDatabase) {
                if (!charactersDatabase[i].dead) {
                    results.push(charactersDatabase[i]);
                }
            }
            return results;
        },
        orderBy: function (charactersDatabase) {
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
        },
        fillContent: function (charactersDatabase) {
            var mainContent = document.getElementById('main-content');
            var line = 1;
            for (var i in charactersDatabase) {
                GoT.createElement(charactersDatabase[i], mainContent);
                if (line === 8) {
                    GoT.createBreak(mainContent);
                    line = 0;
                }
                line++;
            }
        },
        createElement: function (object, target) {
            var div = document.createElement('div');
            var p = document.createElement('P');
            var img = document.createElement('img');
            div.setAttribute('class', 'content-element');
            div.id = object.id;
            div.addEventListener('click', function () {
                GoT.displayBio(this.id);
            });
            p.innerHTML = object.name;
            img.src = object.portrait;
            img.alt = object.name;
            div.appendChild(img);
            GoT.createBreak(div);
            div.appendChild(p)
            target.appendChild(div);
        },
        createBreak: function (target) {
            target.appendChild(document.createElement('BR'));

        },
        formatBio: function (bio) {
            var out = [];
            var div = document.createElement('DIV');
            var img = document.createElement('IMG');
            var logo = document.createElement('IMG');
            var h2 = document.createElement('H2');
            var p = document.createElement('P');
            div.id = "bio-content";
            img.src = bio.picture;
            img.alt = bio.name;
            img.id = "bio-img"
            logo.src = bio.house ? `/assets/houses/${bio.house}.png` : '';
            logo.alt = bio.house;
            logo.id = "bio-logo";
            h2.innerHTML = bio.name;
            p.innerHTML = bio.bio;
            div.appendChild(img);
            div.appendChild(logo);
            div.appendChild(h2);
            div.appendChild(p);

            return div;


        },
        replaceContent: function (menu, newContent) {

            if (menu.contains(document.getElementById('bio-content'))) {
                menu.removeChild(document.getElementById('bio-content'));
            }
            menu.insertBefore(newContent, menu.lastChild);
        },
        displayBio: function (id = -1, needControl = true) {
            var menu = document.getElementById('right-menu');
            if (id == -1) {
                var notFound = document.createElement('DIV');
                notFound.innerHTML = '404 Not Found';
                notFound.id = 'bio-content';
                this.replaceContent(menu, notFound);
                return;
            }
            if (needControl)
                this.activeController(id);
            console.log(id);
            console.log(userDatas[id - 1]);
            formattedBio = GoT.formatBio(userDatas[id - 1]);
            this.replaceContent(menu, formattedBio);


        },
        activeController: function (id) {
            document.getElementById(id).style.backgroundColor = 'rgba(90, 103, 214, 0.75)';
            if (this.lastId != 0 && this.lastId != id) {
                document.getElementById(this.lastId).style.backgroundColor = 'unset';
            }
            this.lastId = id;


        },
        searchController: {
            searchButton: document.querySelector('#search button'),
            searchField: document.querySelector('#search input'),
            eventListenerAdd: function () {
                console.log(this.searchField)
                this.searchField.addEventListener('focus', function () {
                    document.querySelector('#search input').setAttribute('value', '');
                    GoT.searchController.searchField.style.color = 'black';
                });
                this.searchField.addEventListener('blur', function () {

                    document.querySelector('#search input').style.color = 'rgba(128, 128, 128, 0.75)'

                });
                this.searchField.addEventListener('keypress', function (key) {
                    if (key.keyCode == 13) {
                        GoT.searchController.search(GoT.searchController.searchField.value);
                        GoT.searchController.searchField.value = '';

                    }
                })

            },
            search: function (text) {
                console.log(text);
                console.log(this);
                text = text.toLowerCase();
                var found = false;
                var locator = 0;
                for (var i in userDatas) {
                    if (userDatas[i].name.toLowerCase().indexOf(text) > -1) {
                        found = true;
                        locator = userDatas[i].id;
                        console.log(locator);
                    }
                }
                if (found) {
                    GoT.displayBio(parseInt(locator), false);
                    return;

                } else {
                    GoT.displayBio(-1)
                    return;
                }
            }
        }
    }

    var aliveCharacters = GoT.livingCharacters(userDatas);
    GoT.orderBy(aliveCharacters);
    console.log(aliveCharacters);
    GoT.fillContent(aliveCharacters);
    GoT.searchController.eventListenerAdd();

}
// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
// function livingCharacters(charactersDatabase) {
//     var results = [];
//     for (var i in charactersDatabase) {
//         if (!charactersDatabase[i].dead) {
//             results.push(charactersDatabase[i]);
//         }
//     }
//     return results;
// }

// function orderBy(charactersDatabase) {
//     var i = charactersDatabase.length;
//     var swap = false;
//     do {
//         swap = false;
//         for (var j = 0; j < i - 1; j++) {
//             if (charactersDatabase[j].name > charactersDatabase[j + 1].name) {
//                 [charactersDatabase[j], charactersDatabase[j + 1]] = [charactersDatabase[j + 1], charactersDatabase[j]]
//                 swap = true;
//             }
//         }
//         i--;
//     } while (swap)
// }

// function fillContent(charactersDatabase) {
//     var mainContent = document.getElementById('main-content');
//     var line = 1;
//     for (var i in charactersDatabase) {
//         createElement(charactersDatabase[i], mainContent);
//         if (line === 8) {
//             createBreak(mainContent);
//             line = 0;
//         }
//         line++;
//     }
// }




// function createElement(object, target) {
//     var div = document.createElement('div');
//     var p = document.createElement('P');
//     var img = document.createElement('img');
//     div.setAttribute('class', 'content-element');
//     div.id = object.id;
//     div.addEventListener('click', function () {
//         displayBio(this.id);
//     });
//     p.innerHTML = object.name;
//     img.src = object.portrait;
//     img.alt = object.name;
//     div.appendChild(img);
//     createBreak(div);
//     div.appendChild(p)
//     target.appendChild(div);
// }