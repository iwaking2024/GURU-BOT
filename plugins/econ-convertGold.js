
const xppercredit = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buy/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xppercredit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xppercredit * count) {
    global.db.data.users[m.sender].exp -= xppercredit * count
    global.db.data.users[m.sender].credit += count
    conn.reply(m.chat, `
┌─「 *PAYMENT NOTE* 」
‣ *Nominal purchase* : + ${count} 
‣ *Spent* : -${xppercredit * count} XP
└──────────────`, m)
  } else conn.reply(m.chat, `❎Lo siento, no tienes suficiente *XP* comprar *${count}* Gold\n\n Puedes obtener *XP*utilizando los comandos del *games and economy menu*`, m)
}
handler.help = ['buy', 'buyall']
handler.tags = ['economy']
handler.command = ['buy', 'buyall'] 

handler.disabled = false

export default handler
