const Parser = require('rss-parser');
const parser = new Parser();

async function getRss(url)
{
    const feed = await parser.parseURL(url); //'https://www.polsatnews.pl/rss/wszystkie.xml'
    let items = [];

    await Promise.all(feed.items.map(async (currentItem) => {

        if(items.filter((item) => item === currentItem).length <= 1)
        {
            items.push(currentItem);
        }

    }));

    return items;
}

module.exports.get = getRss;