from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
from pages.models import Page
import django.template as template

def view(request, slug):
    if '/' in slug:
        slug_arr = slug.split('/')
        slug_arr.pop(0)
        slug = '/'.join(slug_arr)

    page = get_object_or_404(Page, slug=slug, is_published=True)
    return render(request, 'pages/view.html', {"page" : page})

def static_view(request, page="home"):
    return _load_template_or_404(request, 'pages/' + page + '.html')

def _load_template_or_404(request, page_url):
    try:
        template.loader.get_template(page_url)
        return render(request, page_url)
    except template.TemplateDoesNotExist:
        raise Http404