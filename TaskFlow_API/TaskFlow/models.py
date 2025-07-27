from django.db import models
from django.contrib.auth.models import User  



# =========================
# MAESTROS / CATÁLOGOS
# =========================

class Cliente(models.Model):
    nombre = models.CharField(max_length=150)
    nit = models.CharField(max_length=50, blank=True, null=True)
    correo = models.EmailField(max_length=150, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nombre

class ClienteSede(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    nombre_sede = models.CharField(max_length=150)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    correo = models.EmailField(max_length=150, blank=True, null=True)

    class Meta:
        unique_together = ('cliente', 'nombre_sede')

    def __str__(self):
        return f"{self.nombre_sede} - {self.cliente.nombre}"

class EstadoServicios(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class TipoServicio(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

# =========================
# OPERACIÓN
# =========================

class Solicitud(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    sede = models.ForeignKey(ClienteSede, on_delete=models.CASCADE)
    tipo_servicio = models.ForeignKey(TipoServicio, on_delete=models.CASCADE)
    estado = models.ForeignKey(EstadoServicios, on_delete=models.CASCADE)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    usuario_creacion = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='solicitudes_creadas')

    def __str__(self):
        return f"Solicitud #{self.id} - {self.cliente.nombre}"

class Formulario(models.Model):
    solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE)
    usuario_soporte = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='formularios_soporte')
    hora_inicio = models.DateTimeField(blank=True, null=True)
    hora_fin = models.DateTimeField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    firma_tecnico = models.BinaryField(blank=True, null=True)
    firma_cliente = models.BinaryField(blank=True, null=True)

    def __str__(self):
        return f"Formulario #{self.id} - Solicitud #{self.solicitud.id}"

# =========================
# REPUESTOS
# =========================

class Repuesto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre

class FormularioRepuesto(models.Model):
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE)
    repuesto = models.ForeignKey(Repuesto, on_delete=models.CASCADE)
    cantidad_utilizada = models.IntegerField()

    def __str__(self):
        return f"{self.cantidad_utilizada} x {self.repuesto.nombre} en Formulario #{self.formulario.id}"
