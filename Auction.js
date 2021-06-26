var _selectInitHtml = $('#selectInit').html();
var _selectOptionHtml = $('#selectOption').html();

var _detailOptionBeforeFirstCategory = '';

//검색 초기화
var setRequestInit = function (paramRequest, isChangeClass) {
    var request;
    if (paramRequest == null) {
        request = new Object();
        request.firstCategory = 0;
        request.secondCategory = 0;
        request.classNo = _pcClassNo;
        $("input[type='radio'][name='deal-classNo']:radio[value='" + request.classNo + "']").prop("checked", true).click();
    }
    else {
        request = paramRequest;
        if (isChangeClass == false) { //isChangeClass가 True 경우만 클래스 변경
            var classNo = $("input[type=radio][name=deal-classNo][data-selected=selected]").val()
            request.classNo = classNo;
        }
        else {
            if (_pcClassNo != "") {
                request.classNo = _pcClassNo;
            }
            else {
                request.classNo = '';
            }
        }
    }

    request.itemTier = '';
    request.itemGrade = '';
    request.itemLevelMin = 0;
    request.itemLevelMax = $("#txtItemLevelMax").attr('max');
    request.itemName = '';

    request.pageNo = 1;

    //기본 최저가
    request.sortOption = new Object();
    var sortOption = new Object();
    sortOption.Sort = 'BIDSTART_PRICE';
    sortOption.IsDesc = false;
    request.sortOption = sortOption;

    request.gradeQuality = '';

    //스킬 상세 초기화
    request.skillOptionList = new Array();
    for (var i = 0; i < 3; i++) {
        var skillOption = new Object();
        skillOption.firstOption = '';
        skillOption.secondOption = '';
        skillOption.minValue = '';
        skillOption.maxValue = '';

        request.skillOptionList[i] = skillOption;
    }

    //기타 상세 초기화
    request.etcOptionList = new Array();
    for (var i = 0; i < 4; i++) {
        var etcOption = new Object();
        etcOption.firstOption = '';
        etcOption.secondOption = '';
        etcOption.minValue = '';
        etcOption.maxValue = '';

        request.etcOptionList[i] = etcOption;
    }

    return request;
}

//기본 검색 세팅
var setRequest = function (pageNo) {
    var category = $("li[name='category']").filter(".is-active").data('value').split(',');
    var firstCategory = category[0];
    var secondCategory = category[1];
    var classNo = $("#selClass input[data-selected]").val();
    var itemTier = $("#selItemTier input[data-selected]").val();
    var itemGrade = $("#selItemGrade input[data-selected]").val();
    var itemLevelMin = $("#txtItemLevelMin").val();
    var itemLevelMax = $("#txtItemLevelMax").val();
    var itemName = $("#txtItemName").val();

    _request.firstCategory = firstCategory;
    _request.secondCategory = secondCategory;
    _request.classNo = classNo;
    _request.itemTier = itemTier;
    _request.itemGrade = itemGrade;
    _request.itemLevelMin = itemLevelMin;
    _request.itemLevelMax = itemLevelMax;
    _request.itemName = itemName;

    //기본 최저가
    _request.sortOption = new Object();
    _request.sortOption.Sort = 'BIDSTART_PRICE';
    _request.sortOption.IsDesc = false;

    if (pageNo != null)
        _request.pageNo = pageNo;
}

//정렬 세팅
var setRequestSort = function () {
    if (_request.sortOption == null) {
        _request.sortOption = new Object(); //정렬 검색
    }

    $(".button--list-sort").each(function () {
        var orderby = $(this).closest('th').attr('aria-sort');
        var id = $(this).attr('id');
        if (orderby == 'descending') {
            var sortOption = new Object();
            sortOption.Sort = id;
            sortOption.IsDesc = true;
            _request.sortOption = sortOption;
            return false;
        }
        else if (orderby == 'ascending') {
            var sortOption = new Object();
            sortOption.Sort = id;
            sortOption.IsDesc = false;
            _request.sortOption = sortOption;
            return false;
        }
    })
}

//상세 검색 세팅
var setRequestDetail = function (pageNo) {
    var request = new Object();

    var category = $("input[type=radio][name=deal-category-detail][data-selected=selected]").val().split(',');
    var firstCategory = category[0];
    var secondCategory = category[1];
    var classNo = $("input[type=radio][name=deal-classNo-detail][data-selected=selected]").val();
    var itemTier = $("input[type=radio][name=deal-itemtier-detail][data-selected=selected]").val();
    var itemGrade = $("input[type=radio][name=deal-grade-detail][data-selected=selected]").val();
    var itemLevelMin = $("#txtItemLevelMinDetail").val();
    var itemLevelMax = $("#txtItemLevelMaxDetail").val();
    var itemName = $("#txtItemNameDetail").val();
    var gradeQualityDetail = $("input[type=radio][name=deal-quality-detail][data-selected=selected]").val();

    request.firstCategory = firstCategory;
    request.secondCategory = secondCategory;
    request.classNo = classNo;
    request.itemTier = itemTier;
    request.itemGrade = itemGrade;
    request.itemLevelMin = itemLevelMin;
    request.itemLevelMax = itemLevelMax;
    request.itemName = itemName;
    request.gradeQuality = gradeQualityDetail; //품질

    request.skillOptionList = new Array(); //스킬 상세 검색
    for (var i = 0; i < 3; i++) {
        var firstOption = $("input[type=radio][name=deal-skill1-" + i + " ][data-selected=selected]").val();
        var secondOption = $("input[type=radio][name=deal-option1-" + i + " ][data-selected=selected]").val();
        var minValue = $("#txtSkillMin_" + i).val();
        var maxValue = $("#txtSkillMax_" + i).val();

        var skillOption = new Object();
        skillOption.firstOption = firstOption;
        skillOption.secondOption = secondOption;
        skillOption.minValue = minValue;
        skillOption.maxValue = maxValue;

        request.skillOptionList[i] = skillOption;
    }

    request.etcOptionList = new Array(); //기타 상세 검색
    for (var i = 0; i < 4; i++) {
        var firstOption = $("input[type=radio][name=deal-etc" + i + " ][data-selected=selected]").val();
        var secondOption = $("input[type=radio][name=deal-option2-" + i + " ][data-selected=selected]").val();
        var minValue = $("#txtEtcMin_" + i).val();
        var maxValue = $("#txtEtcMax_" + i).val();

        var etcOption = new Object();
        etcOption.firstOption = firstOption;
        etcOption.secondOption = secondOption;
        etcOption.minValue = minValue;
        etcOption.maxValue = maxValue;

        request.etcOptionList[i] = etcOption;
    }

    if (pageNo != null)
        request.pageNo = pageNo;

    return request;
}

//부모카테고리 선택 시
var changeCategory = function (firstCategory, detailStr) {
    //전체카테고리는 활성화
    if (firstCategory == 0) {
        $('#txtItemLevelMin' + detailStr).attr("disabled", false);
        $('#txtItemLevelMax' + detailStr).attr("disabled", false);
    }

    //아이템 레벨 검색 비활성화 여부
    var categoryInfo = _menuJson["marketCategory"].filter(function (model) {
        return (model.value == firstCategory);
    })[0];

    if (categoryInfo == null || categoryInfo == undefined)
        return false;

    if (categoryInfo.itemLevelSearch == 1) {
        $('#txtItemLevelMin' + detailStr).attr("disabled", false);
        $('#txtItemLevelMax' + detailStr).attr("disabled", false);
    }
    else {
        $('#txtItemLevelMin' + detailStr).attr("disabled", true);
        $('#txtItemLevelMax' + detailStr).attr("disabled", true);
    }
}


//상세 검색 모달 Request값 적용
var searchDetailModalInit = function (request) {
    if (request.firstCategory != null) {
        _detailOptionBeforeFirstCategory = request.firstCategory; //이전 카테고리 저장
        $("input[type='radio'][name='deal-category-detail']:radio[value='" + request.firstCategory + "," + request.secondCategory + "']").prop("checked", true).click();
    }

    if (request.classNo != null) {
        $("input[type='radio'][name='deal-classNo-detail']:radio[value='" + request.classNo + "']").prop("checked", true).click();
    }

    if (request.itemGrade != null) {
        $("input[type='radio'][name='deal-grade-detail']:radio[value='" + request.itemGrade + "']").prop("checked", true).click();
    }

    if (request.itemLevelMin != null) {
        $("#txtItemLevelMinDetail").val(request.itemLevelMin);
    }

    if (request.itemLevelMax != null) {
        $("#txtItemLevelMaxDetail").val(request.itemLevelMax);
    }

    if (request.itemTier != null) {
        $("input[type='radio'][name='deal-itemtier-detail']:radio[value='" + request.itemTier + "']").prop("checked", true).click();
    }

    if (request.gradeQuality != null) {
        $("input[type='radio'][name='deal-quality-detail']:radio[value='" + request.gradeQuality + "']").prop("checked", true).click();
    }

    //아이템레벨 검색 disabled 체크
    changeCategory(request.firstCategory, 'Detail');

    //스킬옵션 바인딩
    setSkillList(request.firstCategory, request.classNo);
    var skillOptionCount = 0;
    for (var i = 0; i < 3; i++) {
        if (request.skillOptionList != null && request.skillOptionList[i] != null && request.skillOptionList[i].firstOption != "" && request.skillOptionList[i].firstOption != undefined) {// 첫번째옵션
            var name = 'deal-skill1-' + i;
            $("input[type='radio'][name='" + name + "']:radio[value='" + request.skillOptionList[i].firstOption + "']").prop("checked", true).click();

            if (request.skillOptionList[i].secondOption != "" && request.skillOptionList[i].secondOption != undefined) { //두번째 옵션
                var subName = 'deal-option1-' + i;
                $.when(
                    $("input[type='radio'][name='" + subName + "']:radio[value='" + request.skillOptionList[i].secondOption + "']").prop("checked", true).trigger('click')
                ).done(function () {
                    $("#txtSkillMin_" + i).val(request.skillOptionList[i].minValue);
                    $("#txtSkillMax_" + i).val(request.skillOptionList[i].maxValue);
                })
            }
            skillOptionCount++;
        }
    }

    //기타옵션 바인딩
    setEtcList(request.firstCategory);
    var etcOptionCount = 0;
    for (var i = 0; i < 4; i++) {
        if (request.etcOptionList != null && request.etcOptionList[i] != null && request.etcOptionList[i].firstOption != "" && request.etcOptionList[i].firstOption != undefined) { //첫번째 옵션
            var name = 'deal-etc' + i;
            $("input[type='radio'][name='" + name + "']:radio[value='" + request.etcOptionList[i].firstOption + "']").prop("checked", true).click();

            if (request.etcOptionList[i].secondOption != "" && request.etcOptionList[i].secondOption != undefined) { //두번째 옵션
                var subName = 'deal-option2-' + i;
                $.when(
                    $("input[type='radio'][name='" + subName + "']:radio[value='" + request.etcOptionList[i].secondOption + "']").prop("checked", true).trigger('click')
                ).done(function () {
                    $("#txtEtcMin_" + i).val(request.etcOptionList[i].minValue);
                    $("#txtEtcMax_" + i).val(request.etcOptionList[i].maxValue);
                })
            }
            etcOptionCount++;
        }
    }
}

//메인 검색 UI 초기화
var searchSync = function (request) {
    $("li[name='category']").removeClass('is-active');
    $("li[name='categoryParent']").removeClass('is-active');
    var mainCategory = $("li[name='category'][data-value='" + request.firstCategory + "," + request.secondCategory + "']")
    mainCategory.addClass('is-active');
    mainCategory.parent().parent().addClass('is-active');
    $("input[type='radio'][name='deal-classNo']:radio[value='" + request.classNo + "']").prop("checked", true).click();
    $("input[type='radio'][name='deal-itemtier']:radio[value='" + request.itemTier + "']").prop("checked", true).click();
    $("input[type='radio'][name='deal-grade']:radio[value='" + request.itemGrade + "']").prop("checked", true).click();
    $("#txtItemLevelMin").val(request.itemLevelMin);
    $("#txtItemLevelMax").val(request.itemLevelMax);
    $("#txtItemName").val(request.itemName);

    //정렬 초기화
    $(".button--list-sort").each(function () {
        $(this).closest('th').attr('aria-sort', 'none');
    });

    if (request.sortOption != null) {
        if (request.sortOption.IsDesc == true) {
            $("#" + request.sortOption.Sort).closest("th").attr('aria-sort', 'descending')
        }
        else if (request.sortOption.IsDesc == false) {
            $("#" + request.sortOption.Sort).closest("th").attr('aria-sort', 'ascending')
        }
        else {
            $("#" + request.sortOption.Sort).closest("th").attr('aria-sort', 'none')
        }
    }
}

/*스킬 옵션 세팅*/
var setSkillList = function (firstCategory, classNo, that) {
    var selector = new Array();
    var seq = "";
    if (that != null) {
        seq = that.attr('id').split('_')[1];
    }

    if ((firstCategory == 0 || firstCategory == 10000 || firstCategory == 210000) && classNo != undefined && classNo != '') { //카테고리(전체 OR 장비 OR 보석) AND 클래스선택
        var skillList = _menuJson.marketAuction.marketMenuAuctionSkillList.filter(function (model) {
            return model.class == classNo;
        });

        if (firstCategory == 10000) { //장비는 그룹스킬은 제외(아이덴티티스킬, 변신스킬)
            skillList = skillList.filter(function (model) {
                return model.isSkillGroup == false; //그룹스킬은 제외
            })
        }

        if (skillList.length > 0) {
            if (seq == "") {
                for (var i = 0; i < 3; i++) {
                    //첫번째 스킬 옵션
                    var allOption = _selectInitHtml.replace('{name}', 'deal-skill1-' + i);
                    $('#selSkill_' + i).html(allOption);
                    $('#selSkill_' + i).attr("disabled", false);
                    skillList.forEach(function (item) {
                        var option = _selectOptionHtml.replace('{name}', 'deal-skill1-' + i).replace('{value}', item.value).replace('{text}', item.text);
                        $('#selSkill_' + i + '> .lui-select__option').append(option);
                    });

                    //두번째 Sub 옵션
                    var allSubOption = _selectInitHtml.replace('{name}', 'deal-option1-' + i);
                    $('#selSkillSub_' + i).html(allSubOption);
                    $('#selSkillSub_' + i).attr("disabled", false);

                    //최대, 최소값
                    $('#txtSkillMin_' + i).attr("disabled", false);
                    $('#txtSkillMax_' + i).attr("disabled", false);
                }
            }
            else {
                //첫번째 스킬 옵션
                var allOption = _selectInitHtml.replace('{name}', 'deal-skill1-' + seq);
                $('#selSkill_' + seq).html(allOption);
                $('#selSkill_' + seq).attr("disabled", false);
                skillList.forEach(function (item) {
                    var option = _selectOptionHtml.replace('{name}', 'deal-skill1-' + seq).replace('{value}', item.value).replace('{text}', item.text);
                    $('#selSkill_' + seq + '> .lui-select__option').append(option);
                });

                //두번째 Sub 옵션
                var allSubOption = _selectInitHtml.replace('{name}', 'deal-option1-' + seq);
                $('#selSkillSub_' + seq).html(allSubOption);
                $('#selSkillSub_' + seq).attr("disabled", false);

                //최대, 최소값
                $('#txtSkillMin_' + seq).attr("disabled", false);
                $('#txtSkillMax_' + seq).attr("disabled", false);
            }

            $('input[name=txtSkillMin]').val('');
            $('input[name=txtSkillMax]').val('');
        }
    }
    else { //해당 안되면 전부 disabled 초기화
        for (var i = 0; i < 3; i++) {
            //첫번째 스킬 옵션
            var allOption = _selectInitHtml.replace('{name}', 'deal-skill1-' + i);
            $('#selSkill_' + i).html(allOption);
            $('#selSkill_' + i).attr("disabled", true);

            var allSubOption = _selectInitHtml.replace('{name}', 'deal-option1-' + i);
            $('#selSkillSub_' + i).html(allSubOption); //두번째 Sub 옵션
            $('#selSkillSub_' + i).attr("disabled", true);

            //최소값
            $('#txtSkillMin_' + i).val('');
            $('#txtSkillMin_' + i).attr("disabled", true);

            //최대값
            $('#txtSkillMax_' + i).val('');
            $('#txtSkillMax_' + i).attr("disabled", true);
        }
    }
}

/*스킬 서브 옵션 세팅*/
var setSkillSubList = function (firstCategory, classNo, that, value) {
    var seq = that.attr('id').split('_')[1];
    var skillId = value;

    if (skillId == "" || classNo == "") {
        var allSubOption = _selectInitHtml.replace('{name}', 'deal-option1-' + seq);
        $('#selSkillSub_' + seq).html(allSubOption); //두번째 Sub 옵션
    }
    else {
        var skillList = _menuJson.marketAuction.marketMenuAuctionSkillList.filter(function (model) {
            return model.class == classNo &&
                model.value == skillId
        })[0];

        var skillSubList;
        if (firstCategory == 10000) { //장비
            skillSubList = skillList.marketMenuSkillTripodList.filter(function (model) {
                return model.isGem == false;
            });
        }
        else if (firstCategory == 210000) { //보석
            skillSubList = skillList.marketMenuSkillTripodList.filter(function (model) {
                return model.isGem == true;
            });
        }
        else { //전체
            skillSubList = skillList.marketMenuSkillTripodList;
            skillSubList.sort(function (a, b) { //보석먼저
                return (b["isGem"] - a["isGem"]);
            })
        }

        var allSubOption = _selectInitHtml.replace('{name}', 'deal-option1-' + seq);
        $('#selSkillSub_' + seq).html(allSubOption); //두번째 Sub 옵션

        skillSubList.forEach(function (item) {
            var option = _selectOptionHtml.replace('{name}', 'deal-option1-' + seq).replace('{value}', item.value).replace('{text}', item.text);
            $('#selSkillSub_' + seq + '> .lui-select__option').append(option);
        })
    }
}

/*기타 옵션 세팅*/
var setEtcList = function (firstCategory, that) {
    var seq = "";
    if (that != null) {
        seq = that.attr('id').split('_')[1];
    }

    if (firstCategory == 0 || firstCategory == 30000 || firstCategory == 200000) { //전체 OR 어빌리티 OR 장신구는 활성화
        var etcList;
        if (firstCategory == 30000) { //어빌리티스톤이면 각인효과만 노출
            etcList = _menuJson.marketAuction.marketMenuAuctionEtcList.filter(function (model) {
                return model.value == 3
            });
        }
        else { //전체, 장신구는 각인효과,
            etcList = _menuJson.marketAuction.marketMenuAuctionEtcList;
        }

        if (etcList.length > 0) {
            if (seq == "") {
                for (var i = 0; i < 4; i++) {
                    //첫번째 스킬 옵션
                    var allOption = _selectInitHtml.replace('{name}', 'deal-etc' + i);
                    $('#selEtc_' + i).html(allOption);
                    $('#selEtc_' + i).attr("disabled", false);

                    //전투특성, 각인효과 option
                    etcList.forEach(function (item) {
                        var option = _selectOptionHtml.replace('{name}', 'deal-etc' + i).replace('{value}', item.value).replace('{text}', item.text);
                        $('#selEtc_' + i + '> .lui-select__option').append(option);
                    });

                    //두번째 Sub 옵션
                    var allSubOption = _selectInitHtml.replace('{name}', 'deal-option2-' + i);
                    $('#selEtcSub_' + i).html(allSubOption);
                    $('#selEtcSub_' + i).attr("disabled", false);

                    if (firstCategory == 30000) //어빌리티 스톤은 수치가 의미가 없음
                    {
                        //최대, 최소값
                        $('#txtEtcMin_' + i).attr("disabled", true);
                        $('#txtEtcMax_' + i).attr("disabled", true);
                    }
                    else {
                        //최대, 최소값
                        $('#txtEtcMin_' + i).attr("disabled", false);
                        $('#txtEtcMax_' + i).attr("disabled", false);
                    }
                }
            }
            else {
                //첫번째 스킬 옵션
                var allOption = _selectInitHtml.replace('{name}', 'deal-etc' + seq);
                $('#selEtc_' + seq).html(allOption);
                $('#selEtc_' + seq).attr("disabled", false);

                //전투특성, 각인효과 option
                etcList.forEach(function (item) {
                    var option = _selectOptionHtml.replace('{name}', 'deal-etc' + seq).replace('{value}', item.value).replace('{text}', item.text);
                    $('#selEtc_' + seq + '> .lui-select__option').append(option);
                });

                //두번째 Sub 옵션
                var allSubOption = _selectInitHtml.replace('{name}', 'deal-option2-' + seq);
                $('#selEtcSub_' + seq).html(allSubOption);
                $('#selEtcSub_' + seq).attr("disabled", false);

                if (firstCategory == 30000) //어빌리티 스톤은 수치가 의미가 없음
                {
                    //최대, 최소값
                    $('#txtEtcMin_' + seq).attr("disabled", true);
                    $('#txtEtcMax_' + seq).attr("disabled", true);
                    $('input[name=txtEtcMin]').val('');
                    $('input[name=txtEtcMax]').val('');
                }
                else {
                    //최대, 최소값
                    $('#txtEtcMin_' + seq).attr("disabled", false);
                    $('#txtEtcMax_' + seq).attr("disabled", false);
                    $('input[name=txtEtcMin]').val('');
                    $('input[name=txtEtcMax]').val('');
                }
            }

            $('input[name=txtEtcMin]').val('');
            $('input[name=txtEtcMax]').val('');
        }
    }
    else { //해당 안되면 전부 disabled 초기화
        for (var i = 0; i < 4; i++) {
            var allOption = _selectInitHtml.replace('{name}', 'deal-etc' + i);
            $('#selEtc_' + i).html(allOption); //첫번째 스킬 옵션
            $('#selEtc_' + i).attr("disabled", true);

            var allSubOption = _selectInitHtml.replace('{name}', 'deal-option2-' + i);
            $('#selEtcSub_' + i).html(allSubOption); //두번째 Sub 옵션
            $('#selEtcSub_' + i).attr("disabled", true);
        }

        $('input[name=txtEtcMin]').val('');
        $('input[name=txtEtcMin]').attr("disabled", true);

        $('input[name=txtEtcMax]').val('');
        $('input[name=txtEtcMax]').attr("disabled", true);
    }
}

/*기타 상세 서브 옵션 세팅*/
var setEtcSubList = function (firstCategory, classNo, that, value) {
    var seq = that.attr('id').split('_')[1];
    var etcId = value;

    if (etcId == "") {
        var allSubOption = _selectInitHtml.replace('{name}', 'deal-option2-' + seq);
        $('#selEtcSub_' + seq).html(allSubOption); //두번째 Sub 옵션
    }
    else {
        var etcList = _menuJson.marketAuction.marketMenuAuctionEtcList.filter(function (model) {
            return model.value == etcId
        })[0];

        var etcSubList;
        if (etcId == 3 && classNo != undefined && classNo != '') { //각인효과는 클래스 선택 여부에 따라 직업각인 노출
            etcSubList = etcList.marketMenuEtcOptionSubList.filter(function (model) {
                return (model.class == classNo || model.class == 0);
            });

            if (etcSubList.length > 1) {
                etcSubList.sort(function (a, b) { //직업각인 순 >, ㄱ,ㄴ,ㄷ 순
                    return (b["class"] - a["class"]) || (a["text"] < b["text"] ? -1 : a["text"] > b["text"] ? 1 : 0);
                })
            }
        }
        else {
            etcSubList = etcList.marketMenuEtcOptionSubList;
            if (etcSubList.length > 1) {
                etcSubList.sort(function (a, b) { //ㄱ,ㄴ,ㄷ 순
                    return (a["text"] < b["text"] ? -1 : a["text"] > b["text"] ? 1 : 0);
                })
            }
        }

        var allSubOption = _selectInitHtml.replace('{name}', 'deal-option2-' + seq);
        $('#selEtcSub_' + seq).html(allSubOption); //두번째 Sub 옵션

        etcSubList.forEach(function (item) {
            var option = _selectOptionHtml.replace('{name}', 'deal-option2-' + seq).replace('{value}', item.value).replace('{text}', item.text);
            $('#selEtcSub_' + seq + '> .lui-select__option').append(option);
        })
    }
}

//스킬 서브 옵션 선택 시 Min,Max 초기화
var setSkillSubOptionMinMax = function (that, value) {
    var seq = that.attr('id').split('_')[1];
    var gemSymbol = '';

    if (value == '500' || value == '2700') { //보석이면 수치가 % 로 변경됨
        gemSymbol = '%';
    }

    $('#txtSkillMin_' + seq).val("");
    $('#txtSkillMax_' + seq).val("");

    $('#txtSkillMinSymbol_' + seq).text(gemSymbol + ' ~');
    $('#txtSkillMaxSymbol_' + seq).text(' ' + gemSymbol);
}

//기타 서브 옵션 선택 시 Min,Max 초기화
var setEtcSubOptionMinMax = function (that, value) {
    var seq = that.attr('id').split('_')[1];

    $('#txtEtcMin_' + seq).val("");
    $('#txtEtcMax_' + seq).val("");
}

//검색 프리셋 리스트 가져오기
var getPesetList = function () {
    $.ajax({
        url: '/Auction/GetAuctionSearchPresetList',
        type: 'POST',
        dataType: 'html',
        async: false,
        success: function (data) {
            if (!jsonResultCommonCheck(data)) {
                return false;
            }

            $('#presetList').html(data);
        },
        error: function (xhr, status, error) {
            ajaxErrorHandler(xhr, status, error);
            return false;
        }
    });
}

//상세검색에서 저장된 파라메터와 변경된 파라메터 비교
var isCompareRequest = function () {
    var category = $("input[type=radio][name=deal-category-detail][data-selected=selected]").val().split(',');
    var firstCategory = category[0];
    var secondCategory = category[1];
    var classNo = $("input[type=radio][name=deal-classNo-detail][data-selected=selected]").val();
    var itemTier = $("input[type=radio][name=deal-itemtier-detail][data-selected=selected]").val();
    var itemGrade = $("input[type=radio][name=deal-grade-detail][data-selected=selected]").val();
    var itemLevelMin = $("#txtItemLevelMinDetail").val();
    var itemLevelMax = $("#txtItemLevelMaxDetail").val();
    var itemName = $("#txtItemNameDetail").val();
    var gradeQualityDetail = $("input[type=radio][name=deal-quality-detail][data-selected=selected]").val();

    if (_request.firstCategory != firstCategory) {
        return false;
    }

    if (_request.secondCategory != secondCategory) {
        return false;
    }

    if (_request.classNo != classNo) {
        return false;
    }

    if (_request.itemTier != itemTier) {
        return false;
    }

    if (_request.itemGrade != itemGrade) {
        return false;
    }

    if (_request.itemLevelMin != itemLevelMin) {
        return false;
    }

    if (_request.itemLevelMax != itemLevelMax) {
        return false;
    }

    if (_request.itemName != itemName) {
        return false;
    }

    if (_request.gradeQuality != gradeQualityDetail) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        var firstOption = $("input[type=radio][name=deal-skill1-" + i + " ][data-selected=selected]").val();
        var secondOption = $("input[type=radio][name=deal-option1-" + i + " ][data-selected=selected]").val();
        var minValue = $("#txtSkillMin_" + i).val();
        var maxValue = $("#txtSkillMax_" + i).val();

        var skillOption = new Object();
        skillOption.firstOption = firstOption;
        skillOption.secondOption = secondOption;
        skillOption.minValue = minValue;
        skillOption.maxValue = maxValue;

        if (_request.skillOptionList[i].firstOption != skillOption.firstOption) {
            return false;
        }

        if (_request.skillOptionList[i].secondOption != skillOption.secondOption) {
            return false;
        }

        //첫번째, 두번째 옵션이 0이면 비교가 의미가 없음
        if (_request.skillOptionList[i].firstOption != 0 && _request.skillOptionList[i].secondOption != 0) {
            if (_request.skillOptionList[i].minValue != skillOption.minValue) {
                return false;
            }
            if (_request.skillOptionList[i].maxValue != skillOption.maxValue) {
                return false;
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        var firstOption = $("input[type=radio][name=deal-etc" + i + " ][data-selected=selected]").val();
        var secondOption = $("input[type=radio][name=deal-option2-" + i + " ][data-selected=selected]").val();
        var minValue = $("#txtEtcMin_" + i).val();
        var maxValue = $("#txtEtcMax_" + i).val();

        var etcOption = new Object();
        etcOption.firstOption = firstOption;
        etcOption.secondOption = secondOption;
        etcOption.minValue = minValue;
        etcOption.maxValue = maxValue;

        if (_request.etcOptionList[i].firstOption != etcOption.firstOption) {
            return false;
        }

        if (_request.etcOptionList[i].secondOption != etcOption.secondOption) {
            return false;
        }

        //첫번째, 두번째 옵션이 0이면 비교가 의미가 없음
        if (_request.etcOptionList[i].firstOption != 0 && _request.etcOptionList[i].secondOption != 0) {
            if (_request.etcOptionList[i].minValue != etcOption.minValue) {
                return false;
            }
            if (_request.etcOptionList[i].maxValue != etcOption.maxValue) {
                return false;
            }
        }
    }

    return true;
}

//파라메터 체크
var isCheckParameter = function (itemLevelMax) {
    var itemLevelMax = _menuJson["marketMaxItemLevel"]

    var compareItemLevelMaxValue;
    if ($("#txtItemLevelMaxDetail").val() != undefined && $("#txtItemLevelMaxDetail").val() != '') { //상세검색 모달창 ItemlevelMax
        compareItemLevelMaxValue = $("#txtItemLevelMaxDetail").val();
    }
    else {
        compareItemLevelMaxValue = $("#txtItemLevelMax").val();
    }

    if (compareItemLevelMaxValue > itemLevelMax) {
        commonModalHandler("아이템 레벨은 " + itemLevelMax + " 까지만 검색 가능합니다.");
        return false;
    }

    return true;
}

//검색
var getSearchAjax = function (sucCallBack) {
    var loader;

    $.ajax({
        url: '/Auction/GetAuctionListV2',
        type: 'POST',
        dataType: 'html',
        data: {
            request: _request,
            tooltipData: _pcEquipTooltipData
        },
        beforeSend: function (xhr) {
            loader = new lui.utils.Loader();
        },
    }).done(function (data, jqxhr) {
        if (!jsonResultCommonCheck(data)) {
            return false;
        }

        if (data != '' && data != null) {
            $('#auctionList').html(data);

            lui.deal.list();
            lui.deal.itemRenderTooltip();
            lui.deal.myItemRenderTooltip();
            lui.deal.sorting();

            $("#itemNameWords").empty(); //아이템자동완성 목록 제거

            if ($('#auctionList').find(".empty").length > 0) { //검색결과 없으면 정렬 초기화
                delete _request.sortOption;
            }

            //정렬 동기화
            if (_request.sortOption == null) {

                //정렬 초기화
                $(".button--list-sort").each(function () {
                    $(this).closest('th').attr('aria-sort', 'none');
                });
            }
            else {
                if (_request.sortOption.IsDesc == true) {
                    $("#" + _request.sortOption.Sort).closest("th").attr('aria-sort', 'descending')
                }
                else if (_request.sortOption.IsDesc == false) {
                    $("#" + _request.sortOption.Sort).closest("th").attr('aria-sort', 'ascending')
                }
                else {
                    $("#" + _request.sortOption.Sort).closest("th").attr('aria-sort', 'none')
                }
            }

            if (sucCallBack)
                sucCallBack();
        }
    })
        .fail(ajaxErrorHandler)
        .always(function () {
            loader.remove(); // 로더 제거
        });
}

/* 아이템명 삭제 */
$("#btnItemNameRemove").on('click', function (e) {
    $("#txtItemName").val('');
    $("#itemNameWords").empty();

    e.preventDefault();
});

//자동완성 된 아이템 클릭
$(".deal-contents").on('click', '.name .words a', function (e) {
    var val = $(e.currentTarget).text();
    $(".deal-contents").find('#txtItemName').data('word', val).val(val);
    $(".deal-contents").find('.button--deal-submit').trigger('click');
    $(".deal-contents").find('.words').empty();

    e.preventDefault();
});


//아이템명 입력 시 자동완성
var timer;
$(".deal-contents").on("input", "#txtItemName", function () {
    console.log(timer);
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(function () {
        var searchName = $("#txtItemName").val();
        //아이템명 없을 경우 X버튼 숨김
        if (searchName === '') {
            $(this).siblings('.button--itemdic-delete').hide();
            return false;
        }
        else {
            $(this).siblings('.button--itemdic-delete').show();
        }

        if ($("#txtItemName").data('word') === searchName) return false;
        $("#txtItemName").data('word', searchName);

        $.ajax({
            url: '/Auction/GetAuctionItemTopSearch',
            type: 'POST',
            dataType: 'json',
            data: {
                itemName: searchName
            },
            success: function (response) {
                if (!jsonResultCommonCheck(response)) {
                    return false;
                }

                if (response.code == 0) {
                    if (response.data.length > 0) {
                        var html = "<ul>";
                        var li = "<li><a href='#' name='itemNameWorld' data-itemname='{itemname}'>{text}</a></li>";
                        response.data.forEach(function (item) {
                            var itemMarkName = item.replace(searchName, "<mark>" + searchName + "</mark>");
                            var liHtml = li.replace('{itemname}', item).replace("{text}", itemMarkName);
                            html += liHtml;
                        })
                        html += "</ul>";
                        $("#itemNameWords").html(html);
                    }
                    else {
                        $("#itemNameWords").empty();
                    }
                }
                else {
                    $("#itemNameWords").empty();
                }
            },
            error: function (xhr, status, error) {
                ajaxErrorHandler(xhr, status, error);
                $("#itemNameWords").empty();
                return false;
            }
        });
    }, 300)
});

//아이템명 입력 후 아래, 위 화살표로 검색
$(".deal-contents").on('keydown', '.name', function (e) {
    var words = $(".deal-contents").find('.words'),
        active = $(document.activeElement);

    if (e.keyCode === 40) {
        if (active.is('#txtItemName') && words.is(':visible')) {
            words.find('a').eq(0).focus();
        }
        if (active.is(words.find('a')) && !active.is(words.find('a').last())) {
            var next = active.parent().next().find('a');
            next.focus();
        }
        e.preventDefault();
    }
    if (e.keyCode === 38) {
        if (active.is(words.find('a').first())) {
            $(".deal-contents").find('#txtItemName').focus();
        }
        if (active.is(words.find('a')) && !active.is(words.find('a').first())) {
            var prev = active.parent().prev().find('a');
            prev.focus();
        }
        e.preventDefault();
    }
});

/* 아이템명 포커스 해제 */
$(document).on('mousedown keydown', function (e) {
    if (e.type === 'keydown' && e.keyCode === 27 || e.type === 'mousedown' && !$(e.originalEvent.target).closest($(".deal-contents").find('.name')).length) {
        if ($(".deal-contents").find('.words li').length) {
            $(".deal-contents").find('.words').empty();
        }
    }
});


//검색 초기화
$(document).on('click', '.button--deal-reset', function (e) {
    var request = setRequestInit(_request);
    searchSync(request);

    e.preventDefault();
});

/*카테고리 검색*/
$(document).on('click', 'li[name="category"]', function (e) {
    var category = $("li[name='category']").filter(".is-active").data('value').split(',');
    var firstCategory = category[0];
    var secondCategory = category[1];

    //부모 카테고리가 변경되었을 경우에 검색 조건 모두 초기화
    if (firstCategory != 0 && _request.firstCategory != firstCategory) {
        setRequestInit(_request, false);
        _request.firstCategory = firstCategory;
        _request.secondCategory = secondCategory;
        searchSync(_request);
    }

    //아이템 레벨 검색 비활성화 여부
    changeCategory(firstCategory, '');

    if (!isCheckParameter()) {
        return false;
    }

    setRequest(1);

    getSearchAjax();

    e.preventDefault();
});

/*정렬 검색*/
$(document).on('click', '.button--list-sort', function (e) {
    if (!isCheckParameter()) {
        return false;
    }

    setRequest(1);
    setRequestSort();

    getSearchAjax();

    e.preventDefault();
});

/* 기본 검색 (상세 설정 옵션까지 검색 됨)*/
$(document).on('click', '#btnSearch', function (e) {
    if (!isCheckParameter()) {
        return false;
    }

    setRequest(1);

    getSearchAjax();

    e.preventDefault();
});

/*경매장 상세 레이어*/
$('.deal-contents button.button--deal-detail').on('click', function (ev) {
    setRequest();
    var loader = new lui.utils.Loader();
    var _content = '';

    $.when(
        $.ajax({
            url: '/Auction/GetAuctionSearchDetail',
            type: 'POST',
            dataType: 'html',
            data: {
                request: _request
            },
            success: function (data) {
                if (data == '') {
                    commonModalHandler("상세 옵션 검색 불러오기에 실패하였습니다.");
                    return false;
                }
                _content = data;
            },
            error: function (xhr, status, error) {
                ajaxErrorHandler(xhr, status, error);
                return false;
            }
        })
    ).done(function () {
        if (_content != '') {
            var modal = new lui.utils.Modal({
                id: 'modal-deal-option',
                class: 'option',
                isShowModal: true,
                isShowClose: true,
                title: '상세 옵션 검색',
                content: _content,
                isHide: false,
                button: [
                    {
                        type: 'button', text: '검색', className: 'lui-modal__search', onClick: function (e) {
                            if (!isCheckParameter()) {
                                return false;
                            }

                            _request = setRequestDetail(1);
                            //기본값 동기화

                            getSearchAjax(function () {
                                modal.args.isHide = true;
                                modal.hide();
                                searchSync(_request);
                            });
                        }
                    },
                    {
                        type: 'button', text: '초기화', className: 'lui-modal__reset', onClick: function (e) {
                            var request = setRequestInit();
                            //Modal UI 초기화
                            searchDetailModalInit(request);
                            for (var i = 0; i < 3; i++) {
                                $("#txtSkillMin_" + i).val("");
                                $("#txtSkillMax_" + i).val("");
                            }

                            for (var i = 0; i < 4; i++) {
                                $("#txtEtcMin_" + i).val("");
                                $("#txtEtcMax_" + i).val("");
                            }

                            $('input:radio[name="preset"]').prop("checked", false);
                        }
                    }
                ],
                cbInit: function (e) {
                    /* 디자인 셀렉트 */
                    $(e.target).find('.lui-select').each(function () {
                        var select = new lui.utils.Select({
                            target: $(this),
                            cbChange: function (e, callback) {
                                if ($(this)[0].target.attr('id') == 'selCategoryDetail') {
                                    var category = e.value.split(',');
                                    var firstCategory = category[0];
                                    var classNo = $("input[type=radio][name=deal-classNo-detail][data-selected=selected]").val();

                                    if (_detailOptionBeforeFirstCategory != firstCategory) { //이전 첫번째카테고리와 다를 경우만 옵션바인딩
                                        //전체카테고리로 변경되면 기존의 값은 유지
                                        var request;
                                        if (firstCategory == 0) {
                                            request = setRequestDetail();
                                        }

                                        //아이템 레벨 검색 비활성화 여부
                                        changeCategory(firstCategory, 'Detail')

                                        setSkillList(firstCategory, classNo);
                                        setEtcList(firstCategory);

                                        _detailOptionBeforeFirstCategory = firstCategory;

                                        //전체카테고리로 변경되면 기존의 값은 유지
                                        if (firstCategory == 0) {
                                            searchDetailModalInit(request);
                                        }
                                    }
                                }
                                else if ($(this)[0].target.attr('id') == 'selClassDetail') {
                                    var category = $("input[type=radio][name=deal-category-detail][data-selected=selected]").val().split(',');
                                    var firstCategory = category[0];
                                    var classNo = e.value;
                                    //sub option binding
                                    setSkillList(firstCategory, classNo);
                                    setEtcList(firstCategory);
                                }
                                else if ($(this)[0].target.attr('name') == 'selSkill') {
                                    var category = $("input[type=radio][name=deal-category-detail][data-selected=selected]").val().split(',');
                                    var firstCategory = category[0];
                                    var classNo = $("input[type=radio][name=deal-classNo-detail][data-selected=selected]").val();
                                    var that = $(this)[0].target

                                    //스킬 상세 서브 옵션 바인딩
                                    setSkillSubList(firstCategory, classNo, that, e.value);
                                }
                                else if ($(this)[0].target.attr('name') == 'selEtc') {
                                    var category = $("input[type=radio][name=deal-category-detail][data-selected=selected]").val().split(',');
                                    var firstCategory = category[0];
                                    var classNo = $("input[type=radio][name=deal-classNo-detail][data-selected=selected]").val();
                                    var that = $(this)[0].target

                                    //기타 상세 서브 옵션 바인딩
                                    setEtcSubList(firstCategory, classNo, that, e.value);
                                }
                                else if ($(this)[0].target.attr('name') == 'selSkillSub') {
                                    var that = $(this)[0].target
                                    //min, max 초기화
                                    setSkillSubOptionMinMax(that, e.value);
                                    if (callback)
                                        callback();
                                }
                                else if ($(this)[0].target.attr('name') == 'selEtcSub') {
                                    var that = $(this)[0].target
                                    //min, max 초기화
                                    setEtcSubOptionMinMax(that, e.value);
                                    if (callback)
                                        callback();
                                }
                            }
                        });
                    });

                    /* 옵션 토글 */
                    $(e.target).find('.button--option-toggle').each(function () {
                        var target = $(this);
                        target.on('click', function () {
                            target.toggleClass('is-active');
                        });
                    });

                    /* 경매장 - 검색 프리셋 저장 */
                    $(e.target).find('.button--preset-save').on('click', function (ev) {
                        var checkedRadio = $('input:radio[name=preset]:checked');
                        if (checkedRadio.length == 0) {
                            commonModalHandler("검색 프리셋을 선택해 주세요.");
                            return false;
                        }

                        if (checkedRadio.data('preset') == undefined) {
                            var modal = new lui.utils.Modal({
                                id: 'modal-deal-save',
                                class: 'save',
                                isShowModal: true,
                                isShowClose: true,
                                title: '검색 프리셋 저장',
                                content: $('#modal-deal-save-temp').find('.lui-modal__content').html(),
                                button: [
                                    {
                                        type: 'button', text: '저장', className: 'lui-modal__confirm', onClick: function (e) {
                                            var slot = checkedRadio.data('slot');
                                            var title = $("#modal-deal-save").find("#presetTitle").val();
                                            if (title == '') {
                                                commonModalHandler('검색 프리셋 이름을 입력해 주세요.');
                                                return false;
                                            }

                                            var titleEncode = encodeURIComponent(title);
                                            var request = setRequestDetail(1);

                                            $.ajax({
                                                url: '/Auction/SetAuctionSearchPreset',
                                                type: 'POST',
                                                dataType: 'json',
                                                data: {
                                                    slot: slot,
                                                    title: titleEncode,
                                                    request: request
                                                },
                                                async: false,
                                                success: function (data) {
                                                    if (!jsonResultCommonCheck(data)) {
                                                        return;
                                                    }

                                                    if (data.code == 0) {
                                                        commonModalHandler("검색 프리셋이 저장되었습니다.");
                                                        getPesetList();
                                                        return false;
                                                    }
                                                    else {
                                                        commonModalHandler("검색 프리셋 저장에 실패하였습니다.");
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    ajaxErrorHandler(xhr, status, error);
                                                    return false;
                                                },
                                                complete: function () {
                                                    modal.remove();
                                                }
                                            });
                                        }
                                    },
                                    {
                                        type: 'button', text: '취소', className: 'lui-modal__cancel', onClick: function (e) {
                                            modal.hide();
                                        }
                                    }
                                ],
                                cbInit: function (e) {
                                },
                                cbHideCompleted: function () {
                                    modal.remove();
                                }
                            });
                        }
                        else {
                            var modal = new lui.utils.Modal({
                                id: 'modal-deal-save2',
                                class: 'save',
                                isShowModal: true,
                                isShowClose: true,
                                title: '검색 프리셋 덮어쓰기',
                                content: $('#modal-deal-save2-temp').find('.lui-modal__content').html(),
                                button: [
                                    {
                                        type: 'button', text: '저장', className: 'lui-modal__confirm', onClick: function (e) {
                                            var slot = checkedRadio.data('slot');
                                            var title = $("#modal-deal-save2").find("#presetTitle2").val();
                                            if (slot == '') {
                                                commonModalHandler('검색 프리셋을 체크해 주세요.');
                                                return false;
                                            }

                                            if (title == '') {
                                                commonModalHandler('검색 프리셋 이름을 입력해 주세요.');
                                                return false;
                                            }

                                            var request = setRequestDetail(1);

                                            $.ajax({
                                                url: '/Auction/SetAuctionSearchPreset',
                                                type: 'POST',
                                                dataType: 'json',
                                                data: {
                                                    slot: slot,
                                                    title: encodeURIComponent(title),
                                                    request: request
                                                },
                                                async: false,
                                                success: function (data) {
                                                    if (!jsonResultCommonCheck(data)) {
                                                        return;
                                                    }

                                                    if (data.code == 0) {
                                                        commonModalHandler("검색 프리셋이 저장되었습니다.");
                                                        getPesetList();
                                                        return false;
                                                    }
                                                    else {
                                                        commonModalHandler("검색 프리셋 저장에 실패하였습니다.");
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    ajaxErrorHandler(xhr, status, error);
                                                    return false;
                                                },
                                                complete: function () {
                                                    modal.remove();
                                                }
                                            });
                                        }
                                    },
                                    {
                                        type: 'button', text: '취소', className: 'lui-modal__cancel', onClick: function (e) {
                                            modal.hide();
                                        }
                                    }
                                ],
                                cbInit: function (e) {
                                    $("#modal-deal-save2").find("#presetTitle2").val(checkedRadio.val());
                                },
                                cbHideCompleted: function () {
                                    modal.remove();
                                }
                            });
                        }
                    });

                    /*Request 바인딩*/
                    searchDetailModalInit(_request);
                },
                cbHide: function (e) {
                    if (!e.args.isHide) {
                        modal.show();
                        if (!isCompareRequest()) {
                            commonModalHandlerConfirm("검색 옵션이 저장되지 않았습니다.<br>변경사항을 되돌리고 창을 닫으시겠습니까?", function () { e.args.isHide = true; modal.hide(); })
                        }
                        else {
                            e.args.isHide = true;
                            modal.hide();
                        }
                    }
                },
                cbHideCompleted: function () {
                    modal.remove();
                }
            });
        }

        //loader Remove
        loader.remove();
    })
});

var Reloading = function () {
    this.reload = function () {
        _request.firstCategory = 0;
        _request.secondCategory = 0;
        var request = setRequestInit(_request);
        searchSync(request);
        $('#auctionList #auctionListTbody').html("<tr class='empty'><td colspan='7'>아이템 명을 입력하고 검색해주세요.</td></tr>");
    }
}

//페이징
var Paging = function () {

    this.page = function (page) {
        _request.pageNo = page;

        getSearchAjax();
    }
}

var reloading = new Reloading();
var paging = new Paging();