/////////////////////////////////// Before Factory ///////////////////////////////////

/*
class IMCReport {
    generate() {
        console.log("Generating IMC Report");
    }
}

class BloodPressureReport {
    generate() {
        console.log("Generating Blood Pressure Report");
    }
}

const reports = [];
let choice;

while (true) {
    choice = prompt("IMC Report(1) Blood Pressure Report(2) Go(0): ");
    if (choice === "0") break;
    else if (choice === "1") reports.push(new IMCReport());
    else if (choice === "2") reports.push(new BloodPressureReport());
}

reports.forEach(report => report.generate());
*/

/////////////////////////////////// After Factory ///////////////////////////////////


class HealthReport {
    static createReport(type) {
        switch(type) {
            case 'IMC':
                return new IMCReport();
            case 'BloodPressure':
                return new BloodPressureReport();
            default:
                throw new Error('Unknown report type');
        }
    }
}

class IMCReport extends HealthReport {
    generate() {
        console.log("Generating IMC Report");
    }
}

class BloodPressureReport extends HealthReport {
    generate() {
        console.log("Generating Blood Pressure Report");
    }
}

const reports = [];
let choice;

while (true) {
    choice = prompt("IMC Report(1) Blood Pressure Report(2) Go(0): ");
    if (choice === "0") break;
    let reportType = choice === "1" ? 'IMC' : 'BloodPressure';
    reports.push(HealthReport.createReport(reportType));
}

reports.forEach(report => report.generate());

