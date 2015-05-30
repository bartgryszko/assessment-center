from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer, CurrentUserSerializer, \
    UserSelectedCategorySerializer
from users.permissions import CurrentUserInstancePermission
from users.models import User


class LoggedUserView(APIView):
    """
    Get current logged user
    """
    def get(self, request):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        return Response(CurrentUserSerializer(request.user).data)


class UserSelectedCategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = UserSelectedCategorySerializer
    permission_classes = (permissions.IsAuthenticated,
                          CurrentUserInstancePermission)

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer