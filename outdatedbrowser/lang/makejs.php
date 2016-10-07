<?php

$files = glob('*.html');
foreach($files as $file) {
	$json = json_encode(str_replace(array("\r", "\n"), '', trim(file_get_contents($file))));

	file_put_contents(str_replace('.html', '.js', $file), 'window.__outdated_HTMLTEXT=' . $json . ';');
	echo $file, "\n";
}
