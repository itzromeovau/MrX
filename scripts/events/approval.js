const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "rulex/Loufi",
    shortDescription: {
      en: "approval mode by loufi",
      vi: "Rời khỏi tất cả các nhóm trừ những nhóm được liệt kê trong threads.json"
    },
    longDescription: {
      en: "Leaves all groups except those in threads.json and sends a message to the owner of the bot",
      vi: "Rời khỏi tất cả các nhóm trừ những nhóm được liệt kê trong threads.json và gửi một tin nhắn cho chủ sở hữu của thread ID 4"
    },
    category: "event"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "100080202774643";
    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;
    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('approvedThreads.json'));
    } catch (err) {
      console.error('', err);
    }
    if (!threads.includes(groupId) && (event.logMessageType == "log:subscribe") ) {
      message.send({body:"❌ | Added bot without admin's permission!!!\n❏Take permission from Admin Bot to use the Bot.\n❏Join Yuuki Bot Support group:\nhttps://m.me/j/AbbXRrvxxJeVzOww/\n\n\n— Asuna Yuuki",attachment: await getStreamFromURL("https://i.imgur.com/nJ1JiJp.jpg")});
      setTimeout(() => {
        api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        api.sendMessage(`❌ Bot is added to a new group named: ${name} without approval \n❏Tid:${groupId}\n❏Name: ${name}\n❏Type:\n${global.GoatBot.config.prefix}approve add ${groupId}`, uid);
      }, 2500); // 2.5 seconds delay
    }
  }
  }
