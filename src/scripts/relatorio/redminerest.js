require('isomorphic-fetch')
const { objectToQueryString, getStoredUser } = require('./util')

class RedmineREST {

	constructor() {
		this.API_KEY = getStoredUser()
		this.RM_URL = process.env.REDMINE_URL
		this.requestInfo = {}
		this.setRequestInfo()
	}

	setRequestInfo() {
		const newHeaders = new Headers()
		newHeaders.append('X-Redmine-API-Key', this.API_KEY)

		this.requestInfo = {
			headers: newHeaders,
		}
	}

	doRequest(url, options) {
		options = options ? objectToQueryString(options) : ''

		const result = fetch(`${this.RM_URL}/${url}.json${options}`, this.requestInfo)
			.then(response => {
				return response.json()
			})
			.then(result => {
				return result
			})

		return result
	}

}

module.exports = new RedmineREST()