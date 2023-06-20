[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/FadZhxrK)


<p>załączone pliki .yaml pozwalają na odpalenie keycloak, api oraz aplikacji frontend(client) w kubernetes.<br/>
Niestety z niewyjaśnionej przyczyny api nie potrafi uzyskać prawidłowej odpowiedzi od keycloaka kiedy jest uruchomione w<br/>
klastrze kubernetes. Można więc odpalić api za pomocą npm install => node index.js lub spróbować uruchomić za pomocą dockera używając<br/>
obrazu mwrobel02/bp-api:1.0 z wyeksponowanym portem 3001.</p>

<p>Po odpaleniu keycloaka w kubernetes trzeba jeszcze zimportować najpierw realm używając projectRealm.json, a następnie <br/>
klienta używając backendClient.json (z jakiegoś powodu jeśli do exportu realm dodawałem tego klienta to przy imporcie występował <br/>niesprecyzowany błąd). Aplikacje testowałem używając dwóch użytkowników: regular-user oraz admin-user i dla nich api ma dodatkowe dane.</p>

<p>Aplikacja działa następująco:
<ul>
    <li>Użytkownik loguje sie (lub wczesniej rejestruje) poprzez keycloak</li>
    <li>client po zalogowaniu otrzymuje token</li>
    <li>Po zalogowaniu wyświetla się nazwa użytkownika. Można wejść na stronę /admin jeśli ma się odpowiednią rolę</li>
    <li>Po wejściu na stronę /about wysyłane jest zapytanie do serwera express(endpoint /api/data) razem z tokenem. Wtedy serwer używając tokena i sekretu klienta próbuje uzyskać za ich pomocą autoryzację od keycloaka (backendClient). Jeśli uzyska autoryzacje odsyła dodatkowe dane</li>
    <li>Porty: keycloak:8080, client:3000, api:3001</li>
</ul>

Frontend korzysta z PKCE<br/>
Użytkownik uważany jest za admina po przypisaniu mu roli "adminRole"<br/>
Jeśli sekret klienta z jakiegokolwiek powodu się zmieni można go podmienić w pliku /server/.env

 </p>