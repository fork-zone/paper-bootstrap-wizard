searchVisible = 0;
transparent = true;

        $(document).ready(function(){




            /*  Activate the tooltips      */
            $('[rel="tooltip"]').tooltip();

            // Code for the Validator
            var $validator = $('.wizard-card form').validate({
        		  rules: {
        		    firstname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    lastname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    email: {
        		      required: true
        		    }
                },
        	});

            // Wizard Initialization
          	$('.wizard-card').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'nextSelector': '.btn-next',
                'previousSelector': '.btn-previous',

                onNext: function(tab, navigation, index) {
                	var $valid = $('.wizard-card form').valid();
                	if(!$valid) {
                		$validator.focusInvalid();
                		return false;
                	}
                },

                onInit : function(tab, navigation, index){

                  //check number of tabs and fill the entire row
                  var $total = navigation.find('li').length;
                  $width = 100/$total;
                  var $wizard = navigation.closest('.wizard-card');

                  $display_width = $(document).width();

                  if($display_width < 600 && $total > 3){
                      $width = 50;
                  }

                  var $current = index+1;



                   navigation.find('li').css('width',$width + '%');

               },

                onTabClick : function(tab, navigation, index){

                    var $valid = $('.wizard-card form').valid();

                    if(!$valid){
                        return false;
                    } else{
                        return true;
                    }

                },

                onTabShow: function(tab, navigation, index) {
                    var $total = navigation.find('li').length;
                    var $current = index+1;

                    var $wizard = navigation.closest('.wizard-card');

                    // If it's the last tab then hide the last button and show the finish instead
                    if($current >= $total) {
                        $($wizard).find('.btn-next').hide();
                        $($wizard).find('.btn-finish').show();
                    } else {
                        $($wizard).find('.btn-next').show();
                        $($wizard).find('.btn-finish').hide();
                    }

                        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                            //update progress
                            var step = $(e.target).data('step');
                            var move_distance = 100 / $total;
                            move_distance = move_distance * (step-1) + move_distance / 2;

                            $('.progress-bar').css({width: move_distance + '%'});
                            //e.relatedTarget // previous tab

                        })

                        border_circle_color = $('.wizard-card').data('color');
                        $('.nav-pills li.active a .icon-circle').css('border','3px solid ' + converterColor(border_circle_color) + '');

                }
          	});

            function converterColor(color){
                switch (color) {
                    case 'orange':
                        return '#F3BB45';
                        break;
                    case 'blue':
                        return '#447DF7';
                        break;
                    case 'green':
                        return '.label-success';
                        break;
                    case 'red':
                        return '#FB404B';
                        break;
                    case 'azzure':
                        return '#23CCEF';
                        break;
                }

            }


            // Prepare the preview for profile picture
            $("#wizard-picture").change(function(){
                readURL(this);
            });

            $('[data-toggle="wizard-radio"]').click(function(){
                wizard = $(this).closest('.wizard-card');
                wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
                $(this).addClass('active');
                $(wizard).find('[type="radio"]').removeAttr('checked');
                $(this).find('[type="radio"]').attr('checked','true');
            });

            $('[data-toggle="wizard-checkbox"]').click(function(){
                if( $(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).find('[type="checkbox"]').removeAttr('checked');
                } else {
                    $(this).addClass('active');
                    $(this).find('[type="checkbox"]').attr('checked','true');
                }
            });

            $('.set-full-height').css('height', 'auto');

        });



         //Function to show image before upload

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
