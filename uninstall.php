<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

function deleteTable($table_name) {
  global $wpdb;
  $sql = "DROP TABLE IF EXISTS $table_name;";
  $wpdb->query($sql);
}

deleteTable("wp_wpws_templates");
deleteTable("wp_wpws_product_boxes");
deleteTable("wp_wpws_categories");


