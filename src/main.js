require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    let formHero = document.querySelector('#form-hero')
    let btnCreateHero = document.querySelector('#btn-create-hero')

    let heroJobUrl = process.env.API_HOST + "/hero_jobs"
    fetch(heroJobUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL
        }
    }).then(resp => resp.json())
      .then(data => {
          let jobWrapper = document.getElementById('select-job')
          if(jobWrapper == null) {return}

          buildJobDropdown(jobWrapper, data)
      })

    btnCreateHero.onclick = () => {
        createHero()
    }

    function createHero() {
        let name = formHero.querySelector('#name').value
        let job = formHero.querySelector('#jobs').value
        let image = formHero.querySelector('#image').files[0]
    
        let formData = new FormData
        formData.append('hero[name]', name)
        formData.append('hero[job]', job)
        formData.append('hero[image]', image)
    
        let createHeroUrl = process.env.API_HOST + "/heroes"
        console.log(createHeroUrl)
        fetch(createHeroUrl, {
            method: "POST",
            headers: {
                'Authorization': process.env.API_CREDENTIAL
            },
            body: formData
        }).then(resp => resp.json())
    }
})
function insertNewHero(heroList, hero){
    let htmlStr = `
    <div class="hero">
        <a href="" class="hero-name">${hero.name}</a>
        <div>${hero.level}</div>
        <div>${hero.hp}</div>
        <div>${hero.mp}</div>
        <div>${hero.job}</div>
    </div>
    `
    heroList.insertAdjacentHTML('afterbrgin', htmlStr)
} 

function buildJobDropdown(targetDom, data) {
    targetDom.insertAdjacentHTML('afterbegin', 
        `<select id="jobs" name="hero[job]">
            ${data.jobs.map(item => `<option value=${item}>${item}</option>`)}
        </select>
    `)
}
