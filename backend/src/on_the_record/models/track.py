from enum import Enum


class TrackingEvent(Enum):
    ADD_TO_CART = "Add to Cart"
    REMOVE_FROM_CART = "Remove from Cart"
    CHECKOUT = "Checkout"
    DISCOUNT_USED = "Discount Used"
