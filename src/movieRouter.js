import { Router } from 'express';
import { getData } from './data.js';
import { getCache, setCache, clearCache } from './redisCache.js';

const movieRouter = Router();

movieRouter.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params;
  (async () => {
    //Check first if the data is already cached instead of making a new request
    let data = await getCache(movieId);

    if (data !== "null") 
        return res.json(data);
        
    data = await getData(movieId);
    if (data !== null) {
      //In-case new data is requested, it's cached after
      await setCache(movieId, data);
      return res.json(data);
    }
    return res.status(500);
  }) ();
});

movieRouter.delete(':/movieId', (req, res, next) => {
  const { movieId } = req.params;
  (async () => {
    let result = await clearCache(movieId);
    if (result === 1) {
      return res.json({
        Result: 'Movie successfully deleted from Redis Cache',
      });
    }
    return res.json({
      Result: `There is no value depend of key in Redis Server: ${movieId}`,
    });
  })();
});

export { movieRouter };
