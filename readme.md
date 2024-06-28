# Trabalho de Design Patterns - Programação Avançada

## Autor

- Nome: Henrique Almico Dias da Silva
- DRE: 124238228

## Introdução

Em engenharia de software, um design pattern é uma solução geral e reutilizável para um problema que ocorre frequentemente na construção de software. Um padrão de design não é um projeto finalizado que pode ser transformado diretamente em código. Em vez disso, é uma descrição ou modelo de como resolver um problema que pode ser aplicado em várias situações diferentes.

## Immediately Invoked Function Expressions (IIFE)

A IIFE (Immediately Invoked Function Expression) é um padrão de design comumente usado para encapsular um conjunto de variáveis e funções que não podem ser acessadas fora do escopo delimitado. Essas são funções anônimas que são envolvidas entre parênteses e chamadas imediatamente. A principal vantagem da IIFE é que qualquer "função ou variável" definida dentro dela não pode ser acessada fora do bloco, evitando assim a poluição do escopo global. Além disso, ajuda a gerenciar a memória de forma eficiente.

#### Exemplo antes da aplicação do IIFE

```javascript
var users = [
    { name: "Maria Clara", weight: 68, height: 1.65 },
    { name: "Jorge", weight: 85, height: 1.75 },
    { name: "Marcelo", weight: 54, height: 1.60 }
];

function calculateIMC(weight, height) {
    return weight / (height * height);
}

function displayUserIMC(users) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var IMC = calculateIMC(user.weight, user.height);
        console.log("IMC - " + user.name + ":" + IMC.toFixed(2));
    }
}

displayUserIMC(users);
```

#### Exemplo depois da aplicação do IIFE

```javascript
var IMCApp = (function() {
    var users = [
        { name: "Maria Clara", weight: 68, height: 1.65 },
        { name: "Jorge", weight: 85, height: 1.75 },
        { name: "Marcelo", weight: 54, height: 1.60 }
    ];

    function calculateIMC(weight, height) {
        return weight / (height * height);
    }

    function displayUserIMC() {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var IMC = calculateIMC(user.weight, user.height);
            console.log("IMC - " + user.name + ": " + IMC.toFixed(2));
        }
    }

    return {
        displayIMC: displayUserIMC
    };
})();

IMCApp.displayIMC();
```

#### Resultado

Com a aplicação do IIFE, o código se torna mais organizado e seguro, evitando a poluição do escopo global. Com isso, não é possível acessar informações sensíveis de cada usuário contido no `users`, somente o IMC. Além disso, em relação à memória, há uma melhoria, pois as variáveis e funções definidas dentro do IIFE são destruídas após a execução.

## Factory Method

O Factory Method é um Design Pattern que fornece uma interface para criar objetos em uma superclasse, permitindo que subclasses alterem o tipo de objeto que será criado. O objetivo principal do Factory Method é desacoplar a criação de objetos do seu código cliente, permitindo que o código seja mais flexível e extensível.

#### Exemplo antes da aplicação do Factory Method

```javascript
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
```

#### Exemplo depois da aplicação do Factory Method

```javascript
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

```

#### Resultado

Com a aplicação do Factory Method, o código se torna mais flexível e extensível, pois a criação de objetos é desacoplada do código cliente. Dessa forma, é possível adicionar novos tipos de relatórios sem a necessidade de alterar o código existente. Além disso, o Factory Method permite que o código cliente trabalhe com a interface `HealthReport` em vez de classes concretas, tornando o código mais genérico e fácil de entender.

## Observer

O Observer é um Design Pattern que define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente. O Observer é útil quando você precisa que vários objetos reajam a mudanças em um objeto, como notificar vários observadores quando um objeto é modificado. Com isso, ele reduz o acoplamento entre objetos e permite que os objetos sejam reutilizados de forma independente.

#### Exemplo antes da aplicação do Observer

```javascript
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
```

#### Exemplo depois da aplicação do Observer

```javascript
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
```

#### Resultado

Com a aplicação do Observer, o código se tornou menos acoplado, pois a classe `Patient` não precisa mais conhecer os detalhes de implementação dos observadores. Agora, os observadores são adicionados e removidos dinamicamente, permitindo que novos observadores sejam adicionados sem a necessidade de alterar a classe. Com isso, a notificação do Dashboard e do DoctorNotification é feita de forma automática, reduzindo a complexidade e aumentando a flexibilidade do código.

## Singleton

O Singleton é um Design Pattern que garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global para essa instância. O Singleton é útil quando você precisa de uma única instância de uma classe para coordenar ações em todo o sistema, como um objeto de log, gerenciador de cache ou pool de conexão de banco de dados. O Singleton é implementado garantindo que a classe tenha um construtor privado e fornecendo um método estático que retorna a única instância da classe.

#### Exemplo antes da aplicação do Singleton

```javascript
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
```

#### Exemplo depois da aplicação do Singleton

```javascript
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
```

#### Resultado

Com a aplicação do Singleton, o código garante que a classe `Logger` tenha apenas uma instância em todo o sistema, evitando a criação de múltiplas instâncias desnecessárias. Além disso, as classes `Patient` e `Doctor` agora obtêm a instância do `Logger` por meio do método estático `getInstance`, garantindo que todas as classes compartilhem a mesma instância do `Logger`. Com isso, o Singleton garante que o log seja centralizado e que todas as classes usem a mesma instância do `Logger` para manter a consistência dos logs.

## Chain of Responsibility

O Chain of Responsibility é um Design Pattern que permite que vários objetos processem uma solicitação sem que o cliente precise saber qual objeto está processando a solicitação. Cada objeto contém uma referência ao próximo objeto na cadeia e decide se a solicitação é tratada ou passada para o próximo objeto na cadeia. O Chain of Responsibility é útil quando você tem várias classes que podem processar uma solicitação e deseja evitar acoplamento entre o cliente e as classes que processam a solicitação.

#### Exemplo antes da aplicação do Chain of Responsibility

```javascript
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
```

#### Exemplo depois da aplicação do Chain of Responsibility

```javascript
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
```

#### Resultado

Com a aplicação do Chain of Responsibility, o Handler é responsável por encadear os objetos e decidir qual objeto deve processar a solicitação. Dessa forma, os objetos Receptionist, Nurse, Doctor e InsuranceOfficer são encadeados em uma sequência e cada objeto decide se deve processar a solicitação ou passá-la para o próximo objeto na cadeia. Assim, cada "profissional" processa a solicitação de acordo com sua responsabilidade, mantendo o código flexível e extensível.

## Flyweight

O Flyweight é um Design Pattern que permite que um grande número de objetos seja compartilhado eficientemente, reduzindo a redundância de dados e economizando memória. Assim, se torna útil quando você tem um grande número de objetos semelhantes, ou seja, que têm muitos atributos em comum. O Flyweight é implementado dividindo os objetos em intrínsecos (compartilhados) e extrínsecos (específicos de cada objeto) e armazenando os objetos intrínsecos em uma fábrica para reutilização.

#### Exemplo antes da aplicação do Flyweight

```javascript
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
```

#### Exemplo depois da aplicação do Flyweight

```javascript
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
```

#### Resultado

Com a aplicação do Flyweight, a classe `MedicalConditionFactory` é responsável por criar e armazenar as instâncias de `MedicalCondition` para reutilização. Dessa forma, os objetos `MedicalCondition` são compartilhados entre os pacientes, evitando a redundância de dados e economizando memória. Com isso, o Flyweight permite que um grande número de objetos seja compartilhado eficientemente, mantendo a consistência dos dados e melhorando o desempenho do sistema.
