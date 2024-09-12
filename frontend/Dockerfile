FROM nginx:alpine as build

# Удаляем стандартные конфигурационные файлы
RUN rm /etc/nginx/conf.d/default.conf

# Копируем кастомную конфигурацию
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/
# Копируем статические файлы
COPY . /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
