// ==UserScript==
// @name         juliaDrones
// @namespace    http://tampermonkey.net/
// @version      1.1F
// @description  made for PMC Genei Ryodan. Not retarded, but agile.
// @author       bagd1k, Setux
// @match        https://rivalregions.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rivalregions.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(async function() {
    const getDiv = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(document.querySelectorAll('[url="27"]'))
            }, 2000);
        });
    }
    setInterval(async () => {
        const div = await getDiv()
        const len = await !div.length
        if (len && location.hash.match('war\/details/')) {
            const request = await fetch('https://rivalregions.com/storage')
            const page = await request.text()
            const doc = (new DOMParser).parseFromString(page, 'text/html')
            const dronesAmount = doc.querySelector('#content > div:nth-child(20) > div.storage_number > span').textContent
            const params = [`<div url="27" hpcut="6" damage="6000" class="float_left war_w_unit tip" style="margin-left: -6px; margin-right: 8px; background-image: url(//static.rivalregions.com/static/avatars/normal/307_m/2001487307_1681848041.png); background-position: 10px 20px; width: 70px;">`,
                            `<span hpcut="6" damage="6000" url="27" class="dot pointer imp yellow war_w_unit_div" style="font-size: 13px;">0</span>`,
                            `<input hpcut="6" damage="6000" type="text" url="27" max="${dronesAmount}" value="0" class="war_w_unit_input money_input" style="font-size: 15px; width: 65px;">`].map(el => el.matchAll(/\s(.*?)=(".*?")/g), [])
            const getDiv = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(document.querySelector('#header_slide_inner > div.minwidth.tc.war_w_send.turn_0 > div.war_select_u'))
                    }, 2000);
                });
            }
            const div = await getDiv()
            const drones = document.createElement("div")
            for (const divParams of params[0]) drones.setAttribute(divParams[1], divParams[2].replaceAll('"', ''))
            const span = document.createElement("span")
            for (const divParams of params[1]) span.setAttribute(divParams[1], divParams[2].replaceAll('"', ''))
            span.appendChild(document.createTextNode(dronesAmount))
            const input = document.createElement("input")
            for (const divParams of params[2]) input.setAttribute(divParams[1], divParams[2].replaceAll('"', ''))
            span.addEventListener('click', (event) => {
                const divs = document.querySelectorAll('.war_w_unit')
                const inputs = Array.from(divs).map((input) => {
                    input.children[1].value = 0
                })
                input.value = Math.floor(parseInt(document.querySelector('#war_max_span_equal').textContent.replace('.', ''), 10) / 6000)
                drones.style.backgroundImage = "url(//static.rivalregions.com/static/avatars/normal/54_m/171300554_1681848773.png)"
                alert('Данный скрипт распространяется таки бесплатно, но вы всегда можете задонатить.... https://rivalregions.com/#slide/profile/160819338')
            })
            drones.appendChild(span)
            drones.appendChild(input)
            div.insertBefore(drones, document.querySelector('#send_b_wrap'))
        }
    }, 5000)
})();
