import { FormControl, FormGroup } from '@angular/forms';
// 数字范围
export function numberValidator(control: FormControl): any {
    let val = control.value;
    let numReg = /(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/
    let result;

    if (val == '') {
        result = true;
    } else {
        result = numReg.test(val);
    }

    return result ? null : { number: { info: '数字不在10000-65535范围内' } };
}
// ip4验证
export function ipValidator(control: FormControl): any {
    let val = control.value;
    let ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    let result;

    if (val == '') {
        result = true;
    } else {
        result = ipReg.test(val);
    }

    return result ? null : { ip: { info: 'ip格式不正确' } };
}
// 端口验证
export function portValidator(control: FormControl): any {
    let val = control.value;
    let portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
    let result;

    if (val == '') {
        result = true;
    } else {
        result = portReg.test(val);
    }

    return result ? null : { port: { info: '端口格式不正确' } };
}
// 手机号码
export function mobileValidator(control: FormControl): any {
    let val = control.value;
    let mobieReg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    let result;

    if (val == ''|| val== null) {
        result = true;
    } else {
        result = mobieReg.test(val);
    }
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}

// 邮箱
export function emailValidator(control: FormControl): any {
    let val = control.value;
    let emailReg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    let result;

    if (val == '') {
        result = true;
    } else {
        result = emailReg.test(val);
    }
    return result ? null : { email: { info: '邮箱格式不正确' } };
}

// 身份证
export function cardIdValidator(control: FormControl): any {
    let val = control.value;
    let cardIdReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

    let result;

    if (val == '') {
        result = true;
    } else {
        result = cardIdReg.test(val);
    }

    return result ? null : { cardId: { info: '身份证格式不正确' }, idcard: true };
}

// 密码
export function equalValidator(group: FormGroup): any {
    let password: FormControl = group.get("password") as FormControl;
    let pwdConfirm: FormControl = group.get("pwdConfirm") as FormControl;

    let valid: boolean = (password.value === pwdConfirm.value);
    return valid ? null : { confirmPwd: { info: '两次输入的密码不一致' } };
}

// 英文名称
export function enNameValidator(control: FormControl): any {
    let val = control.value;
    let enNameReg = /^\w+$/ig;      //只能输入英文字母和数字，不能输入中文
    let result;

    if (val == '') {
        result = true;
    } else {
        result = enNameReg.test(val);
    }
    return result ? null : { enName: { info: '只能输入英文、数字' } };
}

// 邮编
export function postCodeValidator(control: FormControl): any {
    let val = control.value;
    let postCodeReg = /^[0-9]{6}$/;   //只能输入6位数字
    let result;

    if (val == '') {
        result = true;
    } else {
        result = postCodeReg.test(val);
    }
    return result ? null : { postCode: { info: '只能输入6位数字' } };
}

//组织代码为纯数字
export function codeValidator(control: FormControl): any {
    let val = control.value;
    let codeReg = /^[0-9]{1,}$/;   //只能输入数字
    let result;

    if (val == '') {
        result = true;
    } else {
        result = codeReg.test(val);
    }
    return result ? null : { code: { info: '只能输入数字' } };
}

// 固定电话
export function fixedLinePhoneValidator(control: FormControl): any {
    let val = control.value;
    let fixedLinePhoneReg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    let result;

    if (val == '') {
        result = true;
    } else {
        result = fixedLinePhoneReg.test(val);
    }
    return result ? null : { fixedLinePhone: { info: '固话格式不正确' } };
}

// 手机号和固话
export function allPhoneValidator(control: FormControl): any {
    let val = control.value;
    let allPhoneReg1 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    let allPhoneReg2 = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    let result;
     if (val == '' || val == null) {
        result = true;
    } else {

        if (!allPhoneReg1.test(val) && !allPhoneReg2.test(val)) {
            result = false;
        } else {
            result = true;
        }
    }
    return result ? null : { allPhone: { info: '联系电话格式不正确' } };
}

// 传真
export function faxValidator(control: FormControl): any {
    let val = control.value;
    let faxReg = /^(\d{3,4}-)?\d{7,8}$/;
    let result;
    if (val == '') {
        result = true;
    } else {
        result = faxReg.test(val);
    }
    return result ? null : { fax: { info: '传真格式不正确' } };
}

// 非空检验
export function nullValidator(control: FormControl): any {
    let val = control.value;
    let result;
	if(val==""){
		return true
	}else{
		if (val.trim() == '') {
	        result = false;
	    } else {
	        result = true;
	    }
	}
    

    return result ? null : { nullValueTip: { info: '输入内容不能为空' } };
}

// 去掉字符串开头空白符
export function removeAllBlankValidator(control: FormControl): any {
    let val = String(control.value);
    let result;
    let valNew = val.replace(/\s*/g, "");

    if (val.length > valNew.length) {
        result = false;
    } else {
        result = true;
    }

    return result ? null : { allBlankTip: { info: '输入内容不能有空格' } };
}

// 用户名输入（中英文、数字、下划线）
export function userNameValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^([A-Za-z0-9_\u4e00-\u9fa5]{1,}\s{0,})+$/g ;
    let valNew1 = /^([A-Za-z0-9_]{1,}\s{0,})+$/g;
    let valNew2 = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/g;

    if (val == '') {
        result = true;
    } else {
        // result = valNew.test(val);
        if (valNew.test(val)) {
            if (valNew1.test(val)) {
                result = true;
            } else if (valNew2.test(val)) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false;
        }
    }

    return result ? null : { userNameTip: { info: '姓名只能为中英文、下划线、数字' } };
}

// 报警阈值
export function alarmNumberRangeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^0\.[0-9]{1}\d{0,3}$/ ; 

    if (val == '') {
        result = true;
    } else {
        result = valNew.test(val)&&(val>0);   
    }

    return result ? null : { alarmNumberRange: { info: '报警阈值范围为 0 到 1' } };
}

// 年龄
export function ageRangeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[1-9]{1}\d*$/ ; 

    if (val == '') {
        result = true;
    } else {
        
        if (valNew.test(val)) {
            if (parseInt(val) < 200) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false; 
        }
    }

    return result ? null : { age: { info: '年龄为1-200之间的正整数' } };
}

// 冰箱层数
export function IceboxRangeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[1-9]{1}\d*$/ ; 

    if (val == '') {
        result = true;
    } else {
        
        if (valNew.test(val)) {
            if (parseInt(val) <= 10) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false; 
        }
    }

    return result ? null : { layer: { info: '冰箱为1-10之间的正整数' } };
}

// 长度限制
export function codeLengthRangeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[0-9]{1,64}$/ ; 

    if (val == '') {
        result = true;
    } else {
        result = valNew.test(val);   
    }

    return result ? null : { codeLength: { info: '只能输入数字并且字符长度不能超过64个字符' } };
}

// 区域代码
export function areaCodeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[0-9]{1,6}$/ ; 

    if (val == '') {
        result = true;
    } else {
        result = valNew.test(val);   
    }

    return result ? null : { codeLength: { info: '只能输入数字并且字符长度不能超过6个字符' } };
}

// topN
export function topNumberValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[1-9]{1}\d*$/ ; 

    if (val == '') {
        result = true;
    } else {
        
        if (valNew.test(val)) {
            if (parseInt(val) <= 100) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false; 
        }
    }

    return result ? null : { number: { info: 'topN为1-100之间的正整数' } };
}

export function rangeValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^(0(\.\d{1,4})?|1)$/ ; 

    if (val == '') {
        result = true;
    } else {
        
        if (valNew.test(val)) {
            if (parseInt(val) <= 1) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false; 
        }
    }

    return result ? null : { number: { info: '阈值为0-1之间的小数' } };
}
// 深度检索天数
export function depDaysValidator(control: FormControl): any {
    let val = control.value;
    let result;
    let valNew = /^[1-9]{1}\d*$/ ; 

    if (val == '') {
        result = true;
    } else {
        
        if (valNew.test(val)) {
            if (parseInt(val) < 90) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false; 
        }
    }

    return result ? null : { days: { info: '深度检索天数为1-90之间的正整数' } };
}



