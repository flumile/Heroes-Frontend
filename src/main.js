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


    const cJob = document.querySelectorAll('.job') //c(small C) is select
        //console.log(cJob)
        //clearDom(listHeroesDom)

    const cName = document.querySelectorAll('.hero-name')
        //console.log(cName)
        //console.log(document.querySelectorAll('.hero-name'))
})

function callHero2show(url) {
    const cName = document.querySelectorAll('.hero-name')
    cName.forEach(theName => {
        theName.addEventListener('click', function() {
            let id = theName.id
            callfetchAPI(url + "/" + id, "GET").then(data => {
                let htmlShowHeroDom = document.getElementById('hero-details')
                showHero(htmlShowHeroDom, data)
            })
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

function clearDom(Dom) {
    Dom.textContent = ''
}

function showHero(Dom, data) {
    clearDom(Dom)
    let htmlStr = `
    <div class="hero-details">
    <div class="lv">lv.${data.level}</div>
        <div class="hero-img">
            <img src="${data.image_thumbnail_url}" alt="">
        </div>
        <div class="details">
            <div id="${data.id}">${data.name}</div>
            <div>${data.job}</div>
            <div class="power">
                <div>HP</div>
                <div>${data.hp}</div>
                <div>MP</div>
                <div>${data.mp}</div>
            </div>
        </div>
        <div class="btn">
            <input type="submit" value="update">
            <input type="submit" value="delete">
        </div>
        </div>
    `
    Dom.insertAdjacentHTML('beforeend', htmlStr)
}

function buildHeroDom(Dom, data) {
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
        Dom.insertAdjacentHTML('beforeend', htmlStr)
    });
}
