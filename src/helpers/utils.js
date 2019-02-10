export function readJsonFileAsText(file) {
	return new Promise(resolve => {
        console.log('checkkk file',file)
		const reader = new FileReader()
		reader.onload = (e ) => {
            //console.log('checkkkk ',e.target)
            window.target = e.target
			resolve(JSON.parse(e.target.result))
		}
		file && reader.readAsText(file)
	})
}



export function downloadObjectAsJson( exportName ,template) {
	const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(template)
	const downloadAnchorNode = document.createElement('a')
	downloadAnchorNode.setAttribute('href', dataStr)
	downloadAnchorNode.setAttribute('download', exportName + '.pem')
	const e = document.createEvent('MouseEvents')
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	downloadAnchorNode.dispatchEvent(e)
	downloadAnchorNode.remove()
}