(function(){
	//  KaTeX
	const options = {
		"displayMode":false,
		"delimiters":[
			{left: "$$", right: "$$", display: true},
			{left: "$", right: "$", display: false},
			{left: "\\[", right: "\\]", display: true},
		],
		"ignoredTags":["pre", "code"],
		"throwOnError":false,
		"trust":true,
		"macros":{
			"\\Q": "\\mathbb{Q}" ,
			"\\C": "\\mathbb{C}" ,
			"\\P": "\\mathbb{P}" ,
			"\\gcd": "\\textrm{gcd}" ,
			"\\lcm": "\\textrm{lcm}" ,
			"\\mult": "\\thinspace\\raisebox{-0.16em}{$\\vdots$}\\thinspace" ,
			"\\mod": "\\text{\\thinspace(mod } #1)",
			"\\abs": "\\lvert #1 \\rvert"
		}
	}

	function parseMarkdown(markdownText) {
		const htmlText = markdownText
			.replace(/^\<< (.*$)/gim, '<div style="text-align:right;">\n\n$1\n\n</div>')
			.replace(/^\< (.*$)/gim, '<div style="text-align:center;">\n\n$1\n\n</div>')
			.replace(/^\~/gim, '<br><span style="margin-left:2em;"></span>')
			.replace(/\\\\/gim, '\\\\\\\\')

		return htmlText.trim()
	}

	const markdown = document.querySelector(".markdown")

	const render = (text) =>{
		let value = text + "";
		value = parseMarkdown(value);
		value = marked(value);
		markdown.innerHTML = `${value}`;

		renderMathInElement(markdown, options);
	}
	
	fetch("https://olymp.nomomon.repl.co/latex/подборки/теория чисел - функция эйлера.txt")
		.then(res => res.text())
		.then(text => render(text))
    
	
	// share
	const shareData = {
		title: 'Функция Эйлера',
		text: 'Функция Эйлера на Mathogram\n',
		url: 'https://mathogramgithubio.nomomon.repl.co/_topic/',
	}
	shareButton = document.querySelector("#share");
	shareButton.addEventListener('click', async () => {
		try {
			await navigator.share(shareData)
		} catch(err){}
	});
})()