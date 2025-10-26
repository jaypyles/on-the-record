import requests
from on_the_record.constants import PROFILE_AUTH_TOKEN, SPACE_ID
from requests.auth import HTTPBasicAuth


class Profiles:
    url = (
        f"https://profiles.segment.com/v1/spaces/{SPACE_ID}/collections/users/profiles"
    )

    @classmethod
    def get_user_audience(cls, user_id: str):
        user_url = f"{cls.url}/user_id:{user_id}/traits?class=audience"
        resp = requests.get(user_url, auth=HTTPBasicAuth(PROFILE_AUTH_TOKEN, ""))
        resp.raise_for_status()
        json = resp.json()

        if json["traits"]:
            return json["traits"]

        return {}

    @classmethod
    def get_user_traits(cls, user_id: str):
        user_url = f"{cls.url}/user_id:{user_id}/traits"
        resp = requests.get(user_url, auth=HTTPBasicAuth(PROFILE_AUTH_TOKEN, ""))
        resp.raise_for_status()
        json = resp.json()

        if json["traits"]:
            return json["traits"]

        return {}
