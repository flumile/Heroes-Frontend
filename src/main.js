require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    let listHeroesDom = document.getElementById('list-hero')
    let formHero = document.querySelector("form")
    let url = process.env.API_HOST + "/heroes"

    fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_CREDENTIAL,
            },
        }).then(resp => resp.json())
        .then(data => {
            buildHeroDom(listHeroesDom, data)
            callHero2show(url)
        })

})

function callHero2show(url) {
    const selectName = document.querySelectorAll('.hero-name')
    selectName.forEach(theName => {
        theName.addEventListener('click', function() {
            let id = theName.id
            let thisHeroUrl = url + "/" + id
            fetch(thisHeroUrl, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': process.env.API_CREDENTIAL,
                    },
                }).then(resp => resp.json())
                .then(data => {
                    let htmlShowHeroDom = document.getElementById('hero-details')
                    showHero(htmlShowHeroDom, data)
                    allBtnHeroCard(url, data)
                })
        })
    })
}

function allBtnHeroCard(url, data) { //all botton in hero card
    let deleteBtn = document.querySelector('.delete-btn')
    let modifybtn = document.getElementById('edit-name')

    deleteBtn.addEventListener('click', function() {
        deleteHero(url, data)
    })

    modifybtn.addEventListener('click', function() {
        let nameTag = document.querySelector('.info-name')
        modifyNameBtn(nameTag, data, url)
    })

    updateImage(data, url)
}

function deleteHero(url, data) {
    let id = data.id
    let thisHeroUrl = url + "/" + id
    fetch(thisHeroUrl, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL,
        },
    }).then(resp => resp.json())
    window.location.reload()
}

function modifyNameBtn(nameTag, data, url) {
    let nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'hero[name]')
    nameInput.setAttribute('value', nameTag.textContent)
    nameInput.dataset.id = data.id
    nameTag.textContent = ' '
    nameTag.appendChild(nameInput)    
    nameInput.focus()

    let btnUpdate = document.querySelector('.update-btn')
    btnUpdate.addEventListener('click', function() {
        updateHero(data, url, nameInput)
    })
}

function updateImage(data, url) {
    let imageUpdateBtn = document.getElementById('image-update')
    let heroId = data.id
    let heroUpdateUrl = url + '/' + heroId 
    imageUpdateBtn.addEventListener('change', function() {
        let newImage = imageUpdateBtn.files[0]
        console.log(newImage)
        let formData = new FormData
        formData.append('hero[image]', newImage)

        fetch(heroUpdateUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': process.env.API_CREDENTIAL
            },
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            window.location.reload()
        })
    })
    
}

function updateHero(data, url, nameInput) {
    let heroId = data.id
    let heroUpdateUrl = url + '/' + heroId 
    let inputNameTag = nameInput.value

    fetch(heroUpdateUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL
          },
          body: JSON.stringify({ hero: { name: inputNameTag} })
        })
        .then(resp => resp.json())
        .then(data => {
            window.location.reload()
        })
}

function callNewHeroList(url) {
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL,
        },
    }).then(resp => resp.json())
    .then(data => {
        let listHeroesDom = document.getElementById('list-hero')
        clearDom(listHeroesDom)
        buildHeroDom(listHeroesDom, data)

    })
}

function clearDom(dom) {
    dom.textContent = ''
}

function showHero(dom, data) {
    let ImgUrl = data.image_thumbnail_url.replace('http://localhost:3002', process.env.API_HOST)
    clearDom(dom)
    let htmlStr = `
    <div class="hero-details">
    <div class="lv">lv.${data.level}</div>
        <div class="hero-img-wrapper">
            <img class="hero-img" src="${ImgUrl}" alt="hero : ${data.name}'s picture">
        </div>
                <input type="file" id="image-update" name="hero[image]"/>
        <div class="details">
            <div class="name">
                <div class="info-name" id="${data.id}">${data.name}</div>
                <img heroId="${data.id}" id="edit-name" src="https://image.flaticon.com/icons/png/512/1250/1250222.png">
            </div>
            <div>${data.job}</div>
            <div class="power">
                <div>HP</div>
                <div>${data.hp}</div>
                <div>MP</div>
                <div>${data.mp}</div>
            </div>
        </div>
        <div class="btn">
            <input type="submit" value="update" class="update-btn">
            <input type="submit" value="delete" class="delete-btn">
        </div>
        </div>
    `
    dom.insertAdjacentHTML('beforeend', htmlStr)
}

function showUpdateCard(dom, data) {
    clearDom(dom)
    let htmlStr = `
        <input type="text" id="UpdateName" HeroName ="hero[name]" value=' '></div>
    `
    dom.insertAdjacentHTML('beforeend', htmlStr)

}

function buildHeroDom(dom, data) {
    data.forEach(hero => {
        let htmlStr = `
        <div class="herolist each-hero">
            <div class="hero-name" id="${hero.id}">${hero.name}</div>
            <div>lv${hero.level}</div>
            <div>${hero.hp}</div>
            <div>${hero.mp}</div>
            <div class="job ${hero.job}">${hero.job}</div>
        </div>
        `
        dom.insertAdjacentHTML('beforeend', htmlStr)
    });
}