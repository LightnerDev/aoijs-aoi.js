module.exports = async d => {
    const data = d.util.openFunc( d );
    if( data.err ) return d.error( data.err );

    const [ userId,guildId= d.guild?.id,reason ] = data.inside.splits;

    const guild = d.util.getGuild( d,guildId );
    if( !guild ) return d.aoiError.fnError( d,'guild',{ inside : data.inside });

    const member = await d.util.getMember( guild,userId );
    if( !member ) return d.aoiError.fnError( d,'member',{ inside : data.inside});

    member.kick( reason?.addBrackets() );

    return {
        code : d.util.setCode( data )
    }
}