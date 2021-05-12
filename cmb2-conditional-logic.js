/**
 * Conditional logic for CMB2 library
 * @author    Awran5 <github.com/awran5>
 * @version   1.0.0
 * @license   under GPL v2.0 (https://github.com/awran5/CMB2-conditional-logic/blob/master/LICENSE)
 * @copyright © 2018 Awran5. All rights reserved.
 * 
 */

 (function ($) {
	'use strict';
	$(function () {
		jQuery(document).ready(function ($) {
            function CMB2Conditional() {        
                $('[data-conditional-id]').each( (i, el) => { 
                    let condName    = el.dataset.conditionalId,
                        condValue   = el.dataset.conditionalValue,
                        condParent  = el.closest('.cmb-row'),
                        isRequired  = el.hasAttribute('required'),
                        inGroup     = condParent.classList.contains('cmb-repeat-group-field');

                        // Check if the field is in group
                        if( inGroup ) {
                            let groupID  = condParent.closest('.cmb-repeatable-group').getAttribute('data-groupid'),
                                iterator = condParent.closest('.cmb-repeatable-grouping').getAttribute('data-iterator');
                            
                            // change the select name with group ID added
                            condName = `${groupID}[${iterator}][${condName}]`;
                        }
                        
                    // Check if value is matching
                    function valueMatch(value) {
                        return condValue.includes(value) && value !== '' ;
                    }
        
                    // Select the field by name and loob through
                    $('[name="' + condName + '"]').each(function(i, field) {
                        // Select field
                        if( "select-one" === field.type ) {

                            if( !valueMatch( field.value ) ) {
                                if( isRequired )
                                    el.removeAttribute("required");

                                $(condParent).hide();
                            }
        
                            // Check on change
                            $(field).on('change', function(event) {

                                if( valueMatch( event.target.value ) ) {
                                    if( isRequired )
                                        el.setAttribute("required", 1);

                                    $(condParent).show();
                                } else {
                                    if( isRequired )
                                        el.removeAttribute("required");

                                    $(condParent).hide();
                                }
                                    
                            });
                        }
                        
                        // Radio field
                        else if( "radio" === field.type ) {
        
                            // Hide the row if the value doesn't match and not checked
                            if( !valueMatch( field.value ) && field.checked ) {
                                if( isRequired )
                                    el.removeAttribute("required");
                                    
                                $(condParent).hide();
                            }
        
                            // Check on change
                            $(field).on('change', function(event) {

                                if( valueMatch( event.target.value ) ) {
                                    if( isRequired )
                                        el.setAttribute("required", 1);

                                    $(condParent).show();
                                } else {
                                    if( isRequired )
                                        el.removeAttribute("required");

                                    $(condParent).hide();
                                } 
                            
                            });
                        }
        
                        // Checkbox field
                        else if( "checkbox" === field.type ) {    
        
                            // Hide the row if the value doesn't match and not checked
                            if( !field.checked ) {
                                if( isRequired )
                                    el.removeAttribute("required");

                                $(condParent).hide();
                            }
                            
                            // Check on change
                            $(field).on('change', function(event) {

                                if( event.target.checked ) {
                                    if( isRequired )
                                        el.setAttribute("required", 1);

                                    $(condParent).show();
                                } else {
                                    if( isRequired )
                                        el.removeAttribute("required");

                                    $(condParent).hide();
                                }

                            });
                        }
                       
                    });
        
                });
            }
        
            // Trigger the funtion
            CMB2Conditional();
        
            // Trigger again when new group added
            $( '.cmb2-wrap > .cmb2-metabox' ).on( 'cmb2_add_row', function() {
        
                CMB2Conditional();
        
            });
        })
    });
})(jQuery);