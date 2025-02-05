//import db from '../lib/database.js'

let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `✳️Reply to a message with *${usedPrefix + command}*`
    if (!m.quoted.fileSha256) throw '⚠️ menciona el mensaje'
    if (!text) throw `✳️ falta el comando`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw '⚠️ No tienes permiso para cambiar este comando de pegatina'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`✅ command saved`)
}


handler.help = ['cmd'].map(v => 'set' + v + ' <txt>')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler
