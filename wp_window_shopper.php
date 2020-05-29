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
  add_menu_page('WP Window Shopper', 'Window Shopper', 'manage_options', 'wp-window-shopper', 'wpws___admin_index', 'dashicons-cart');
}
function wpws___admin_index() {
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

function db___getProductBoxByID($ID) {
  global $wpdb;
  $result = $wpdb->get_results("SELECT json from wp_wpws_product_boxes WHERE id =" . $ID);
  return $result[0]->json;
}
function db___getTemplateByID($ID) {
  global $wpdb;
  $result = $wpdb->get_results("SELECT json from wp_wpws_templates WHERE id =" . $ID);
  return $result[0]->json;
}
function db___getCategories() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT * from wp_wpws_categories");
  return $results;
}
function db___getProductBoxes() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT json from wp_wpws_product_boxes");
  return $results;
}
function db___getTemplates() {
  global $wpdb;
  $results = $wpdb->get_results("SELECT json from wp_wpws_templates");
  return $results;
}
function db___postCategory($categoryName) {
  global $wpdb;
  $wpdb->insert("wp_wpws_categories", array("category" => $categoryName), array("%s"));
}
function db___postProductBox($productBoxJSON) {
  global $wpdb;
  $wpdb->insert("wp_wpws_product_boxes", array("json" => $productBoxJSON), array("%s"));
  $lastid = $wpdb->insert_id;
  return $lastid;
}
function db___postTemplate($templateJSON) {
  global $wpdb;
  $wpdb->insert("wp_wpws_templates", array("json" => $templateJSON), array("%s"));
  $lastid = $wpdb->insert_id;
  return $lastid;
}
function db___patchProductBox($productBox) {
  global $wpdb;
  $wpdb->update("wp_wpws_product_boxes", array("json" => json_encode($productBox)), array("id" => $productBox->productBoxID), array("%s"));
}
function db___patchTemplate($template) {
  global $wpdb;
  $wpdb->update("wp_wpws_templates", array("json" => json_encode($template)), array("id" => $template->templateID), array("%s"));
}
function db___deleteProductBox($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_product_boxes", array("id" => $ID));
}
function db___deleteTemplate($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_templates", array("id" => $ID));
}
function db___deleteCategory($ID) {
  global $wpdb;
  $wpdb->delete("wp_wpws_categories", array("id" => $ID));
}

// REST API init
add_action('rest_api_init', 'register_routes');

function handle___getProductBox($request) {
  $ID = $request["id"];
  $productBox = db___getProductBoxByID($ID);
  return rest_ensure_response(json_decode($productBox));
}
function handle___getTemplate($request) {
  $ID = $request["id"];
  $template = db___getTemplateByID($ID);
  return rest_ensure_response(json_decode($template));
}
function handle___getCategories() {
  $results = db___getCategories();
  return rest_ensure_response($results);
}
function handle___getProductBoxes() {
  $results = db___getProductBoxes();
  $productBoxes = array();
  foreach($results as $result) {
    array_push($productBoxes, json_decode($result->json));  
  }
  return rest_ensure_response($productBoxes);
}
function handle___getProductBoxesByTemplateID($request) {
  $templateID = $request["id"];
  $results = db___getProductBoxes();
  $productBoxes = array();
  foreach($results as $result) {
    $productBox = json_decode($result->json);
    if ($productBox->templateID == $templateID) {
      array_push($productBoxes, $productBox);  
    }
  }
  return rest_ensure_response($productBoxes);
}
function handle___getTemplates() {
  $results = db___getTemplates();
  $templates = array();
  foreach($results as $result) {
    array_push($templates, json_decode($result->json));  
  }
  return rest_ensure_response($templates);
}
function handle___postCategory($request) {
  $body = json_decode($request->get_body());
  db___postCategory($body->category);
  return rest_ensure_response(json_encode($body));
}
function handle___postProductBox($request) {
  $body = $request->get_body();
  $id = db___postProductBox($body);
  $productBox = json_decode($body);
  $productBox->productBoxID = strval($id);
  db___patchProductBox($productBox);
  return rest_ensure_response($productBox);
}
function handle___postTemplate($request) {
  $body = $request->get_body();
  $id = db___postTemplate($body);
  $template = json_decode($body);
  $template->templateID = strval($id);
  db___patchTemplate($template);
  return rest_ensure_response($template);
}
function handle___patchProductBoxes($request) {
  $body = json_decode($request->get_body());
  foreach($body as $productBox) {
    db___patchProductBox($productBox);
  }
  return rest_ensure_response($request->get_body());
}
function handle___patchProductBox($request) {
  $productBox = json_decode($request->get_body());
  db___patchProductBox($productBox);
  return rest_ensure_response($request->get_body());
}
function handle___patchTemplate($request) {
  $template = json_decode($request->get_body());
  db___patchTemplate($template);
  return rest_ensure_response($request->get_body());
}
function handle___deleteProductBox($request) {
  $ID = $request["id"];
  $productBox = db___getProductBoxByID($ID);
  db___deleteProductBox($ID);
  return rest_ensure_response(json_decode($productBox));
}
function handle___deleteTemplate($request) {
  $ID = $request["id"];
  $template = db___getTemplateByID($ID);
  db___deleteTemplate($ID);
  return rest_ensure_response(json_decode($template));
}
function handle___deleteCategory($request) {
  $id = $request["id"];
  db___deleteCategory($id);
  return rest_ensure_response($request->get_body());
}
function wpws___get_images_from_media_library() {
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
function handle___getImages($request) {
  return rest_ensure_response(wpws___get_images_from_media_library());
}

function wpws___permission_callback () {
  return current_user_can( 'edit_others_posts' );
}

function register_routes() {
  register_rest_route( 'wpws/v1', '/productbox/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'handle___getProductBox',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'handle___getTemplate',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/categories', array(
    'methods'  => 'GET',
    'callback' => 'handle___getCategories',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes', array(
    'methods'  => 'GET',
    'callback' => 'handle___getProductBoxes',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes/(?P<id>\d+)', array(
    'methods'  => 'GET',
    'callback' => 'handle___getProductBoxesByTemplateID',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/templates', array(
    'methods'  => 'GET',
    'callback' => 'handle___getTemplates',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/category', array(
    'methods'  => 'POST',
    'callback' => 'handle___postCategory',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productboxes', array(
    'methods'  => 'PUT',
    'callback' => 'handle___patchProductBoxes',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox', array(
    'methods'  => 'POST',
    'callback' => 'handle___postProductBox',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template', array(
    'methods'  => 'POST',
    'callback' => 'handle___postTemplate',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox', array(
    'methods'  => 'PUT',
    'callback' => 'handle___patchProductBox',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template', array(
    'methods'  => 'PUT',
    'callback' => 'handle___patchTemplate',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/productbox/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'handle___deleteProductBox',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/template/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'handle___deleteTemplate',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/category/(?P<id>\d+)', array(
    'methods'  => 'DELETE',
    'callback' => 'handle___deleteCategory',
    'permission_callback' => 'wpws___permission_callback',
  ));
  register_rest_route( 'wpws/v1', '/images', array(
    'methods'  => 'GET',
    'callback' => 'handle___getImages',
    'permission_callback' => 'wpws___permission_callback',
  ));
}

add_action('init', 'wpws___register_shortcodes_from_product_boxes');
function wpws___add_product_box_shortcode($atts, $content) {
  $atts = shortcode_atts(
    array(
        'id' => '1',
        'ids' => '',
    ), $atts);
  if (strlen($atts["ids"]) == 0) {
    $json = db___getProductBoxByID($atts["id"]);
    $productBox = json_decode($json);
    return $productBox->innerHTML;
  } else {
    $ids = explode(",", $atts["ids"]);
    $boxes_html = "";
    $i = 0;
    foreach($ids as $id) {
      $json = db___getProductBoxByID($id);
      $productBox = json_decode($json);
      $box_html = $productBox->innerHTML;
      $boxes_html = $boxes_html . $box_html;
      $i = $i + 1;
    }
    return '<div style="display: flex; flex-wrap: wrap; align-items: stretch;">' . $boxes_html . '</div>'; 
  }
}
function wpws___register_shortcodes_from_product_boxes(){
  add_shortcode("wpws", "wpws___add_product_box_shortcode");
}

