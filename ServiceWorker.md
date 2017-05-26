# Service Worker

&nbsp; &nbsp;&nbsp;&nbsp;**_Service worker_** es un programa que corre en el _background_ del navegador, obteniendo independencia de la página que se visita. Esta nueva tecnología ofrece características a los desarrolladores para brindar una mejor experiencia al usuario en el campo del **_offline_**.

## AppCache

En los últimos meses, el mundo del **_offline_** ha tenido mucha atención en el mundo del desarrollo web y móvil. Sin embargo, desde hace algunos años ya se contaba con la tecnología **_Application Cache_** que nos brindaba lo siguiente:

- **Offline browsing**: los usuarios pueden navegar el sitio cuando no se tiene conexión desde el cache.
- **Speed**: los recursos del sitio, al ser cargados desde el disco duro, minizan el tiempo de carga.
- **Resilience**: si el servidor donde se aloja el sitio se apaga por algún problema, los usuarios podrán navegar sobre el sitio desde su cache.

Sin embargo, este tipo de tecnología, en la práctica daba más problemas que soluciones. Algunas de sus fallas son las siguientes:

- **Always cache**: los recursos siempre eran servidos desde el cache, lo que dificultaba la actualización de la información, aún cuando el usuario tuviera conexión o el servidor estuviera _online_.
- **No dynamism**: la lista que especifica los recursos a ser almacenados es una lista rígida que no se actualiza.
- **Cache the .appcache**: el archivo encargado de especificar los recursos a almacenar se almacenaba a sí mismo, esto conducía a demasiados problemas al tratar de actualizar la lista de recursos.
- **Non-cached Resources**: si en la lista de recursos a almacenar se especificaba _index.html_ pero no las imágenes dentro de esta, no serían almacenadas.

## Service Worker API

Para tratar de solucionar los problemas que exponía el uso de _AppCache_ se creó **service worker API**.
Básicamente es un archivo que actua como un _proxy server_ entre el navegador, la página o aplicación y la red, en caso de que se encuentre disponible. La intención de este servicio es el poder brindar experiencias fuera de línea al interceptar la comunicación entre el cliente y el servidor y poder actuar dependiendo de las solicitudes y de la disponibilidad de la red.
### Conceptos y uso
Un _service worker_ es un programa orientado a a eventos que se registra desde un dominio. Este programa es un archivo escrito en _javascript_ que tiene el control de un sitio o página asociado con el dominio para la intercepcióny modificación de las peticiones, los recursos y el alamacenamiento de los mismos.

El programa, al correr en el _background_, no tiene acceso al DOM y corre en un plano diferente al que corren los demás archivos de _javascript_ para evitar el bloqueo en la carga del sitio. Ésta tecnología está diseñada para ser completamente asíncrona, por ello, no es posible usar APIs síncronas como **_XHR_** o **_localStorage_**

Al ser un _proxy_ entre el sitio y el servidor, por medidas de seguridad, sólo es posible ser usado sobre conexiones **HTTPS**, o para medidas de prueba, en **_localhost_**.

#### Registro, descarga, instalación y activación
Un _service worker_ primero necesita ser registrado haciendo uso del método _.register()_. Si el registro es exitosos el programa es descargado al cliente para continuar con la instalación y su activación.

Después de ser registrado, el _service worker_ entra en un ciclo de Descarga -> Instalación -> Activación. Después de su descarga, el programa verifica la actualización cada 24 horas. El proceso de instalación inicia cuando se encuentra que el archivo es nuevo (_byte-wise compared_). Si se sabe que es el primer _service worker_ inicia el proceso de activación. Si se ecnuentra uno instalado con anterioridad, la nueva versión se instala, pero no se activa sino hasta que el de la versión anterior termina de descargar los recursos solicitados.

Existe un evento que es llamado cuando un _service worker_ es activado, es aquí donde se sugiere hacer una limpieza para borrar tanto recursos en cache, como _service workers_.

#### Ciclo de vida
1. Registro: la URL a la que se llama registra un _service worker_ con el método _.register()_
2. Si el registro es exitoso, el _service worker_ se ejecuta en un _Global Scope_ fuera del hilo principal sin acceso al _DOM_.
3. El _service worker_ se encuentra listo para procesar eventos.
4. Instalación: el evento de instalación es el primer evento en ser lanzado, es donde ocurre el primer almacenamiento de los recursos del sitio.
5. Cuando el evento _oninstall_ termina, se considera como instalado.
6. Activación: el siguiente evento es _activate_. El principal uso de este evento es la limpieza de viejos recursos o de versiones anteriores del _service worker_
7. El _service worker_ tiene el control del sitio, pero sólo de los recursos solicitados después del evento _register(). Es por ello que, para probar su correcto funcionamiento, deberemos refrescar la página actual.
