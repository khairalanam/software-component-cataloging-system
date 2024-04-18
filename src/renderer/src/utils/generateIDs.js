import { db } from '@main/index'

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export async function generateCatalogId() {
  const database = await db
  const existingIds = await database.all('SELECT id FROM catalogs')

  let newId
  do {
    newId = 'CAT-' + generateRandomString(12)
  } while (existingIds.some((row) => row.id === newId))

  return newId
}

export async function generateComponentId() {
  const database = await db
  const existingIds = await database.all('SELECT id FROM components')

  let newId
  do {
    newId = 'COMP-' + generateRandomString(12)
  } while (existingIds.some((row) => row.id === newId))

  return newId
}
