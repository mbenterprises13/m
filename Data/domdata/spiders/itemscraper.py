import scrapy


class ItemscraperSpider(scrapy.Spider):
    name = "itemscraper"
    allowed_domains = ["domsindia.com"]
    start_urls = [f"https://domsindia.com/product-category/pen-writing-instruments/page/{i}/" for i in range(1, 3)]
    custom_settings = {
        'DOWNLOAD_DELAY': 2,  
        'CONCURRENT_REQUESTS': 1,  
        'AUTOTHROTTLE_ENABLED': True, 
        'AUTOTHROTTLE_START_DELAY': 2,  
        'AUTOTHROTTLE_MAX_DELAY': 10,  
        'FEEDS': {'Pens & Writing Instruments/Pens&WritingInstruments.json': {'format': 'json', 'overwrite': False}}
    }

    def parse(self, response):
        for item in response.css('.woocommerce-LoopProduct-link.woocommerce-loop-product__link'):
            yield {
                'title': item.css('h2.woocommerce-loop-product__title::text').get(),
                'image': item.css('img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail::attr(src)').get().replace('-300x300', ''),
            }