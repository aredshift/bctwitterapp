import axios from 'axios'

function translator(datum) {
    datum.time = new Date(Number(datum.time)).toLocaleString();

    return datum;
}

function fetchData(searchQuery, callback) {

    if(searchQuery!==undefined){
        axios.get(
            'http://localhost:8080/search/' + searchQuery
        ).then(
            res => {
                let data = res.data.results.map( datum => translator(datum));
                callback(data);
            }
        )
    }
}

export default fetchData