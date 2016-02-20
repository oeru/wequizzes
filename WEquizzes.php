<?php
/**
 * @package WEquizzes
 */
/*
Plugin Name: WEquizzes
Plugin URI: http://github.com/oeru/wequizzes
Description: Add WikiEducator quiz widgets to a course deployed in WordPress.
Version: 1.0.0
Author: Jim Tittsler
Author URI: http://WikiEducator.org/User:JimTittsler
License: GPLv2 or later
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

define( 'QUIZZES_VERSION', '1.1.0' );

if ( !function_exists( 'add_action' ) ) {
	echo 'This only works as a WordPress plugin.';
	exit;
}

add_shortcode( 'WEquizzes', 'wequizzes_func' );

function wequizzes_func( $atts ) {
	wp_enqueue_script( 'wequizzes',
		plugins_url( 'WEquizzes.js', __FILE__ ),
		array( 'jquery' ),
		QUIZZES_VERSION,
		true );
	return '';
}

