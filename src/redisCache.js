import redis from 'async-redis';

const client = redis.createClient(6379);
const expirationTime = 300; //second
const movieFormat = 'movie.id=';

async function setCache(movieId, data){
    let key = movieFormat+movieId;
    return await set(key, JSON.stringify(data));
}

async function set(key, data){
    await client.setex(key, expirationTime, data);
}

async function getCache(movieId){
    let key = movieFormat+movieId;
    let data = await get(key);
    return JSON.stringify(data);
}

async function get(key){
    return await client.get(key);
}

async function clearCache(movieId){
    let key = movieFormat+movieId;
    return await clear(key);
}

async function clear(key){
    return await client.del(key);
}

export {clearCache, getCache, setCache};