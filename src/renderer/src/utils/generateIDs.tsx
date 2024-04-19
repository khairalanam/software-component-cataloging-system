function generateRandomString(length): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export async function generateCatalogId(): Promise<string> {
  const existingCatalogs = await window.db.db.fetchCatalogs()

  let newId
  do {
    newId = 'CAT-' + generateRandomString(12)
  } while (existingCatalogs.some((row) => row.id === newId))

  return newId
}

export async function generateComponentId(): Promise<string> {
  const existingComponents = await window.db.db.fetchComponents()

  let newId
  do {
    newId = 'COMP-' + generateRandomString(12)
  } while (existingComponents.some((row) => row.id === newId))

  return newId
}
