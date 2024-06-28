/////////////////////////////////// Before Observer ///////////////////////////////////

/*
class Patient {
    constructor(name) {
        this.name = name;
        this.healthMetrics = {};
    }

    setHealthMetrics(metrics) {
        this.healthMetrics = metrics;
        this.notify();
    }

    notify() {
        console.log(`${this.name}'s health metrics updated:`, this.healthMetrics);
        dashboard.update(this);
        doctorNotification.update(this);
    }
}

class Dashboard {
    update(patient) {
        console.log(`Dashboard: Displaying updated health metrics for ${patient.name}.`);
    }
}

class DoctorNotification {
    update(patient) {
        console.log(`Doctor Notification: Sending health metrics update for ${patient.name} to the doctor.`);
    }
}

const dashboard = new Dashboard();
const doctorNotification = new DoctorNotification();
const patient = new Patient('Jonas');

patient.setHealthMetrics({ heartRate: 72, bloodPressure: '120/80' });
patient.setHealthMetrics({ heartRate: 75, bloodPressure: '125/85' });
*/

/////////////////////////////////// After Observer ///////////////////////////////////

class Patient {
    constructor(name) {
        this.name = name;
        this.healthMetrics = {};
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setHealthMetrics(metrics) {
        this.healthMetrics = metrics;
        this.notifyObservers();
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}

class Dashboard {
    update(patient) {
        console.log(`Dashboard: Displaying updated health metrics for ${patient.name}.`);
    }
}

class DoctorNotification {
    update(patient) {
        console.log(`Doctor Notification: Sending health metrics update for ${patient.name} to the doctor.`);
    }
}

// Create observers
const dashboard = new Dashboard();
const doctorNotification = new DoctorNotification();

// Create a patient and attach observers
const patient = new Patient('Jonas');
patient.addObserver(dashboard);
patient.addObserver(doctorNotification);

patient.setHealthMetrics({ heartRate: 72, bloodPressure: '120/80' });
patient.setHealthMetrics({ heartRate: 75, bloodPressure: '125/85' });
