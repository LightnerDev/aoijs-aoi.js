const Interpreter = require("../../core/interpreter.js");
module.exports = async (olde, newe, client) => {
    const cmds = client.cmd?.emojiUpdate.V();

    const data = { guild: newe.guild, client: client };
    let chan;
    for (const cmd of cmds) {
        if (cmd?.channel?.includes("$")) {
            const id = await Interpreter(
                client,
                data,
                [],
                { name: "ChannelParser", code: cmd?.channel },
                client.db,
                true,
            );
            chan = client.channels.cache.get(id?.code);
            data.channel = chan;
        } else {
            chan = client.channels.cache.get(cmd.channel);
            data.channel = chan;
        }
        await Interpreter(
            client,
            data,
            [],
            cmd,
            client.db,
            false,
            chan?.id,
            { olde: olde, newe: newe },
            chan,
        );
    }
};
