import { Storage } from '@google-cloud/storage'
import { Readable } from 'stream'

export default async function uploadBuffer(buffer: Buffer, destinationFileName: string) {

  const storage = new Storage({ keyFilename: './key.json' })
  const bucket = storage.bucket('educai-bucket')
  const blob = bucket.file(destinationFileName)
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  const bufferStream = new Readable({
    read() {
      this.push(buffer)
      this.push(null)  // Signal the end of the data
    }
  })

  bufferStream.pipe(blobStream)

  return new Promise<void>((resolve, reject) => {
    blobStream.on('error', err => reject(err))
    blobStream.on('finish', () => {
      console.log(`Upload complete: ${destinationFileName}`)
      resolve()
    })
  })

  const fileName = `gs://educai-bucket/${destinationFileName}`
}
