const makeQuery = async(id) => {
    // console.log('query function', id)
    // const url = `/search?query=${id}`
    // try {
    //     await fetch(url, { method: 'POST'})
    //      // Replace with the desired URL
    //     history.pushState(null, null, url);
    // }catch (err) {
    //     alert(err)
    // }

    const url = `/search?query=${id}`
    history.pushState(null, null, url)
    location.reload()
}

module.exports =  {
    makeQuery
}