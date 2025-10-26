import logging
from typing import Callable

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

logger = logging.getLogger("uvicorn")


class ScheduledTasks:
    def __init__(self):
        # BackgroundScheduler runs in the same process as FastAPI
        self.scheduler = BackgroundScheduler()
        self.jobs = []

    def add_task(self, func: Callable, seconds: int = 1, job_id: str | None = None):
        """
        Add a repeating task to the scheduler.
        :param func: Callable function to run
        :param minutes: Run every X minutes
        :param job_id: Optional ID to avoid duplicate jobs
        """
        job = self.scheduler.add_job(
            func,
            trigger=IntervalTrigger(seconds=seconds),
            id=job_id,
            replace_existing=True,
        )
        self.jobs.append(job)
        logger.info(f"Added scheduled task {func.__name__} every {seconds} seconds(s)")

    def start(self):
        if not self.scheduler.running:
            self.scheduler.start()
            logger.info("Scheduler started")

    def shutdown(self):
        if self.scheduler.running:
            self.scheduler.shutdown()
            logger.info("Scheduler stopped")
