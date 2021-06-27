// URL for summariser API
const HOST_URL = 'http://127.0.0.1:5000/summarise'

// Set background colour
// let color = 'red'
// const script = 'document.body.style.backgroundColor="' + color + '";';
// chrome.tabs.executeScript({code: script})

// Show loading sign
document.getElementById('loadingSign').style.display = 'block'
document.getElementById('summary').style.display = 'none'

// Get active tab
const queryInfo = {
    active: true,
    currentWindow: true,
}

// Get summaries
chrome.tabs.query(queryInfo, function(tabs) {
    tab = tabs[0]

    fetch(HOST_URL, {
        method: 'POST',
        body: JSON.stringify({urls: [tab.url]}),
        dataType: 'json'
    })
    .then(response => response.json())
    .then(results => {
        // Show result
        document.getElementById('loadingSign').style.display = 'none'
        
        switch (results['flag'][0]) {
            case 0:
                // show summary
                document.getElementById("summary").innerHTML = results['summary'][0]
                break
            case 1:
                document.getElementById('summary').innerHTML = 'Cannot summarise text! The URL is invalid.'
                break
            case 2:
                // text not in English
                document.getElementById('summary').innerHTML = 'Cannot summarise text! The text must be in English.'
                break
            case 3:
                // show error message about invalid text
                document.getElementById('summary').innerHTML = 'Cannot summarise text! Failed to find a single continuous body of text that is not shorter than 80 words.'
                break
            default:
                // show error message
                document.getElementById('summary').innerHTML = 'Cannot summarise text! An unknown error occured.'
        }
        document.getElementById('summary').style.display = 'block'
    })
})
