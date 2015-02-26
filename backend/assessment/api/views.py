from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

API_ROUTES = (
    ('users', 'user-list'),
    ('user-current', 'user-current'),
    ('questions', 'question-list'),
    ('answers', 'answer-list'),
    ('user-answers', 'user-answer-list'),
    ('categories', 'category-list')
)

@api_view(('GET',))
def api_root(request, format=None):
    routes = {
        name: reverse(route, request=request, format=format)
        for (name, route) in API_ROUTES
    }

    return Response(routes)