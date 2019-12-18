const GetSortiesAsync = async function () {
    let data
        try {
            let response = await fetch("https://api.warframestat.us/pc/fissures")
            data = await response.json()
        } catch (error) {
            alert("Geen gegevens gevonden. \nControleer of je internetverbinding hebt")
        }
    return data;
}

const SetHTMLBody = function(data) {
    let content = document.querySelector('.js-content')
    let num = 0
    for (var fis of data) {
        let item = `<div class="c-app__card">
            <div class="c-card__title" onclick="dropIt(\`fis${num}\`);">${fis.node}<div>
            <div class="c-card__body" id="fis${num}">
                <div class="c-card__content">
                    <image class="c-card__image" src="images/${fis.tier}.svg" title="${fis.tier}" />
                    <div>${fis.enemy} - ${fis.missionType}</div>
                    <div>${fis.eta}</div>
                </div>
            </div>
        </div>`
        num += 1
        content.innerHTML += item
    }
}

function dropIt(id) {
    toggleClass(document.getElementById(`${id}`), "c-card__hide");
}

const toggleClass = function (el, className) {
    if (el) {
        if (el.className.indexOf(className) != -1) {
            el.className = el.className.replace(className, '');
        } else {
            el.className += ' ' + className;
        }
    }
};

const init = async function () {
    let data = await GetSortiesAsync()
    SetHTMLBody(data)
}

document.addEventListener('DOMContentLoaded', init)