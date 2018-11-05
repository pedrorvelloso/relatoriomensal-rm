module.exports = {
	loadPage: (page) => {
		$.ajax({
			url: `pages/${page}.html`,
			type: 'GET',
			dataType: 'text',
			success: (response) => {
				$('.page').html(response)
			},
			error: (error) => {
				console.log(error)
			},
		})
		$('.loading').css('display', 'none')
	},
	getProjects: (apiKey) => {
		return $.ajax({
			url: `${process.env.REDMINE_URL}/projects.json?limit=100`,
			type: 'GET',
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-Redmine-API-Key', apiKey)
			},
			success: (response) => {
				return response
			},
			error: () => {
				$('.error').html('Erro ao fazer login!')
			},
		})
	},
}