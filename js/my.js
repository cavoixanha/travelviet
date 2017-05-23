$(function () {
    var jsonData = undefined;
    $.getJSON("json/tkgd.json", function(json) {
        jsonData = json;
    });

    $('.tabbable.tabs-left .nav.nav-tabs li a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).tab('show');
        console.log("1");
    });

    $('.btntimkiem').click(function(e){
        console.log("dsfdsfdsfds");
        e.preventDefault();
        e.stopPropagation();


        $('.items-search.doituong').find('.filter-list').empty();
        $('.items-search.tinhthanh').find('.filter-list').empty();
        $('.items-search.diahinh').find('.filter-list').empty();

        var doituong = [];
        $('.listdoituong input:checked').each(function() {
            doituong.push($(this).attr("name"));
        });

        var tinhthanh = [];
        $('.listtinhthanh input:checked').each(function() {
            tinhthanh.push($(this).attr("name"));
        });

        var diahinh = [];
        $('.listdiahinh input:checked').each(function() {
            diahinh.push($(this).attr("name"));
        });
        
        var stringdiadiem = "địa điểm";
        if (doituong.length > 0) {
            $('.items-search.doituong').css("display", "block");
            flag = true;
            for (var i = 0; i < doituong.length; i++) {
                if (i == 0) {
                    stringdiadiem += " đối tượng ";
                    stringdiadiem += doituong[i];
                } else {
                    stringdiadiem += ", ";
                    stringdiadiem += doituong[i];
                }

                $('.items-search.doituong .filter-list').append("<li><span>" + doituong[i] + "</span><img class='image-close-filter-list' src='img/keyword-close-icon.png' /></li>");
            }    
        }
        if (tinhthanh.length > 0) {
            $('.items-search.tinhthanh').css("display", "block"); 
            for (var i = 0; i < tinhthanh.length; i++) {
                if (i == 0) {
                    stringdiadiem += " tại ";
                    stringdiadiem += tinhthanh[i];
                } else {
                    stringdiadiem += ", ";
                    stringdiadiem += tinhthanh[i];
                }

                $('.items-search.tinhthanh .filter-list').append("<li><span>" + tinhthanh[i] + "</span><img class='image-close-filter-list' src='img/keyword-close-icon.png' /></li>");
            }    
        }
        if (diahinh.length > 0) {
            $('.items-search.diahinh').css("display", "block"); 

            for (var i = 0; i < diahinh.length; i++) {
                if (i == 0) {
                    stringdiadiem += " địa hình ";
                    stringdiadiem += diahinh[i];
                } else {
                    stringdiadiem += ", ";
                    stringdiadiem += diahinh[i];
                }

                $('.items-search.diahinh .filter-list').append("<li><span>" + diahinh[i] + "</span><img class='image-close-filter-list' src='img/keyword-close-icon.png' /></li>");
            }    
        }

        $('.filter-status-count').html("");
        $('.filter-status-count').append(stringdiadiem);

        $('.dropdown-toggle').click();
    });
    
    $('#btntimkiem').click(function(){
        var array_where = _.where(jsonData, {ten_dia_diem: $("#txt_search").val()});
        
        console.log("Array where: " + array_where[0].ten_dia_diem);
    });

    $('.btnxoaboloc').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var id = $('.nav.nav-tabs li.active').attr("tab_id");

        $('#' + id).find('input[type=checkbox]:checked').removeAttr('checked');

    });

    $('.image-close-items').click(function() {
        $(this).parent().find('.filter-list').empty();
        $(this).parent().css("display", "none");
    });

    $('body').delegate('.image-close-filter-list', 'click', function() {

        var number = $(this).parent().parent().children('li').length;
        if (number - 1 == 0) {
            $(this).closest(".items-search").css("display","none");
        }
        
        $(this).parent().remove();
    });

});