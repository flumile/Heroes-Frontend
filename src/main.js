require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    let listHeroesDom = document.getElementById('list')
    let formHero = document.querySelector("form")
    console.log(listHeroesDom)
    let heroUrl = process.env.API_HOST + "/heroes"
    console.log(heroUrl)
    formHero.setAttribute("action",heroUrl);
    fetch(heroUrl, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.API_CREDENTIAL
        }
    })  .then(resp => resp.json())
        .then(data => {
            console.log(data)
            buildHeroDom(listHeroesDom, data)
            addHeaderTitleToHeroesList(listHeroesDom)
        })
})

function addHeaderTitleToHeroesList(targetDom) {
    targetDom.insertAdjacentHTML('afterbegin', `
      <div class="hero-header">
        <div>Name</div>
        <div>Job</div>
        <div>HP</div>
        <div>MP</div>
      </div>
    `)
  }


function buildHeroDom(targetDom, data) {
    console.log(targetDom)
    data.forEach(hero => {
      let htmlStr = `
        <div class="hero">
          <a href="" class="hero-name">${hero.name}</a>
          <div>${hero.job}</div>
          <div>${hero.hp}</div>
          <div>${hero.mp}</div>
        </div>
      `
      targetDom.insertAdjacentHTML('beforeend', htmlStr) 
    })
  }