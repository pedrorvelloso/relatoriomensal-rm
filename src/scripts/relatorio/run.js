module.exports = (de, ate, project) => {
	const Issues = require('./issues')
	const Relatorio = require('./relatorio')
	const Pubsub = require('pubsub-js')
	const { sortByKey, formatData } = require('./util')

	const issues = new Issues()

	// Date setting
	const today = new Date()
	let dateEnd
	let dateInit

	if (de !== '' && ate !== '') {
		dateInit = de
		dateEnd = ate
	} else {
		dateEnd = new Date()
		dateInit = new Date()

		if (today.getDate() > 15) {
			dateInit.setDate(16)
			dateEnd.setMonth(today.getMonth() + 1)
			dateEnd.setDate(15)
		} else {
			dateInit.setMonth(today.getMonth() - 1)
			dateInit.setDate(16)
			dateEnd.setDate(15)
		}
		dateEnd = formatData(dateEnd)
		dateInit = formatData(dateInit)
	}
	//Date setting

	console.log('»  Relatório para o periodo entre ' + dateInit + ' e ' + dateEnd)

	Pubsub.subscribe('new', (topic, data) => {
		issues.pushIssues(data.issue)
	})

	Pubsub.subscribe('doRelatorio', () => {
		console.log('»  Tarefas baixadas!')
		Relatorio.doRelatorio(sortByKey(issues.getIssues(), 'id'))
	})

	issues.getData(dateInit, dateEnd, project)
}