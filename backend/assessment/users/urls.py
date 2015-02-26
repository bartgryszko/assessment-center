from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from users import views

router = SimpleRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^users/current/$', views.LoggedUserView.as_view(),
        name='user-current'),
    url(r'^', include(router.urls)),
]
