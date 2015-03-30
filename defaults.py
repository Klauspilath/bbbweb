
from mezzanine.conf import register_setting

register_setting(
    name="TICKETS_BOX_OFFICE_PURCHASE_URL",
    description="The URL for Ticket Purchases",
    editable=True,
    default='http://webtixs2.easytixs.com/BeachBlanketBabylon/?key=7011-GTH567',
)


# register_setting(
#     name="TICKETS_BOX_OFFICE_PHONE_NUMBER",
#     description="The Box Office Phone Number",
#     editable=True,
#     default='415.421.4222',
# )
#
register_setting(
    name="TICKETS_ENABLE_MOBILE_CALLS",
    description="Enable box office calls on mobile",
    editable=True,
    default=True,
)
