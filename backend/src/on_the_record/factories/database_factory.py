from on_the_record.database import BandItemDB


class DatabaseFactory:
    @staticmethod
    def artist_factory(item: BandItemDB):
        return {
            "id": item.id,
            "band": item.band,
            "title": item.title,
            "item_type": item.item_type,
            "image_url": item.image_url,
            "genre": item.genre,
            "format": item.format,
            "price": item.price,
        }
