'use strict'
const fs = require('fs')
fs.readFile('store.json', 'utf8', function (err, contents) {
	JSON.parse(contents).projects.forEach((item) => {
		$('.model').append(`<option value="${item.identifier}">${item.name}</option>`)
	})
})

$('#gerar').click(() => {
	const de = $('#de').val()
	const ate = $('#ate').val()
	const project = $('select').val()
	require('../relatorio/run.js')(de, ate, project)
	$('.loadText').html('Baixando tarefas do Redmine...')
	$('.loading').css('display', 'flex')
})

$('.link').click(() => {
	$('.dates').fadeIn(950)
})