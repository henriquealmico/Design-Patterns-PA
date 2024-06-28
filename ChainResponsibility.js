/////////////////////////////////// Before ChainResponsability ///////////////////////////////////

/*
class Receptionist {
    processClaim(claim) {
        console.log(`Receptionist is processing the claim for ${claim.patientName}`);
    }
}

class Nurse {
    processClaim(claim) {
        console.log(`Nurse is processing the claim for ${claim.patientName}`);
    }
}

class Doctor {
    processClaim(claim) {
        console.log(`Doctor is processing the claim for ${claim.patientName}`);
    }
}

class InsuranceOfficer {
    processClaim(claim) {
        console.log(`Insurance Officer is processing the claim for ${claim.patientName}`);
    }
}

const claim = { patientName: 'Marcos', amount: 5000 };

const receptionist = new Receptionist();
const nurse = new Nurse();
const doctor = new Doctor();
const insuranceOfficer = new InsuranceOfficer();

receptionist.processClaim(claim);
nurse.processClaim(claim);
doctor.processClaim(claim);
insuranceOfficer.processClaim(claim);
*/

/////////////////////////////////// After ChainResponsability ///////////////////////////////////

class Handler {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(claim) {
        if (this.nextHandler) {
            this.nextHandler.handle(claim);
        }
    }
}

class Receptionist extends Handler {
    handle(claim) {
        console.log(`Receptionist is processing the claim for ${claim.patientName}`);
        super.handle(claim);
    }
}

class Nurse extends Handler {
    handle(claim) {
        console.log(`Nurse is processing the claim for ${claim.patientName}`);
        super.handle(claim);
    }
}

class Doctor extends Handler {
    handle(claim) {
        console.log(`Doctor is processing the claim for ${claim.patientName}`);
        super.handle(claim);
    }
}

class InsuranceOfficer extends Handler {
    handle(claim) {
        console.log(`Insurance Officer is processing the claim for ${claim.patientName}`);
        super.handle(claim);
    }
}

const claim = { patientName: 'Marcos', amount: 5000 };

const receptionist = new Receptionist();
const nurse = new Nurse();
const doctor = new Doctor();
const insuranceOfficer = new InsuranceOfficer();

receptionist.setNext(nurse).setNext(doctor).setNext(insuranceOfficer);

receptionist.handle(claim);
