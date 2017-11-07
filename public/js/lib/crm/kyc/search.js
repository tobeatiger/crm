$('#main .dynamic_section').css({display:'none'});
var kyc_search = $('#main .kyc_search')[0];

if(kyc_search){//show the previous loaded page    
    $(kyc_search).css({display:'block'});   
}
else{    
    //create the kyc_search section dynamically
    $('#main').append("<div class='kyc_search dynamic_section'></div>");
    //get the kyc_search view
    $.get('/kyc/search',null, function(searchView) {
        //render the search view
        $('#main .kyc_search').html(searchView);
        
        //when Search button is clicked
        $('.kyc_search_btn').click(function(evt){
            var params = {};
            $('.kyc_search_form .form-control').each(function(index,field){
                params[field.name] = field.value;
            });
             
            var profileType = params.profileType;
            delete  params.profileType;
            //console.log("kyc_search params:",params);
            //get the search results
            $.post(profileType + "/search", params, function(resultView) {
               $('#kyc_search_results').html(resultView);    
               
               //open in new page when click Edit button
               $('#kyc_search_results .kyc_edit_btn').click(function(evt){
                   //alert('Edit:' + $(this).attr('href'));
                   window.open($(this).attr('href'),'_blank');
                   return false;
               });
               $('#kyc_search_results .kyc_enquire_link').click(function(evt){
                   //alert('Enquire:'+$(this).attr('href'));
                   window.open($(this).attr('href'),'_blank');
                   return false;
               });
               
               
            }).success(function() {
               //$('#kyc_search_results').html('hello');
            }).error(function() {            
                $('#kyc_search_results').html(nlsStrings['server_error']);
            });       
        });
        //event handler for Search button
        $('.kyc_create_btn').click(function(evt){
            $('.kyc_search_form [name=profileType]').each(function(index,field){
                //alert(field.value + '/create');
                window.open(field.value + '/create','_blank');
                return false;
            });
        });
    }).error(function() {     
        console.error('index error:',arguments);
        $('#main').html("<b>"+nlsStrings['server_error']+"<b>");
    });
}
