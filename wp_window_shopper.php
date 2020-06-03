<?php
/**
 * @link              https://getwpws.com/
 * @since             1.0.0
 * @package           WP_Window_Shopper
 *
 * @wordpress-plugin
 * Plugin Name:       WP Window Shopper
 * Plugin URI:        https://getwpws.com/
 * Description:       A Plugin for creating an managing product boxes.
 * Version:           1.0.0
 * Author:            wpwindowshopper
 * Author URI:        https://profiles.wordpress.org/wpwindowshopper/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-window-shopper
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! defined('ABSPATH') ) {
  die;
}

if ( ! function_exists('add_action') ) {
  die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WP_Window_Shopper_VERSION', '1.0.0' );

// Admin Page
add_action('admin_menu', 'my_wpws_menu');
function my_wpws_menu() {
  add_menu_page('WP Window Shopper', 'Window Shopper', 'manage_options', 'wp-window-shopper', 'wpws__admin_index', 'dashicons-cart');
}
function wpws__admin_index() {
  $x = wp_localize_script( '', 'WP_API_Settings', array(
    'endpoint' => esc_url_raw( rest_url() ),
    'nonce' => wp_create_nonce( 'wp_rest' )
  ));
  echo '<script>window.WP_API_Settings = {endpoint: "' . esc_url_raw( rest_url() ) . '", nonce : "' . wp_create_nonce( 'wp_rest' ) . '"};</script>';
  require_once plugin_dir_path(__FILE__) . 'wpp-admin/build/index.html'; 
}

// ____ DB init
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
global $wpdb;

//_____ DB management
$wpws_charset_collate = $wpdb->get_charset_collate();
// create productBoxes table
$product_boxes_table_name = $wpdb->prefix . 'wpws_product_boxes';
$wpws_create_product_boxes_table = "CREATE TABLE $product_boxes_table_name (
  id mediumint(9) NOT NULL AUTO_INCREMENT,
  json varchar(100000),
  UNIQUE KEY id (id)
) $wpws_charset_collate;";
dbDelta( $wpws_create_product_boxes_table );

// create templates table
$wpws_templates_table_name = $wpdb->prefix . 'wpws_templates';
$wpws_create_templates_table = "CREATE TABLE $wpws_templates_table_name (
  id mediumint(9) NOT NULL AUTO_INCREMENT,
  json varchar(100000),
  UNIQUE KEY id (id)
) $wpws_charset_collate;";
dbDelta( $wpws_create_templates_table );

// create categories table
$wpws_categories_table_name = $wpdb->prefix . 'wpws_categories';
$wpws_create_categories_table = "CREATE TABLE $wpws_categories_table_name (
  id mediumint(9) NOT NULL AUTO_INCREMENT,
  category varchar(100),
  UNIQUE KEY id (id)
) $wpws_charset_collate;";
dbDelta( $wpws_create_categories_table );

function wpws__DBgetProductBoxByID($ID) {
  global $wpdb;
  $result = $wpdb->get_results("SELECT json from wp_wpws_product_boxes WHERE id =" . $ID);
  return $result[0]->json;
}
function wpws__DBgetTemplateByID($ID) {
  global $wpdb;
  $result = $wpdb->get_results("SELECT json from wp_wpws_templates WHERE id =" . $ID);
  return $result[0]->json;
}
function wpws__DBgetCategories() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT * from wp_wpws_categories");
  return $results;
}
function wpws__DBgetProductBoxes() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT json from wp_wpws_product_boxes");
  return $results;
}
function wpws__DBgetTemplates() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT json from wp_wpws_templates");
  return $results;
}
function wpws__DBpostCategory($categoryName) {
  global $wpdb;
  $wpdb->insert("wp_wpws_categories", array("category" => $categoryName), array("%s"));
}
function wpws__DBpostProductBox($productBoxJSON) {
  global $wpdb;
  $wpdb->insert("wp_wpws_product_boxes", array("json" => $productBoxJSON), array("%s"));
  $lastid = $wpdb->insert_id;
  return $lastid;
}
function wpws__DBpostTemplate($templateJSON) {
  global $wpdb;
  $wpdb->insert("wp_wpws_templates", array("json" => $templateJSON), array("%s"));
  $lastid = $wpdb->insert_id;
  return $lastid;
}
function wpws__DBpatchProductBox($productBox) {
  global $wpdb;
  $wpdb->update("wp_wpws_product_boxes", array("json" => json_encode($productBox)), array("id" => $productBox->productBoxID), array("%s"));
}
function wpws__DBpatchTemplate($template) {
  global $wpdb;
  $wpdb->update("wp_wpws_templates", array("json" => json_encode($template)), array("id" => $template->templateID), array("%s"));
}
function wpws__DBdeleteProductBox($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_product_boxes", array("id" => $ID));
}
function wpws__DBdeleteTemplate($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_templates", array("id" => $ID));
}
function wpws__DBdeleteCategory($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_categories", array("id" => $ID));
}

// REST API init
add_action('rest_api_init', 'register_routes');

function wpws__handle_getProductBox($request) {
  $ID = $request["id"];
  $productBox = wpws__DBgetProductBoxByID($ID);
  return rest_ensure_response(json_decode($productBox));
}
function wpws__handle_getTemplate($request) {
  $ID = $request["id"];
  $template = wpws__DBgetTemplateByID($ID);
  return rest_ensure_response(json_decode($template));
}
function wpws__handle_getCategories() {
  $results = wpws__DBgetCategories();
  return rest_ensure_response($results);
}
function wpws__handle_getProductBoxes() {
  $results = wpws__DBgetProductBoxes();
  $productBoxes = array();
  foreach($results as $result) {
    array_push($productBoxes, json_decode($result->json));  
  }
  return rest_ensure_response($productBoxes);
}
function wpws__handle_getProductBoxesByTemplateID($request) {
  $templateID = $request["id"];
  $results = wpws__DBgetProductBoxes();
  $productBoxes = array();
  foreach($results as $result) {
    $productBox = json_decode($result->json);
    if ($productBox->templateID == $templateID) {
      array_push($productBoxes, $productBox);  
    }
  }
  return rest_ensure_response($productBoxes);
}
function wpws__handle_getTemplates() {
  $results = wpws__DBgetTemplates();
  $templates = array();
  foreach($results as $result) {
    array_push($templates, json_decode($result->json));  
  }
  return rest_ensure_response($templates);
}
function wpws__handle_postCategory($request) {
  $body = json_decode($request->get_body());
  wpws__DBpostCategory($body->category);
  return rest_ensure_response(json_encode($body));
}
function wpws__handle_postProductBox($request) {
  $body = $request->get_body();
  $id = wpws__DBpostProductBox($body);
  $productBox = json_decode($body);
  $productBox->productBoxID = strval($id);
  wpws__DBpatchProductBox($productBox);
  return rest_ensure_response($productBox);
}
function wpws__handle_postTemplate($request) {
  $body = $request->get_body();
  $id = wpws__DBpostTemplate($body);
  $template = json_decode($body);
  $template->templateID = strval($id);
  wpws__DBpatchTemplate($template);
  return rest_ensure_response($template);
}
function wpws__handle_patchProductBoxes($request) {
  $body = json_decode($request->get_body());
  foreach($body as $productBox) {
    wpws__DBpatchProductBox($productBox);
  }
  return rest_ensure_response($request->get_body());
}
function wpws__handle_patchProductBox($request) {
  $productBox = json_decode($request->get_body());
  wpws__DBpatchProductBox($productBox);
  return rest_ensure_response($request->get_body());
}
function wpws__handle_patchTemplate($request) {
  $template = json_decode($request->get_body());
  wpws__DBpatchTemplate($template);
  return rest_ensure_response($request->get_body());
}
function wpws__handle_deleteProductBox($request) {
  $ID = $request["id"];
  $productBox = wpws__DBgetProductBoxByID($ID);
  wpws__DBdeleteProductBox($ID);
  return rest_ensure_response(json_decode($productBox));
}
function wpws__handle_deleteTemplate($request) {
  $ID = $request["id"];
  $template = wpws__DBgetTemplateByID($ID);
  wpws__DBdeleteTemplate($ID);
  return rest_ensure_response(json_decode($template));
}
function wpws__handle_deleteCategory($request) {
  $id = $request["id"];
  wpws__DBdeleteCategory($id);
  return rest_ensure_response($request->get_body());
}
function wpws__get_images_from_media_library() {
    $args = array(
        'post_type' => 'attachment',
        'post_mime_type' =>'image',
        'post_status' => 'inherit',
        'orderby' => 'post_date',
        'order' => 'DESC',
        'posts_per_page' => -1,
    );
    $query_images = new WP_Query( $args );
    $images = array();
    foreach ( $query_images->posts as $image) {
      $images[]= array(
        'guid' => $image->guid,
        'post_title' => $image->post_title,
        'ID' => $image->ID,
        'post_date' => $image->post_date,
      );
    }
    return $images;
}
function wpws__handle_getImages($request) {
  return rest_ensure_response(wpws__get_images_from_media_library());
}

function wpws__permission_callback () {
  return current_user_can( 'edit_others_posts' );
}

function register_routes() {
  register_rest_route( 'wpws/v1', '/productbox/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getProductBox',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getTemplate',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/categories', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getCategories',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getProductBoxes',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getProductBoxesByTemplateID',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/templates', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getTemplates',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/category', array(
    'methods'  => 'POST',
    'callback' => 'wpws__handle_postCategory',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes', array(
    'methods'  => 'PUT',
    'callback' => 'wpws__handle_patchProductBoxes',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox', array(
    'methods'  => 'POST',
    'callback' => 'wpws__handle_postProductBox',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template', array(
    'methods'  => 'POST',
    'callback' => 'wpws__handle_postTemplate',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox', array(
    'methods'  => 'PUT',
    'callback' => 'wpws__handle_patchProductBox',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template', array(
    'methods'  => 'PUT',
    'callback' => 'wpws__handle_patchTemplate',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'wpws__handle_deleteProductBox',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'wpws__handle_deleteTemplate',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/category/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'wpws__handle_deleteCategory',
    'permission_callback' => 'wpws__permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/images', array(
    'methods'  => 'GET',
    'callback' => 'wpws__handle_getImages',
    'permission_callback' => 'wpws__permission_callback',
  ));
}

add_action('init', 'wpws__register_shortcodes_from_product_boxes');
function wpws__add_product_box_shortcode($atts, $content) {
  $atts = shortcode_atts(
    array(
        'id' => '1',
        'ids' => '',
    ), $atts);
  if (strlen($atts["ids"]) == 0) {
    $json = wpws__DBgetProductBoxByID($atts["id"]);
    $productBox = json_decode($json);
    return $productBox->innerHTML;
  } else {
    $ids = explode(",", $atts["ids"]);
    $boxes_html = "";
    $i = 0;
    foreach($ids as $id) {
      $json = wpws__DBgetProductBoxByID($id);
      $productBox = json_decode($json);
      $box_html = $productBox->innerHTML;
      $boxes_html = $boxes_html . $box_html;
      $i = $i + 1;
    }
    return '<div style="display: flex; flex-wrap: wrap; align-items: stretch;">' . $boxes_html . '</div>'; 
  }
}
function wpws__register_shortcodes_from_product_boxes(){
  add_shortcode("wpws", "wpws__add_product_box_shortcode");
}

