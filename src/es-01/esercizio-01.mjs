import * as fs from  'node:fs'
import {Buffer} from 'node:buffer'

const data = new Uint8Array(Buffer.from("Ciao Andrea!"))

fs.writeFile("esercizio-01.txt", data, (err) =>{
    if(err){
        console.error(err)
        return
    }
    console.log('file salvato ocn successo!')
})