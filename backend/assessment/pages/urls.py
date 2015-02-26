from django.conf.urls import patterns, url
from pages import views

urlpatterns = patterns('',
    url(r'^(?P<pk>[0-9]+)-(?P<slug>.*)$', views.view, name='view'),
)
