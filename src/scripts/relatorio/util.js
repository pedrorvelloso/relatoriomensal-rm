var fs = require('fs')

module.exports = {
	sortByKey: (array, key) => {
		return array.sort((a, b) => {
			var x = a[key]; var y = b[key]
			return ((x < y) ? -1 : ((x > y) ? 1 : 0))
		})
	},
	objectToQueryString: (object) => {
		return '?' + Object.keys(object).map((key) => {
            	return encodeURIComponent(key) + '=' +
                    encodeURIComponent(object[key])
		}).join('&')
	},
	formatData: (date, flag) => {
		const newDate = new Date(date)
		const d = {
			d: ('0' + newDate.getDate()).slice(-2),
			M: ('0' + (newDate.getMonth() + 1)).slice(-2),
			y: newDate.getFullYear(),
		}
		if (flag === '/') {
			return `${('0' + (parseInt(d.d) + 1)).slice(-2)}/${d.M}/${d.y}`
		}
		return `${d.y}-${d.M}-${d.d}`
	},
	getStoredUser: () => {
		return JSON.parse(fs.readFileSync('store.json', 'utf8')).apiKey
	},
}