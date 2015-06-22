<?php

if($_SERVER['argc'] != 2) die("php makejs.php lang.html\n");
$json = json_encode(str_replace(array("\r", "\n"), '', trim(file_get_contents($_SERVER['argv'][1]))));

file_put_contents(str_replace('.html', '.js', $_SERVER['argv'][1]), 'window.__outdated_HTMLTEXT='.$json.';');
