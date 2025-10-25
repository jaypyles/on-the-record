import segment.analytics as analytics
from on_the_record.constants import SEGMENT_WRITE_TOKEN
from on_the_record.models.track import TrackingEvent

analytics.write_key = SEGMENT_WRITE_TOKEN


class Segment:
    @staticmethod
    def track_add_to_cart(user_id: str | None, item: dict, anonymous_id: str | None):
        """
        Track when a user adds an item to their cart.
        """
        analytics.track(
            user_id=user_id,
            event=TrackingEvent.ADD_TO_CART.value,
            properties=item,
            anonymous_id=anonymous_id,
        )

    @staticmethod
    def track_remove_from_cart(
        user_id: str | None, item: dict, anonymous_id: str | None
    ):
        analytics.track(
            user_id=user_id,
            event=TrackingEvent.REMOVE_FROM_CART.value,
            properties=item,
            anonymous_id=anonymous_id,
        )

    @staticmethod
    def track_checkout(
        user_id: str | None, total: float, items: list[dict], anonymous_id: str | None
    ):
        analytics.track(
            user_id=user_id,
            event=TrackingEvent.REMOVE_FROM_CART.value,
            properties={"total": total, "items": items},
            anonymous_id=anonymous_id,
        )
