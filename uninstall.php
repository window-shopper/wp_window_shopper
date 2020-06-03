<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

function wpws_deleteTable($table_name) {
  global $wpdb;
  $sql = "DROP TABLE IF EXISTS $table_name;";
  $wpdb->query($sql);
}

wpws_deleteTable("wp_wpws_templates");
wpws_deleteTable("wp_wpws_product_boxes");
wpws_deleteTable("wp_wpws_categories");


