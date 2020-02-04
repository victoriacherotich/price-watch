const cheerio = require('cheerio');
const request = require('request');

function search(item){
    return new Promise((resolve, reject) => {
       // const url= `http://zaron.com.ng/search?q=${item}&type=product`
        const url= `http://zaron.com.ng/shop/`
        request(url, (err, resp, body) => {
            if (err){
                return reject(err);
            }
        
            const $ = cheerio.load(body);
            const products = $('.products columns-2').children().map((i, elm) => {
                const product = {
                    title: $(elm).find('.woocommerce-loop-product__title').text(), 
                    price: $(elm).find('.price .woocommerce-Price-amount amount').text(), 
                    img: {
                        src: $(elm).find('.woocommerce-LoopProduct-link woocommerce-loop-product__link').attr('src'),
                        alt: $(elm).find('.woocommerce-LoopProduct-link woocommerce-loop-product__link').attr('alt')
                    }
                }

                return product;
            }).toArray();
                    
            resolve(products);
        });
    })
}

module.exports.search = search;