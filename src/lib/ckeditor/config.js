/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript';
	config.enterMode = CKEDITOR.ENTER_P;
	config.autoParagraph = false;
	config.format_p = {element:'p', styles:{
		"font-family": "Arial, Helvetica, sans-serif",
		"font-size": "16px",
		"color": "#505050",
		"text-align":"left",
		"line-height":"21px",
		"margin-bottom": "1em",
		"font-weight":"normal"
	}};
	config.format_tags = "p";
	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
	config.extraPlugins = 'resize,justify,format,richcombo,floatpanel,listblock,panel';
	config.extraAllowedContent = 'center';
};
