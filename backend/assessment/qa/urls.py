from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from qa import views

router = SimpleRouter()
router.register(r'answers', views.AnswerViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'user-answers', views.UserAnswerViewSet,
                base_name='user-answer')

urlpatterns = [
    url(r'^', include(router.urls)),
]
