import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const useFirestore = () => {
  initializeApp()

  const db = getFirestore()
  const saveObject = async ({ collection, id, data }) => {
    const collectionRef = db.collection(collection)
    if (id) {
      const docRef = collectionRef.doc(id)
      await docRef.set(data)
    }
    else {
      await collectionRef.add(data)
    }
  }

  return {
    saveObject
  }
}
