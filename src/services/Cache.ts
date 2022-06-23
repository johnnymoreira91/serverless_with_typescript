import { createClient } from 'redis';
// const { promisify } = require("util");
const DEFAULT_URL = 'redis://127.0.0.1:6379'
const PREFIX = '__prefix:'

async function Cache() {
  const client = createClient({
    url: `${process.env.REDIS_HOST}` || DEFAULT_URL,
    password: process.env.REDIS_PASSWORD || 'Redis2022!'
  })

  client.on('data', () => console.log('redis ready'))
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect()

  return client
}

async function setCache(obj, value, ttl = 30) {
  const data = (await Cache()).set(`${obj}${PREFIX}`, JSON.stringify(value), {
    EX: ttl
  })
  return data
}

async function getCache(obj) {
  try {
    const data = await (await Cache()).get(`${obj}${PREFIX}`)
    return JSON.parse(data)
  } catch (error) {
    return error
  }
}

async function delKeyCache(obj) {
  const data = (await Cache()).del(`${obj}${PREFIX}`)
  return data
}

async function flushCache() {
  const data = await (await Cache()).flushAll()
  return data
}

export {
  Cache,
  setCache,
  getCache,
  delKeyCache,
  flushCache
}
