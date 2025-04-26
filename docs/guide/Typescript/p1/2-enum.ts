enum Status {
    offline,
    online
}
console.log(Status.offline)

enum Month {
    Jan = 1,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
};

function isItSummer(month: Month) {
    let isSummer: boolean;
    switch (month) {
        case Month.Jun:
        case Month.Jul:
        case Month.Aug:
            isSummer = true;
            break;
        default:
            isSummer = false;
            break;
    }
    return isSummer;
}
console.log(isItSummer(Month.Jun)); // true
console.log(isItSummer(Month.Nov)); // false


console.log(Month['Jan'])
// var Months;
// (function (Month) {
//     Month[Month["Jan"] = 0] = "Jan";
//     Month[Month["Feb"] = 1] = "Feb";
//     Month[Month["Mar"] = 2] = "Mar";
//     Month[Month["Apr"] = 3] = "Apr";
//     Month[Month["May"] = 4] = "May";
//     Month[Month["Jun"] = 5] = "Jun";
//     Month[Month["Jul"] = 6] = "Jul";
//     Month[Month["Aug"] = 7] = "Aug";
//     Month[Month["Sep"] = 8] = "Sep";
//     Month[Month["Oct"] = 9] = "Oct";
//     Month[Month["Nov"] = 10] = "Nov";
//     Month[Month["Dec"] = 11] = "Dec";
// })(Month || (Months = {}));



enum ApprovalStatus {
    draft,
    submitted,
    approved,
    rejected
};
const request = {
    id: 1,
    status: ApprovalStatus.approved,
    description: 'Please approve this request'
};

if (request.status === ApprovalStatus.approved) {
    // send an email
    console.log('Send email to the Applicant...');
}

// any
let result4: any;

result4 = 1;
console.log(result4);

result4 = 'Hello';
console.log(result4);

result4 = [1, 2, 3];
const total3 = result4.reduce((a: number, b: number) => a + b, 0);
console.log(total3);

// json may come from a third-party API
const json = `{"latitude": 10.11, "longitude":12.12}`;

// parse JSON to find location
const currentLocation = JSON.parse(json);
console.log(currentLocation);

// 您使用 object 类型声明一个变量，您也可以将任何值赋值给它。但是，即使方法存在，您也不能调用它
let result5: any = 1;
// let result6: any;
let result6: Object;
// result6 = { a: 10.123 };
// console.log(result6.toFixed());
// result6.willExist(); //

function log(message: string): void {
    console.log(message);
}
