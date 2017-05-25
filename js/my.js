function string_vctinh(str, length_str) {
    if (length_str > str.length) {
        length_str = str.length;
    }

    var pos = str.indexOf(' ', length_str);
    if (pos) {
        str = str.substr(0, pos);
    } else {
        str = str.substr(0, length_str);
    }
    return str;
}

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function print_obj(obj) {
    var output = "";
    for (var property in obj) {
        output += property + ': ' + obj[property] + '\n';
    }
    console.log(output);
}


$(function() {
    var jsonData = undefined;
    // $.getJSON("json/tkgd.json", function(json) {
    //     debugger;
    //     var jsonData = json;

    //     // var template = $("#home_dia_diem").html();
    //     // Mustache.parse(template);   // optional, speeds up future uses
    //     // var rendered = Mustache.render(template, json[0]);
    //     // $('#list_dia_diem').html(rendered);

    //     $.ajax({
    //         url: 'mst/home.mst',
    //         dataType: 'html',

    //         success: function(template) {
    //             // for (var i = jsonData.length - 1; i >= 0; i--) {
    //             //     jsonData[i]["result_rating_html"] = result_rating()
    //             // }

    //             for (var dia_diem = jsonData.length - 1; dia_diem >= 0; dia_diem--) {

    //                 var rendered = Mustache.render($(template).filter('#home_dia_diem').html(), jsonData[dia_diem])
    //                 $('#list_dia_diem').append(rendered);
    //             }
    //         }
    //     });
    // });

    $.ajax({
        url: "json/tkgd.json",
        dataType: 'json',
        // contentType: 'json',
        success: function(json) {
            jsonData = json;

            // var template = $("#home_dia_diem").html();
            // Mustache.parse(template);   // optional, speeds up future uses
            // var rendered = Mustache.render(template, json[0]);
            // $('#list_dia_diem').html(rendered);

            $.ajax({
                url: 'mst/home.mst',
                dataType: 'html',

                success: function(template) {
                    for (var i = jsonData.length - 1; i >= 0; i--) {
                        jsonData[i]["result_rating_html"] = function() {
                            var html = "";
                            html += "<div class=\"result-rating\">";
                            if (this.so_sao <= 5) {
                                for (var i = this.so_sao; i >= 1; i--) {
                                    html += "<span class=\"fill\"></span>";
                                }

                                for (var i = (5 - this.so_sao); i >= 1; i--) {
                                    html += "<span></span>";
                                }
                            }
                            html += "</div>";
                            return html;
                        };

                        jsonData[i]["mo_ta_ngan_gon"] = function() {
                            return string_vctinh(this.mo_ta, 540);
                        };

                        jsonData[i]["ten_dia_diem_ko_dau"] = bodauTiengViet(jsonData[i]["ten_dia_diem"]);
                    }

                    for (var dia_diem = jsonData.length - 1; dia_diem >= 0; dia_diem--) {

                        var rendered = Mustache.render($(template).filter('#home_dia_diem').html(), jsonData[dia_diem])
                        $('#list_dia_diem').append(rendered);
                    }
                }
            });
        }
    });

    $('.tabbable.tabs-left .nav.nav-tabs li a').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).tab('show');
    });

    // tìm kiếm nâng cao
    $('.btntimkiem').click(function(e) {
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


        var array_where = filter_dia_diem_nang_cao(doituong, tinhthanh, diahinh);

        var val_search = $("#txt_search").val();
        var array_where_s = _.where(jsonData, { ten_dia_diem: val_search });
        if (_.isEmpty(val_search)) {
            array_where_s = jsonData;
        }

        array_where = _.intersection(array_where, array_where_s);
        filter_dia_diem(array_where);
    });

    // tìm kiếm cơ bản
    $('#btntimkiem').click(function() {
        var val_search = bodauTiengViet($("#txt_search").val());
        var array_where = _.where(jsonData, { ten_dia_diem_ko_dau: val_search });
        if (_.isEmpty(val_search)) {
            array_where = jsonData;
        }

        filter_dia_diem(array_where);
    });

    function filter_dia_diem(array_where) {
        $.ajax({
            url: 'mst/home.mst',
            dataType: 'html',
            beforeSend: function(xhr) {
                $('#list_dia_diem').html("<div class=\"row text-center\"><button class=\"btn btn-lg btn-success\" style=\"background-color: #1dbc53\"><span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span> Loading...</button></div>");
            },
            success: function(template) {
                sleep(200);

                for (var i = array_where.length - 1; i >= 0; i--) {
                    array_where[i]["result_rating_html"] = function() {
                        var html = "";
                        html += "<div class=\"result-rating\">";
                        if (this.so_sao <= 5) {
                            for (var i = this.so_sao; i >= 1; i--) {
                                html += "<span class=\"fill\"></span>";
                            }

                            for (var i = (5 - this.so_sao); i >= 1; i--) {
                                html += "<span></span>";
                            }
                        }
                        html += "</div>";
                        return html;
                    };

                    array_where[i]["mo_ta_ngan_gon"] = function() {
                        return string_vctinh(this.mo_ta, 540);
                    };
                }

                $("#number-dia-diem").html(array_where.length);
                $('#list_dia_diem').html("");

                for (var dia_diem = array_where.length - 1; dia_diem >= 0; dia_diem--) {

                    var rendered = Mustache.render($(template).filter('#home_dia_diem').html(), array_where[dia_diem])
                    $('#list_dia_diem').append(rendered);
                }
            }
        });
    }

    function filter_dia_diem_nang_cao(doituong, tinhthanh, diahinh) {
        console.log(doituong);
        console.log(tinhthanh);
        console.log(diahinh);

        var array_where = [];

        // if (_.isEmpty(doituong)) {
        //     array_where += jsonData;
        // } else {
        //     for (var i = doituong.length - 1; i >= 0; i--) {
        //         array_where += _.where(jsonData, { doi_tuong: doituong[i] });
        //     }
        // }

        var array_where_dt;
        if (_.isEmpty(doituong)) {
            array_where_dt = jsonData;
        } else {
            array_where_dt = _.filter(jsonData, function(o) {
                for (var i = o.doi_tuong.length - 1; i >= 0; i--) {
                    if (_.contains(doituong, o.doi_tuong[i])) {
                        return true;
                    } else {
                        // return false; // khong return
                    }
                    // khong duoc return
                }
                return false;
            });
        }
        print_obj(array_where_dt[0]);

        ///
        var array_where_tt;
        if (_.isEmpty(tinhthanh)) {
            array_where_tt = jsonData;
        } else {
            array_where_tt = _.filter(jsonData, function(o) {
                if (_.contains(tinhthanh, o.vi_tri_dia_ly)) {
                    return true;
                } else {
                    // return false; // khong return
                }
                return false;
            });
        }
        print_obj(array_where_tt[0]);

        ///
        var array_where_dh;
        if (_.isEmpty(diahinh)) {
            array_where_dh = jsonData;
        } else {
            array_where_dh = _.filter(jsonData, function(o) {
                for (var i = o.loai_dia_hinh.length - 1; i >= 0; i--) {
                    if (_.contains(diahinh, o.loai_dia_hinh[i])) {
                        return true;
                    } else {
                        // return false; // khong return
                    }
                    // khong duoc return
                }
                return false;
            });
        }
        print_obj(array_where_dh[0]);

        array_where = _.intersection(array_where_dt, array_where_tt, array_where_dh);
        $("#number-dia-diem").html(array_where.length);

        return array_where;
    }

    $('.btnxoaboloc').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        var id = $('.nav.nav-tabs li.active').attr("tab_id");

        $('#' + id).find('input[type=checkbox]:checked').removeAttr('checked');

        var doituong = [];
        $('.listdoituong input:checked').each(function() {
            doituong.push($(this).attr("name"));
        });
        if (doituong.length == 0) {
            $('.items-search.doituong').hide();
        }

        var tinhthanh = [];
        $('.listtinhthanh input:checked').each(function() {
            tinhthanh.push($(this).attr("name"));
        });
        if (tinhthanh.length == 0) {
            $('.items-search.tinhthanh').hide();
        }


        var diahinh = [];
        $('.listdiahinh input:checked').each(function() {
            diahinh.push($(this).attr("name"));
        });
        if (diahinh.length == 0) {
            $('.items-search.diahinh').hide();
        }

        var array_where = filter_dia_diem_nang_cao(doituong, tinhthanh, diahinh);
        filter_dia_diem(array_where);
    });

    function remove_filter_theo_loai(j_list, jClose) {
        j_list.each(function() {
            $(this).attr('checked', false);
        });
    }

    function remove_filter_theo_1_loai_con(j_list, jClose) {
        j_list.each(function() {
            if ($(this).attr("name") == jClose.parent().find('span:first').text()) {
                $(this).attr('checked', false);
            }
        });
        // $('.listtinhthanh input').each(function() {
        //     if($(this).attr("name") == jClose.parent().find('span:first').text())
        //     {
        //         $(this).attr('checked', false);
        //     }
        // });
    }

    $('.image-close-items').click(function() {
        $(this).parent().find('.filter-list').empty();
        $(this).parent().css("display", "none");

        if ($(this).parent().hasClass('doituong')) {
            remove_filter_theo_loai($('.listdoituong input'));
        } else if ($(this).parent().hasClass('tinhthanh')) {
            remove_filter_theo_loai($('.listtinhthanh input'));
        } else if ($(this).parent().hasClass('diahinh')) {
            debugger;
            remove_filter_theo_loai($('.listdiahinh input'));
        }

        $('.btntimkiem').click();
    });

    $('body').delegate('.image-close-filter-list', 'click', function() {

        var number = $(this).parent().parent().children('li').length;
        if (number - 1 == 0) {
            $(this).closest(".items-search").css("display", "none");
        }

        var jClose = $(this);
        var j_arr_list = [$('.listdoituong input'), $('.listtinhthanh input'), $('.listdiahinh input')];

        var type = jClose.parent().parent().parent();
        if (type.hasClass('doituong')) {
            remove_filter_theo_1_loai_con($('.listdoituong input'), jClose);
        } else if (type.hasClass('tinhthanh')) {
            remove_filter_theo_1_loai_con($('.listtinhthanh input'), jClose);
        } else if (type.hasClass('diahinh')) {
            debugger;
            remove_filter_theo_1_loai_con($('.listdiahinh input'), jClose);
        }

        $(this).parent().remove();

        $('.btntimkiem').click();
    });


    // $.get('mst/home_dia_diem.mst', function(template) {
    //     debugger;
    //     // var template_g = Mustache.parse(template);//$(templates).filter("#home_dia_diem").html();
    //     var rendered = Mustache.render($(template).filter('#home_dia_diem').html(), jsonData[0])
    //     // var rendered = Mustache.render(template, jsonData[0]);
    //     // $('#list_dia_diem').html(rendered);
    //     $('#list_dia_diem').html(rendered);
    // });
});
