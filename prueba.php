<?php $pipeName = 'cloudsql/wavydrive:europe-west1:wavydrive-main';
$username = 'wavydrive';
$password = '*WavyDrive2018*';


try {
    $gbd  = new PDO('mysql:unix_socket='.$pipeName, $username, $password);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}