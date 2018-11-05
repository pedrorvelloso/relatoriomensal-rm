const RedmineREST = require('./redminerest')
const Pubsub = require('pubsub-js')

class Issues {

	constructor() {
		this.issues = []
	}

	async getData(dateInit, dateEnd, project) {
		const limit = 100
		const created_on = `><${dateInit}|${dateEnd}`
		const status_id = '*'

		const include = 'attachments'

		const exlcudedTrackers = [19, 4, 5, 6, 7, 20]

		let count = 0

		console.log('»  Baixando tarefas do Redmine...')
		const undetailedIssues = await RedmineREST.doRequest(`projects/${project}/issues`, { limit, created_on, status_id })
		if (undetailedIssues.total_count > 0) {
			await undetailedIssues.issues.map(async (i) => {
				const issue = await RedmineREST.doRequest(`issues/${i.id}`, { include })
				count++

				if (!exlcudedTrackers.includes(issue.issue.tracker.id)) {
					Pubsub.publish('new', issue)
				}

				if (count === undetailedIssues.issues.length)
					Pubsub.publish('doRelatorio', null)
			})
		} else {
			$('.loading').css('display', 'none')
		}

	}

	pushIssues(issue) {
		this.issues.push(issue)
	}

	getIssues() {
		return this.issues
	}

}

module.exports = Issues