from rest_framework import routers
from .api import PersonViewSet

router = routers.DefaultRouter()
router.register('api/person',PersonViewSet, 'person')

urlpatterns = router.urls