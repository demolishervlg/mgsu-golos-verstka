
// Селект
// $(document).ready(function() {
//     $('.js-select').select2({
//         width: 'style', // need to override the changed default
//         minimumResultsForSearch: -1,
//     })
// });


$(document).ready(function() {
    init();
})

function init() {
    $('.js-select').select2({
        width: 'style',
        minimumResultsForSearch: -1,
    }).on('select2:open', function(e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
            jQuery('.select2-dropdown').slideDown(150);
            const evt = "scroll.select2";
        }, 0);
    });
}


function close() {
    $(".js-select").select2('destroy')
    init();
}


//Раскрытие фильтра
$(document).on('click', '.filter', function() {
    $(this).toggleClass("active");
    $('.form-filter').slideToggle(300);
    return false;
});

//Закрытие фильтра
$(document).on('click', '.close-icon', function() {
    $(".filter").closest(".filter").toggleClass("active");
    $('.form-filter').slideToggle(300);
    return false;
});


//Раскрытие плашки из списка
$(document).on('click', '.accordion', function(e) {
    if(!(e.target.tagName === "A") && !(e.target.className === "copy-icon")){
        $(this).toggleClass("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
})


// Копировать value из input
$(document).on('click', '.copy-icon', function() {
    let copyText = $(this).closest(".text-field-copi").find(".copy");
    copyText.select();
    document.execCommand("copy");
})


// Копировать не input
$(document).on('click', '.copy-icon', function() {
    let copyText = $(this).closest(".code").find(".link");
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(copyText).text()).select();
    document.execCommand("copy");
    $temp.remove();
})


// Возможность изменять элемент по кнопке
$(document).on('click', '.text-field-edit', function(e) {
    console.log(e.target.className)
    if(e.target.className === "edit-pencil-line-icon btn-edit"){
        let elem = $(this).find(".text-field__input");
        let ro = elem.prop('readonly');
        elem.prop('readonly', !ro).focus();
        $(this).val(ro ? 'Save' : 'Edit');
    }
})
$(document).on('blur', '.btn-edit-input', function() {
    $(this).attr("readonly", true)
})


// Возможность изменять элемент по клику на поле
$(document).on('focus', '.edit', function() {
    $(this).attr("readonly", false)
})
$(document).on('blur', '.edit', function() {
    $(this).attr("readonly", true)
})


// custom-checkbox active
$(document).ready(function(){
    $(".custom-checkbox").each(function (key, item) {
        if($(item).is(':checked')){
            $(item).closest(".sovet-field").addClass("active")
        }
    })
    $(".custom-checkbox").click(function(){
        $(this.closest(".sovet-field")).toggleClass("active");
    })
})


// Удаление полей из формы
$(document).on('click', '.delete-sovet', function() {
    let sovetField = $(this).closest(".sovet-field");
    console.log($(sovetField).attr('data-last-index'))
    if($(sovetField).attr('data-last-index') !== "0"){
        sovetField.addClass("hidden");
        setTimeout(function(){
            sovetField.remove();
        }, 500)

    }
});


// Добавление полей в форму
function addEl(el, name, type) {

    let inputs  = document.querySelectorAll(el)
    let index   = (inputs[inputs.length-1]).getAttribute('data-last-index');
    let lastNum = ((inputs[inputs.length-1]).getAttribute('name'));
    let nextNum = name + "[" + (Number(index)+1) + "]";

    if(type === 'text'){
        let elemDiv     = document.createElement("div");
        elemDiv.className = "input-add-minobr";
        elemDiv.id= "add-minobr["+(Number(index)+1)+"]";
        elemDiv.setAttribute("data-last-index", Number(index)+1);
        let elem        = document.createElement("input");
        elem.className  = "text-field__input";
        elem.setAttribute("type", "text");
        elem.setAttribute("id", nextNum);
        elem.setAttribute("name", nextNum);
        elem.setAttribute("data-last-index", Number(index)+1);
        elem.setAttribute("placeholder", "Приказ Минобрнауки России");
        elemDiv.append(elem)

        let parentGuest = document.getElementById(inputs[inputs.length-1].id);

        $(elemDiv).addClass("hidden")
        parentGuest.parentNode.insertBefore(elemDiv, parentGuest.nextSibling);
        setTimeout(function(){
            $(elemDiv).removeClass('hidden')
        }, 10)
    }

    if(type === 'select') {

        const selectDiv = document.createElement("div");
        selectDiv.className = "select";
        selectDiv.id = "select[" + (Number(index) + 1) + "]";
        selectDiv.setAttribute("data-last-index", Number(index) + 1);

        const select = document.createElement("select");
        select.id = nextNum;
        select.name = nextNum;
        select.setAttribute("data-last-index", Number(index) + 1);
        select.setAttribute("data-placeholder", "Научные специальности");
        select.className = "js-select addSelStudy";
        const listOptions =
            [
                "",
                "Кандидат технических наук",
                "item 2",
                "item 3"
            ];

        const listSelects = [];

        listSelects.push(select);

        for (let i = 0; i < listOptions.length; i++) {
            const option = document.createElement("option");
            option.value = listOptions[i];
            option.text = listOptions[i];
            select.add(option);
        }

        selectDiv.append(select)

        let parentGuest = document.getElementById(inputs[inputs.length - 1].id);
        $(selectDiv).addClass("hidden")
        parentGuest.parentNode.insertBefore(selectDiv, parentGuest.nextSibling);
        setTimeout(function () {
            $(selectDiv).removeClass('hidden')
        }, 10)
        init();
    }

    if(type === 'sovet-field') {
        let elem = document.createElement("div");
        elem.className = "sovet-field field" + [index];
        elem.setAttribute("data-last-index", Number(index)+1)
        elem.innerHTML =
            "<div class=\"name-field\">" +
            "<a href=\"#\" class=\"delete-sovet\"><span class=\"plus-not-border-icon\"></span></a>" +
            "<input type=\"text\" name='sovetName["+(Number(index)+1)+"]' class=\"text-field__input edit\" placeholder=\"ФИО участника\" readonly=\"true\" value=\"\"/>" +
            "</div>" +
            "<div class=\"select-wrap __select\">\n" +
            "<select class=\"js-select\" name='sovetState["+(Number(index)+1)+"]'>" +
            "<option value=\"item1\">председатель</option>" +
            "<option value=\"item2\">зам. председателя</option>" +
            "<option value=\"item3\">ученый секретарь</option>" +
            "<option value=\"item4\">член совета</option>" +
            "</select>" +
            "</div>" +
            "<div class=\"text-field-edit\">" +
            "<input class=\"text-field__input btn-edit-input\" type=\"text\" name='sovetEmail["+(Number(index)+1)+"]' id=\"sovet\" readonly placeholder=\"эл. почта участника\" value=\"\">" +
            "<span class=\"edit-pencil-line-icon btn-edit\"></span>" +
            "</div>";

        console.log(index)
        let parentGuest = $(".sovet-fields");
        $(elem).addClass("hidden")
        parentGuest.append(elem);
        setTimeout(function(){
            $(elem).removeClass('hidden')
        }, 50)

        $('.js-select').select2({
            width: 'style', // need to override the changed default
            minimumResultsForSearch: -1,
        })

    }
}

$( function() {
    $("#date").datepicker({
        dateFormat : "yy-mm-dd",
        monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        beforeShow: function () {
            $(".all").css("overflow", "hidden");
        },
        onClose: function () {
            $(".all").css("overflow", "auto");
        },

    });
} );