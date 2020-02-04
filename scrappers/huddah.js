const cheerio = require('cheerio');
const request = require('request');

function search(item){
    return new Promise((resolve, reject) => {
       const url= `https://huddahstore.com/?post_type=product&s=lip`
      
        request(url, (err, resp, body) => {
            if (err){
                return reject(err);
            }
        
            const $ = cheerio.load(body);
            const products = $('.products columns-2').children().map((i, elm) => {
                const product = {
                    title: $(elm).find('.mpcth-post-title').text(), 
                    price: $(elm).find('.price').text(), 
                    img: {
                        src: $(elm).find('.mpcth-post-thumbnail').attr('src'),
                        alt: $(elm).find('.mpcth-post-thumbnail').attr('alt')
                    }
                }

                return product;
            }).toArray();
                    
            resolve(products);
        });
    })
}

module.exports.search = search;