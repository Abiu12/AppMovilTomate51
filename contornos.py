import cv2
import numpy as np

# Cargar la imagen en escala de grises
imagen = cv2.imread('p.jpg', 0)

# Aplicar un umbral para convertir la imagen en una imagen binaria
_, umbral = cv2.threshold(imagen, 240, 255, cv2.THRESH_BINARY)

# Encontrar contornos en la imagen binaria
contornos, _ = cv2.findContours(umbral, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Dibujar los contornos en la imagen original
imagen_contornos = cv2.drawContours(imagen.copy(), contornos, -1, (0, 0, 255), 2)

# Mostrar la imagen con los contornos
cv2.imshow('Contornos', imagen_contornos)
cv2.waitKey(0)
cv2.destroyAllWindows()
