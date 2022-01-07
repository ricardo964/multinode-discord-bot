const path = require ('path');
const { ShardingManager } = require('discord.js');
const {token} = require('../config.json');

const manager = new ShardingManager(path.join(__dirname,'app.js'), { token: token });

function main(){
    manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
    manager.spawn();
}

main()

