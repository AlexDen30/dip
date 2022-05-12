const downloadJson = (dataObj, name) => {
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], {type: 'octet-stream'});
    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement('a'), {
        href,
        style: 'display: none;',
        download: name
    })

    document.body.append(a);

    a.click()
    URL.revokeObjectURL(href);
    a.remove()
}

export default downloadJson