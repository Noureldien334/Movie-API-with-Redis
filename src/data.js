import fetch from 'node-fetch';

const dataSourceUrl = 'http://www.omdbapi.com?apikey=[Put your API KEY]&i=';

async function getData(movieId) {
  try {
    const response = await fetch(dataSourceUrl + movieId);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export {getData};