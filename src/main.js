require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    let listHeroesDom = document.getElementById('list-hero')
    let formHero = document.querySelector("form")
    let url = process.env.API_HOST + "/heroes"
    let callFetchtoGet = callfetchAPI(url, "GET")
    callFetchtoGet.then(data => {
        buildHeroDom(listHeroesDom, data)
        callHero2show(url)
    })
})

function callHero2show(url) {
    const selectName = document.querySelectorAll('.hero-name')
    selectName.forEach(theName => {
        theName.addEventListener('click', function() {
            let id = theName.id
            callfetchAPI(url + "/" + id, "GET").then(data => {
                let htmlShowHeroDom = document.getElementById('hero-details')
                showHero(htmlShowHeroDom, data)
                deleteHero(url,data)
            })
        })
    })
}

function deleteHero(url,data) {
    let deleteBtn = document.querySelector('.delete-btn')
    deleteBtn.addEventListener('click',function() {
        let id = data.id
        callfetchAPI(url + "/" + id, "DELETE")
        callfetchAPI(url,"GET").then(data => {
            clearDom(data)
            window.location.reload()
        })
    })
}

function callfetchAPI(url, mtd, formData) {
    return fetch(url, {
        method: mtd,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL,
        },
        body: formData
    }).then(resp => resp.json())
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
                <input type="file" id="image-update" name="image-update"/>
        <div class="details">
            <div class="name">
                <div class="info-name" id="${data.id}">${data.name}</div>
                <img id="edit-name" src="https://image.flaticon.com/icons/png/512/1250/1250222.png">
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