require('dotenv').config()
import './main.scss'

document.addEventListener('DOMContentLoaded', function() {
    let heroJobUrl = process.env.API_HOST + "/hero_jobs"
    fetch(heroJobUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_CREDENTIAL
        }
    }).then(resp => resp.json())
      .then(data => {
          let jobWrapper = document.getElementById('job-wrapper')
          if(jobWrapper == null) {return}

          console.log(data)
          buildJobDropdown(jobWrapper, data)
      })
})

function buildJobDropdown(targetDom, data) {
    targetDom.insertAdjacentHTML('afterbegin', 
        `<select id="jobs" name="hero[job]">
            ${data.jobs.map(item => `<option value=${item}>${item}</option>`)}
        </select>
    `)
}