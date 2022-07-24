<?php
	session_start();
	if ($_SESSION['LOGGEDIN'] != '1') {
	  header("Location: ../../brok-wbui/login.php");
	}
	include '../../brok-wbui/views/header.php';

	$specific_person_hideshow = array('asic.underwriter1@gmail.com');

	if (in_array($_SESSION['userid'], $specific_person_hideshow)) {
		$specific_diable = "disabled='disabled'";
		$specific_diable_hide = "style='display: none;'";
		$specific_diable_style = "style='pointer-events: none!important;'";
	} else  {
		$specific_diable = "";
		$specific_diable_hide = "";
		$specific_diable_style = "";
	}
?>