document.querySelector('.topic__slider > .close').addEventListener('click', ()=>{
    document.querySelector('.topic__slider').style.top = '100vh';
    document.querySelector('.topic__slider').offsetTop = 0;
})

document.querySelector('.content__slider > .navbar > .back').addEventListener('click', ()=>{
    document.querySelector('.content__slider').style.top = '100vh';
    document.querySelector('.content__slider').offsetTop = 0;
})

const changeSliderTopic = (topic) => {
    let slider = document.querySelector('.topic__slider');
    slider.querySelector('img').src = `/topics/${topic}/title.JPEG`;
    slider.querySelector('.series').innerText = topics[topic].series;
    slider.querySelector('.author').innerText = topics[topic].author;
    slider.querySelector('h3').innerText = topics[topic].title;
    slider.querySelector('.slider__preview > p').innerText = topics[topic].preview;

    //create content
    let div = document.createElement('div');
    topics[topic].content.forEach((el, i) =>{
       div.innerHTML += `
            <div class="mdc-card content__card content__button" content="${i}">
                <div class="mdc-card-wrapper__text-section">
                    <div class="content__section">
                        ${el[0]}
                        <i class="material-icons-outlined back">chevron_right</i>
                    </div>
                </div>
            </div>`
    });

    div.querySelectorAll(".content__button").forEach(el => {
        el.addEventListener("click", () => {
            console.log('piu')
            openContentSlider(topic, el.getAttribute("content"))
        })
    })
    
    // change content
    slider.querySelector('.slider__content').removeChild(
        slider.querySelector('.slider__content > div')
    );
    slider.querySelector('.slider__content').appendChild(div);
}

const openContentSlider = (topic, content) =>{
    let slider = document.querySelector('.content__slider');
    content = topics[topic].content[content];
    slider.style.top = 0;
    
    slider.querySelector(".author").innerText = topics[topic].author;
    slider.querySelector(".title").innerText = topics[topic].title;
    
    let a =`## ${content[0]} \n\n`+
            content[1];
    
    a = parseMarkdown(a);
    a = marked(a);


    slider.querySelector(".content__panel").innerHTML = a;

    renderMathInElement(slider, options)
}


function parseMarkdown(markdownText) {
	const htmlText = markdownText
		// .replace(/^### (.*$)/gim, '<h3>$1</h3>')
		// .replace(/^## (.*$)/gim, '<h2>$1</h2>')
		// .replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^\<< (.*$)/gim, '<div style="text-align:right;">\n\n$1\n\n</div>')
		.replace(/^\< (.*$)/gim, '<div style="text-align:center;">\n\n$1\n\n</div>')
		// .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		// .replace(/\*(.*)\*/gim, '<i>$1</i>')
		// .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		// .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		
		.replace(/^\%/gim, '<span style="margin-left:2em;"></span>')
		.replace(/\\\\/gim, '\\\\\\\\')
		
		var n=0;
		// while(htmlText.search(/^\%\s/sm) != -1){
		// 	n++;
		// 	htmlText.replace(/^\%/sm, `<span style="margin-left:2em;">**Задача ${n}.**</span>`)
		// }

		a = htmlText;

	return htmlText.trim()
}

const options = {
    "displayMode":false,
    "delimiters":[
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\[", right: "\\]", display: true},
    ],
    "ignoredTags":["pre", "code"],
    "throwOnError":false,
    "macros":{
        "\\Q": "\\mathbb{Q}" ,
        "\\C": "\\mathbb{C}" ,
        "\\P": "\\mathbb{P}" ,
        "\\gcd": "\\textrm{gcd}" ,
        "\\lcm": "\\textrm{lcm}" ,
        "\\abs": "\\lvert #1 \\rvert",
        "\\parallel": "\\lvert \\rvert",
    },
    "leqno":true,
    "minRuleThickness":0.03,
}

const addTopicList = (header, arr) => {
    
    main = document.querySelector("main");
    let template1 = (topic) =>`
            <div class="topic" value="${topic}">
                <img class="float" src="/topics/${topic}/title.JPEG"/>
                <div class="topic__title">${topics[topic].title}</div>
                <div class="topic__subhead">${topics[topic].series}</div>
            </div>`


    let template2 = (header, topics) => `
        <h3>${header}</h3>
        <div class="topic__list">
            ${topics}
        </div>`

    let template="";
    arr.forEach(el => {
        template+=template1(el)
    })

    main.innerHTML += template2(header, template)
}

addTopicList('Новое', ["divisers", "euler-circle", "viet-theorem", "power-of-point"])
addTopicList('Геометрия', ["euler-circle", "power-of-point"])
addTopicList('Алгебра', ["viet-theorem"])

let a = ([...document.querySelectorAll('.topic'), ...document.querySelectorAll('.topic__card')])
a.forEach(el => {
		el.addEventListener('click', () => {
			if(el.getAttribute("value")){
				changeSliderTopic(el.getAttribute("value"))
				document.querySelector('.topic__slider').style.top = 0
			}
		})
	});