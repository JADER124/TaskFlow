from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    """
    Autenticación que acepta:
    - Authorization: Bearer <token> (normal)
    - O, si falta, lee 'access_token' de la cookie HttpOnly
    """
    def authenticate(self, request):
        # 1) Intento normal por header
        header = self.get_header(request)
        if header is not None:
            return super().authenticate(request)

        # 2) Si no hay header, intento por cookie
        
        raw_token = request.COOKIES.get("access_token")
        print("DEBUG iPhone - cookie presente?", bool(raw_token), "valor:", raw_token[:20] if raw_token else None)
        if not raw_token:
            return None

        validated_token = self.get_validated_token(raw_token)
        return (self.get_user(validated_token), validated_token)
