require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    //let listHeroesDom = document.getElementById('list-heroes')
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
          .then(data => {
              console.log('congrats!')
              console.log(data)
          })
    }
})

function buildJobDropdown(targetDom, data) {
    targetDom.insertAdjacentHTML('afterbegin', 
        `<select id="jobs" name="hero[job]">
            ${data.jobs.map(item => `<option value=${item}>${item}</option>`)}
        </select>
    `)
}