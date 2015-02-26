from django.contrib import admin
from qa.models import Question, Answer, Category


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('value', 'category', 'is_accepted')
    pass


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('pk', 'question', 'user', 'is_public', 'created_at')
    pass


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'pk')
    pass


admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Category, CategoryAdmin)