<?php
require_once 'dbconfig.php';

global $conf_db;

	class Conexion extends PDO 
	{ 
		// Datos de la conexion
                private $confdb;
                      
                public function __construct() {
                    global $confdb;
                    $this->confdb=$confdb;
			try{
                                parent::__construct($this->confdb['server'].';dbname='.$this->confdb['dbname'], $this->confdb['user'], $this->confdb['pass'], array(\PDO::MYSQL_ATTR_INIT_COMMAND =>  'SET NAMES utf8') );
			}catch(PDOException $e){
				echo 'Error: ' . $e->getMessage();
				exit;
			}
		}

		public function utf_8($Con)
		{
			$Con->query("SET character_set_results=utf8");
			$Con->query("SET NAMES 'utf8'");

			return $Con;
		}
	} 


	// Creando conexion a la base de datos
	//$BD = new Conexion();


?>