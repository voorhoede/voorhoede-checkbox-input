const fs = require('fs')
const demoFile = 'demo.html'
const outputDir = 'dist'
const componentRegex = /@@component@@/
const stylesRegex = /@@styles@@/
const componentName = componentArgument()

init()

function init(){
	try {
		const componentFile = fs.readFileSync(`${componentName}/${componentName}.html`, 'utf8')
		const stylesFile = fs.readFileSync(`${componentName}/${componentName}.css`, 'utf8')
		const demoContent = fs.readFileSync(demoFile, 'utf8')
		const replaceHtml = demoContent.replace(componentRegex, componentFile)
		const result = replaceHtml.replace(stylesRegex, stylesFile)

		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir)
		}

		fs.writeFileSync(`${outputDir}/index.html`, result, 'utf8')
	} catch (error) {
		console.log(error)
	}	
}

function componentArgument() {
	const splitOnEqual = process.argv[2].split('=')
	if (!(process.argv[2] && splitOnEqual.length === 2 && splitOnEqual[0] === 'component' && splitOnEqual[1])) {
		console.log('Argument \'component\' is required. E.g.: node build.js component=checkbox-input')
		return
	}

	return splitOnEqual[1]
}
