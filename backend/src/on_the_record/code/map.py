from typing import Callable

from .modifiers import apply_discount

DISCOUNT_MAP: dict[str, Callable[[float], float]] = {
    "20_OFF": lambda total: apply_discount(total, 20),
}
