import axios from 'axios'
export default {
    getData: () => {
        return fetch('/api/SampleData/WeatherForecasts', {
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            return response;
        });
    },
    get:()=>{
        return axios.get('/api/SampleData/WeatherForecasts')
        .then(function (response) {
            return  response.data;
        })
        .catch(function (error) {
            return error;
        });
    }
}
