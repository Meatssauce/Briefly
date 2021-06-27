// const HOST_URL = 'http://127.0.0.1:5000/predict'

// chrome.browserAction.onClicked.addListener(function(tab) {
// 	// No tabs or host permissions needed!
// 	// chrome.scripting.executeScript({
// 	//   code: 'document.body.style.backgroundColor="red"'
// 	// })

// 	// const payload = {urls: [tab.url]}
// 	// var data = new FormData()
// 	// data.append('json', JSON.stringify(payload))
	
// 	// (async () => {
// 	// 	const response = await fetch(HOST_URL, {
// 	// 		method: 'POST',
// 	// 		body: JSON.stringify({urls: [tab.url]}),
// 	// 		dataType: 'json'
// 	// 	})
// 	// 	const result = await response.json()
	  
// 	// 	const is_real = result['reliability'][0] == 1
// 	// 	const flag = result['flag'][0]

// 	// 	chrome.tabs.getSelected(null, function(tab) {
// 	// 		const code = 'window.location.reload();';
// 	// 		chrome.tabs.executeScript(tab.id, {code: code});
// 	// 	})
// 	// })()
	
// 	fetch(HOST_URL, {
// 		method: 'POST',
// 		body: JSON.stringify({urls: [tab.url]}),
// 		dataType: 'json'
// 	})
// 	.then(response => response.json())
// 	.then(result => {
// 		const is_real = result['reliability'][0] == 1
// 		const flag = result['flag'][0]

// 		chrome.tabs.getSelected(null, function(tab) {
// 			const code = 'window.location.reload();';
// 			chrome.tabs.executeScript(tab.id, {code: code});
// 		})
// 	})
// })