import {useEffect, useState} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setData(data)
                });
        }
        fetchData();
    }, []);
    return {data}
}

export default useFetch;