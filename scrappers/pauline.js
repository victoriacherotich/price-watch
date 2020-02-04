const cheerio = require('cheerio');
const request = require('request');

function search(item){
    return new Promise((resolve, reject) => {
        const url= `http://paulinecosmetics.com/search?q=${item}&type=product`
        request(url, (err, resp, body) => {
            if (err){
                return reject(err);
            }
        
            const $ = cheerio.load(body);
            const products = $('.products').children().map((i, elm) => {
                const product = {
                    title: $(elm).find('.woocommerce-loop-product__title').text(), 
                    price: $(elm).find('.price .woocommerce-Price-amount .woocommerce-Price-currencySymbol').text(), 
                    img: {
                        src: $(elm).find('.product_thumbnail ').attr('src'),
                        alt: $(elm).find('.product_thumbnail ').attr('alt')
                    }
                }

	
			
                return product;
            }).toArray();
                    
            resolve(products);
        });
    })
}

module.exports.search = search;