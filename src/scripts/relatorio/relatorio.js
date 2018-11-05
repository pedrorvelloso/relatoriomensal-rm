const fs = require('fs')
const opn = require('opn')
const { formatData } = require('./util')
const $ = require('jquery')

class Relatorio {

	constructor() {
		this.HTML = './relatorio.html'
		this.HTML_CONFIG = {
			header: __dirname + '/htmlconfig/header.html',
			footer: __dirname +'/htmlconfig/footer.html',
		}
		this.PDF = './relatorio.pdf'
	}

	doRelatorio(issues) {
		console.log('»  Gerando relatório em HTML...')
		fs.writeFileSync(this.HTML, fs.readFileSync(this.HTML_CONFIG.header))
		issues.map(issue => {

			let title = issue.subject
			let description = issue.description.replace(/\r\n\r\n/g, '<br/><br/>')
			description = issue.description.replace(/\r\n/g, '<br/>')
			if (title[0] === '[') {
				title = title.substr(title.indexOf('-') + 2, title.length)
			}

			let html = '<div>\n'
			html += `<div id="title"><b>${title} - RM: ${issue.id}</b><br />\n`
			html += `Status: <b>${issue.status.name}</b><br/>\n`
			html += `Iniciada em: <b>${formatData(issue.start_date, '/')}</b><br/>\n`
			html += `Última atualização em: <b>${formatData(issue.updated_on, '/')}</b></div>\n`
			html += `<p>${description}</p>\n`
			html += '</div>\n'
			issue.attachments.map(att => {
				if (att.content_type !== undefined && att.content_type.substr(0, 5) === 'image') {
					html += `<center><img src="${att.content_url}"></center><br/>\n`
				}
			})
			fs.appendFileSync(this.HTML, html)
		})
		fs.appendFileSync(this.HTML, fs.readFileSync(this.HTML_CONFIG.footer))
		console.log('»  Relatório em HTML gerado!\n')
		opn(this.HTML)
		$('.loading').css('display', 'none')
	}

}

module.exports = new Relatorio()