/////////////////////////////////// Before Singleton ///////////////////////////////////

/*
class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        this.logs.push(message);
        console.log(`Log: ${message}`);
    }

    printLogCount() {
        console.log(`${this.logs.length} Logs`);
    }
}

class Patient {
    constructor(name) {
        this.name = name;
    }

    updateHealthMetrics(metrics) {
        logger.log(`Updating health metrics for ${this.name}: ${JSON.stringify(metrics)}`);
    }
}

class Doctor {
    constructor(name) {
        this.name = name;
    }

    reviewHealthMetrics(patient, metrics) {
        logger.log(`Doctor ${this.name} reviewing health metrics for ${patient.name}: ${JSON.stringify(metrics)}`);
    }
}

const logger = new Logger();

const patient1 = new Patient('Felipe');
const doctor1 = new Doctor('Dr. Marcos');

patient1.updateHealthMetrics({ heartRate: 72, bloodPressure: '120/80' });
doctor1.reviewHealthMetrics(patient1, { heartRate: 72, bloodPressure: '120/80' });

logger.printLogCount();
*/

/////////////////////////////////// After Singleton ///////////////////////////////////

class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        this.logs = [];
        Logger.instance = this;
    }

    log(message) {
        this.logs.push(message);
        console.log(`Log: ${message}`);
    }

    printLogCount() {
        console.log(`${this.logs.length} Logs`);
    }
}

class Patient {
    constructor(name) {
        this.name = name;
    }

    updateHealthMetrics(metrics) {
        const logger = Logger.getInstance();
        logger.log(`Updating health metrics for ${this.name}: ${JSON.stringify(metrics)}`);
    }
}

class Doctor {
    constructor(name) {
        this.name = name;
    }

    reviewHealthMetrics(patient, metrics) {
        const logger = Logger.getInstance();
        logger.log(`Doctor ${this.name} reviewing health metrics for ${patient.name}: ${JSON.stringify(metrics)}`);
    }
}

Logger.getInstance = function() {
    if (!Logger.instance) {
        Logger.instance = new Logger();
    }
    return Logger.instance;
};

const patient1 = new Patient('Felipe Barros');
const doctor1 = new Doctor('Dr. Marcos');

patient1.updateHealthMetrics({ heartRate: 72, bloodPressure: '120/80' });
doctor1.reviewHealthMetrics(patient1, { heartRate: 72, bloodPressure: '120/80' });

const logger = Logger.getInstance();
logger.printLogCount();
