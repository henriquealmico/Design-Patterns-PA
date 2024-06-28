/////////////////////////////////// Before Flyweight ///////////////////////////////////

/*
class MedicalCondition {
    constructor(name, symptoms, treatments, diagnosisMethods, riskFactors, preventionMeasures) {
      this.name = name;
      this.symptoms = symptoms;
      this.treatments = treatments;
      this.diagnosisMethods = diagnosisMethods;
      this.riskFactors = riskFactors;
      this.preventionMeasures = preventionMeasures;
    }
  }
  
  class Patient {
    constructor(id, name, age, medicalConditions) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.medicalConditions = medicalConditions;
    }
  }
  
  class Doctor {
    constructor(id, name, specialty) {
      this.id = id;
      this.name = name;
      this.specialty = specialty;
    }
  }
  
  class Appointment {
    constructor(id, patient, doctor, date) {
      this.id = id;
      this.patient = patient;
      this.doctor = doctor;
      this.date = date;
    }
  }
  
  // Example data
  const condition1 = new MedicalCondition(
    "Diabetes",
    ["High blood sugar", "Frequent urination", "Increased thirst"],
    ["Insulin therapy", "Dietary changes", "Exercise"],
    ["Blood sugar test", "HbA1c test"],
    ["Obesity", "Sedentary lifestyle", "Genetics"],
    ["Healthy diet", "Regular exercise", "Weight management"]
  );
  
  const condition2 = new MedicalCondition(
    "Hypertension",
    ["High blood pressure", "Headaches", "Dizziness"],
    ["Beta blockers", "ACE inhibitors", "Lifestyle changes"],
    ["Blood pressure measurement", "Blood tests"],
    ["Obesity", "Smoking", "Stress"],
    ["Healthy diet", "Regular exercise", "Stress management"]
  );
  
  const patient1 = new Patient(1, "Marcos Peixoto", 30, [condition1, condition2]);
  const patient2 = new Patient(2, "Carlos Maciel", 45, [condition1]);
  const patient3 = new Patient(3, "Casimiro Miguel", 37, [condition2]);
  
  const doctor1 = new Doctor(1, "Dr. Gustavo", "Cardiology");
  const doctor2 = new Doctor(2, "Dr. Maurício", "Endocrinology");
  
  const appointment1 = new Appointment(1, patient1, doctor1, "2024-07-01");
  const appointment2 = new Appointment(2, patient2, doctor2, "2024-07-02");
  const appointment3 = new Appointment(3, patient3, doctor1, "2024-07-03");
  
  console.log(appointment1);
  console.log(appointment2);
  console.log(appointment3);
*/

/////////////////////////////////// After Flyweight ///////////////////////////////////

class MedicalCondition {
    constructor(name, symptoms, treatments, diagnosisMethods, riskFactors, preventionMeasures) {
      this.name = name;
      this.symptoms = symptoms;
      this.treatments = treatments;
      this.diagnosisMethods = diagnosisMethods;
      this.riskFactors = riskFactors;
      this.preventionMeasures = preventionMeasures;
    }
  }
  
  class MedicalConditionFactory {
    constructor() {
      this.conditions = {};
    }
  
    getCondition(name, symptoms, treatments, diagnosisMethods, riskFactors, preventionMeasures) {
      if (!this.conditions[name]) {
        this.conditions[name] = new MedicalCondition(name, symptoms, treatments, diagnosisMethods, riskFactors, preventionMeasures);
      }
      return this.conditions[name];
    }
  }
  
  class Patient {
    constructor(id, name, age, medicalConditions) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.medicalConditions = medicalConditions;
    }
  }
  
  class Doctor {
    constructor(id, name, specialty) {
      this.id = id;
      this.name = name;
      this.specialty = specialty;
    }
  }
  
  class Appointment {
    constructor(id, patient, doctor, date) {
      this.id = id;
      this.patient = patient;
      this.doctor = doctor;
      this.date = date;
    }
  }
  
  const conditionFactory = new MedicalConditionFactory();
  
  const condition1 = conditionFactory.getCondition(
    "Diabetes",
    ["High blood sugar", "Frequent urination", "Increased thirst"],
    ["Insulin therapy", "Dietary changes", "Exercise"],
    ["Blood sugar test", "HbA1c test"],
    ["Obesity", "Sedentary lifestyle", "Genetics"],
    ["Healthy diet", "Regular exercise", "Weight management"]
  );
  
  const condition2 = conditionFactory.getCondition(
    "Hypertension",
    ["High blood pressure", "Headaches", "Dizziness"],
    ["Beta blockers", "ACE inhibitors", "Lifestyle changes"],
    ["Blood pressure measurement", "Blood tests"],
    ["Obesity", "Smoking", "Stress"],
    ["Healthy diet", "Regular exercise", "Stress management"]
  );
  
  const patient1 = new Patient(1, "Marcos Peixoto", 30, [condition1, condition2]);
  const patient2 = new Patient(2, "Carlos Maciel", 45, [condition1]);
  const patient3 = new Patient(3, "Casimiro Miguel", 37, [condition2]);
  
  const doctor1 = new Doctor(1, "Dr. Gustavo", "Cardiology");
  const doctor2 = new Doctor(2, "Dr. Maurício", "Endocrinology");
  
  const appointment1 = new Appointment(1, patient1, doctor1, "2024-07-01");
  const appointment2 = new Appointment(2, patient2, doctor2, "2024-07-02");
  const appointment3 = new Appointment(3, patient3, doctor1, "2024-07-03");
  
  console.log(appointment1);
  console.log(appointment2);
  console.log(appointment3);
  