from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from api.views import api_root
from pages import views as pages_view

urlpatterns = patterns('',
    url(r'^$', pages_view.static_view, name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace="rest_framework")),
    url(r'', include('pages.urls', namespace="pages")),
    url(r'^', include('qa.urls')),
    url(r'^', include('users.urls')),
    url(r'^api/', api_root)
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))