import * as db from './database'
import { encrypt, decrypt } from '../common/encryption'

const initialize = () => db.init()

const fetch = async ( key ) => {
  console.log( '**DB** Fetch' )
  try {
    const data = await db.fetch()
    if ( data.rows._array.length === 0 ) {
      return
    }
    const encryptedDatabase = data.rows._array[ 0 ].encData
    const database = decrypt( encryptedDatabase, key )

    return database
  } catch ( err ) {
    console.log( err )
  }
}

const insert = async ( database, key, inserted = true ) => {
  console.log( '**DB** Insert' )
  const encryptedDatabase = encrypt( database, key )

  try {
    inserted
      ? await db.update( encryptedDatabase )
      : await db.insert( encryptedDatabase )
  } catch ( err ) {
    console.log( err )
    return false
  }
  return true
}

export default {
  initialize,
  fetch,
  insert,
}
