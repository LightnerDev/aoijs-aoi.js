const Interpreter = require("../../core/interpreter.js");
module.exports = async (oa, na, client) => {
    const cmds = client.cmd?.autoModUpdate.V();
    if (!cmds) return;
    let chan;
    const data = {
        guild: na.guild,
        client: client,
    };
    for (const cmd of cmds) {
        if (cmd.channel?.includes("$")) {
            const id = await Interpreter(
                client,
                data,
                [],
                { name: "ChannelParser", code: cmd.channel },
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
            { automodAction: na, oldautomodAction: oa },
            chan,
        );
    }
};
