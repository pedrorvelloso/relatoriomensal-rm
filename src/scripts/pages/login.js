'use strict'
const { redmineUrl } = require('../../config.js')
const { getProjects, loadPage } = require('../utils.js')
const fs = require('fs')
$('#formLogin').submit(e => {
	const userInfo = verificaCampos()

	if (userInfo !== null) {
		$('.loading').css('display', 'flex')
		login(userInfo.user, userInfo.pass)
	}
	e.preventDefault()
})

function login(user, pass) {
	$.ajax({
		url: `${redmineUrl}/users/current.json`,
		type: 'GET',
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(user + ':' + pass))
		},
		success: (response) => {
			const store = { apiKey: response.user.api_key, projects: [] }
			getProjects(store.apiKey).then(res => {
				const projects = res.projects
				projects.pop()
				store.projects = projects
				fs.writeFileSync('store.json', JSON.stringify(store))
				loadPage('gerar')
			})
		},
		error: () => {
			$('.loading').css('display', 'none')
			$('.error').html('Erro ao fazer login!')
		},
	})
}

function verificaCampos() {
	const user = $('#user').val()
	const pass = $('#pass').val()

	if (user === '' || pass === '') {
		$('.error').html('Preencha o campo de Login e Senha corretamente!')
		return null
	}

	return { user, pass }
}